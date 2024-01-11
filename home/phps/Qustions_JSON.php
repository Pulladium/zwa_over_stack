<?php
require 'Qustion.php';
$qustions = array();
$qustion_notebook = new Notebook(0);
$qustion_notebook->addBlock("This is a test", "markdown", 1);
$qustion_notebook->addBlock("if lcodotodkvssdv]\n gfgdfb \b nf\bfg", "code", 2);

$qustion = new Qustion(1, "How to make a website?", $qustion_notebook);

$ansewr_notebook = new Notebook(0);
$ansewr_notebook->addBlock("Bro not like this", "markdown", 1);
$ansewr_notebook->addBlock("if lcodotodkvssdv]\n gfgdfb \b nf\bfg\n\n to je blbost", "code", 2);
$ansewr_notebook->addBlock("lepe try this \n sldfodsfleoslfc\blfd\nfdgerdf\n", "code", 3);

$qustion->addNotebook($ansewr_notebook);

$qustions[] = $qustion;

//$json = json_encode(new Qustions($qustions));
//echo $json;
//file_put_contents("test.json", $json);

$got_json = file_get_contents("test.json");
$newlistofqust = Qustions::fromJson($got_json);
$newlistofqust->getQustions()[0]->getNotebooks()[0]->addBlock("@@ADDED SHIT!@@", "markdown", 5);
$json = json_encode($newlistofqust);
file_put_contents("new_test.json", $json);





?>