<?php

    try {
        require 'Qustion.php';

        $questions = Qustions::fromJSON(file_get_contents('php://input'), true);
        $existing_Json =  file_get_contents('/home/vozhoart/www/home/phps/corrected_test.json');
        $newlistofqust = Qustions::fromJson($existing_Json);
//        echo get_class($newlistofqust);
        $newlistofqust->addQustion($questions->getQustions()[0]);
        $json = json_encode($newlistofqust);
        file_put_contents("corrected_test.json", $json);
        echo json_encode('{"Send Qustion_notebook status": "success"}');

    } catch (Exception $e) {
        // An error occurred, handle it and output an error message in JSON format
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
?>
