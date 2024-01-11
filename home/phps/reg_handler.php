<?php
if(isset($_POST['submit'])) {
    if ($_POST['submit']) {
        include '/home/vozhoart/www/home/phps/dbconfig.php';
        $email = $_POST['reg_email'];
        $nickname = $_POST['reg_nickname'];
        $password = $_POST['password'];
        $user_about = $_POST['reg_about_me'];
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $users_list = getAllUsers();
        $nicknames = array();
        foreach ($users_list as $user) {
            $nicknames[] = $user['username'];
        }
        if (in_array($nickname, $nicknames)) {
            echo "Nickname exists";
            exit;
        } else {
//            echo "Nickname does not exist in the array";

            $result = addUser($nickname, $hashed_password, Null, Null, $user_about, Null, '0');
            $_SESSION['result'] = $result; //
            if ($result) {
                echo "Success";
                exit;
            } else {
                echo "Something went wrong";
                exit;
            }
        }
    }
}
?>