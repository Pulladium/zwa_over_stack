<?php
///home/vozhoart/www/home/phps/Qustion.php
try {
    require 'Qustion.php';
//    $allFunctions = get_defined_functions();
    $methods = get_class_methods('Qustion');
//    echo  json_encode($methods);
    $questions = Qustions::fromJSON(file_get_contents('php://input'), true);


//
//
    $existing_Json = file_get_contents('/home/vozhoart/www/home/phps/corrected_test.json');
    $newlistofqust = Qustions::fromJson($existing_Json);
    echo json_encode('overwrite qustion 2?');
//    echo json_encode(json_encode($newlistofqust));
//
//    $newlistofqust->overwriteQustion($questions->getQustion()[0]->getAbout()[0], $questions->getQustion()[0]);
//
//    file_put_contents('/home/vozhoart/www/home/phps/corrected_test.json', json_encode($newlistofqust));
//    echo json_encode('overwrite qustion success');
    exit;

} catch (Exception $e) {

    echo json_encode($e->getMessage());
    exit;
}

?>