<?php

class Block implements JsonSerializable{
    private $block_id;
    private $type;
    private $content;
    public function __construct($content, $type, $block_id){

        $this->block_id = $block_id;
        $this->content = $content;
        $this->type = $type;
    }
    public function getBlock() {
        return [$this->content, $this->type, $this->block_id ];
    }

    public function jsonSerialize(): array {
        return [
            'block_id' => $this->block_id,
            'type' => $this->type,
            'content' => $this->content
        ];
    }

}
class Notebook implements JsonSerializable{
    private $notebook_id;
    private $blocks = array();

    public function __construct($notebook_id) {
        $this->notebook_id = $notebook_id;
    }
    public function addBlock($content, $type, $id){
        $this->blocks[] = new Block($content, $type, $id);
    }
    public function popBlock($block) {
        $this->blocks = array_diff($this->blocks, [$block]);
    }
    public function getId(){
        return $this->notebook_id;
    }
    public function getBlocks() {
        return $this->blocks;
    }
    public function jsonSerialize(): array {
        return [
            'notebook_id' => $this->notebook_id,
            'blocks' => $this->blocks
        ];
    }

    public static function fromJson($data) {
        $notebook = new Notebook($data['notebook_id']);

        foreach ($data['blocks'] as $blockData) {
            $notebook->addBlock($blockData['content'], $blockData['type'], $blockData['block_id']);
        }

        return $notebook;
    }
}
class Qustion implements JsonSerializable{
    private $id;
    private $title;
    private $qustion_notebook;
    private $notebooks = array();
    public function __construct($id, $title, $qustion_notebook) {
        $this->title = $title;
        $this->id = $id;
        $this->setQustionNotebook($qustion_notebook);
    }
    public function setQustionNotebook($qustion_notebook){
        $this->qustion_notebook = $qustion_notebook;
    }
    public function addNotebook($notebook){
        $this->notebooks[] = $notebook;
    }
    public function getAbout(){
        return [$this->id, $this->title, $this->qustion_notebook];
    }
    public function setID($new_id)
    {
        $this->id = $new_id;
    }
    public function getNotebooks() {
        return $this->notebooks;
    }
    public function popNotebook($notebook) {
        $this->notebooks = array_diff($this->notebooks, [$notebook]);
    }
    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'qustion_notebook' => $this->qustion_notebook,
            'notebooks' => $this->notebooks
        ];
    }
     public static function fromJson($data) {
//        print ('dsfwe');
        $qustion_notebook = Notebook::fromJson($data['qustion_notebook']);
        $question = new Qustion($data['id'], $data['title'], $qustion_notebook);

        foreach ($data['notebooks'] as $notebookData) {
            $notebook = Notebook::fromJson($notebookData);
            $question->addNotebook($notebook);
        }

        return $question;
    }
}
class Qustions implements JsonSerializable{
    private $qustions = array();
    public function __construct($qustions) {
        $this->qustions = $qustions;
    }
    public function addQustion($qustion){
        $last_id  =end($this->qustions)->getAbout()[0];
        $qustion->setID($last_id+1);
        $this->qustions[] = $qustion;
    }
    public function getQustions() {
        return $this->qustions;
    }
    public function popQustByIndex($index) {
        foreach ($this->qustions as $key => $value) {
            if ($value->getAbout()[0] == $index) {
                unset($this->qustions[$key]);
            }
        }
    }
    public function popQustion($qustion) {
        $this->qustions = array_diff($this->qustions, [$qustion]);
    }
    public function overwriteQustion($qustion_id, $new_qustion) {
        foreach ($this->qustions as $key => $value) {
            if ($value->getAbout()[0] == $qustion_id) {
                $this->qustions[$key] = $new_qustion;
            }
        }

    }
    public function jsonSerialize(): array {
        return [
            'qustions' => $this->qustions
        ];
    }
    public static function fromJson($json) {
        $data = json_decode($json, true);
        $qustions = array();

        foreach ($data['qustions'] as $questionData) {
            $qustions[] = Qustion::fromJson($questionData);
        }

        return new Qustions($qustions);
    }
}

?>