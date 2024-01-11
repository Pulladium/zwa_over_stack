<?php
error_reporting(E_ALL);

set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    echo json_encode([
        'error' => [
            'type' => 'Standard Error',
            'errno' => $errno,
            'message' => $errstr,
            'file' => $errfile,
            'line' => $errline,
            'php_version' => phpversion()
        ]
    ]);
    exit();
});

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== NULL) {
        echo json_encode([
            'error' => [
                'type' => 'Fatal Error',
                'errno' => $error['type'],
                'message' => $error['message'],
                'file' => $error['file'],
                'line' => $error['line'],
                'php_version' => phpversion()
            ]
        ]);
        exit();
    }
});

require 'dbconfig.php';


function getQustions($ids)
{
    require 'Qustion.php';
    try {
        $userQustions = array();

        $existing_Json = file_get_contents('/home/vozhoart/www/home/phps/corrected_test.json');
        $newlistofqust = Qustions::fromJson($existing_Json);
        foreach($ids as $id) {
            $newlistofqust->popQustByIndex($id);
        }
        return $newlistofqust;
//        foreach ($newlistofqust as $qustion) {
//            if (in_array($qustion->getAbout()[0], $ids)) {
//                $userQustions[] = $qustion;
//            }
//        }
//        return $userQustions;
    }
    catch (Exception $e) {
        return json_encode($e->getMessage());
    }
}

try {
    session_start();
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $_POST = json_decode(file_get_contents('php://input'), true);
        if (($_POST['function_name']) == 'GetUserQustions') {
            $user_qust_ids = userQustions();
            $array = json_decode($user_qust_ids, true);

            $userQust = getQustions($array);

//            $json_functions = json_encode(json_encode(getQustions($user_qust)));
//        echo ($json_functions);
            echo json_encode($userQust);
//            echo json_encode('what');
        }
        else {
            echo json_encode('Функция не существует.');
        }

    }
}
catch (Exception $e) {
    echo json_encode($e->getMessage());
}
?>