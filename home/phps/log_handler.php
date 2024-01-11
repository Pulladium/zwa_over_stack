<?php
if(!isset($_SESSION))
{
    session_start();
}
include '/home/vozhoart/www/home/phps/dbconfig.php';

function logout(){
    if(!isset($_SESSION))
    {
        session_start();
    }
    session_destroy();
    exit;
}

if(isset($_POST['function_name'])){
    if($_POST['function_name'] == 'logout'){
        logout();
    }
}


if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    echo 'already logedin';
    exit;
}
if(isset($_POST['submit'])) {
    if ($_POST['submit']) {

        $nickname = trim($_POST['log_nickname']);
        $password = trim($_POST['password']);
        $log_user_list = getAllUsers();
        $nicknames = array();
        foreach ($log_user_list as $user) {
            if($nickname == $user['username']){
                $id = $user['id'];
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                if(password_verify($password, $hashed_password)){
                    $_SESSION["loggedin"] = true;
                    $_SESSION["id"] = $id;
                    $_SESSION["nickname"] = $nickname;
                    echo 'Success';
                    exit;
                }
                else{
                    echo 'Faild';
                    exit;
                }
            }
        }
        echo 'Faild to find user';
        exit;
    }
}
?>