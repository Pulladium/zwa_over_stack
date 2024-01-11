export class block{
    constructor(content, type, id){
        this.content = content;
        this.type = type;
        this.id = id;
    }
}

export class noteBook{
    blocks = [];
    addBlock(block){
        this.blocks.push(block);
    }
}

export class question{
    constructor(title, notebooks=[],qustion_notebook ,id){
        this.title = title;
        this.notebooks = notebooks;
        this.qustion_notebook = qustion_notebook;
        this.id = id;
    }
}