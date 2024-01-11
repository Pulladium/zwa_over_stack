<?php
function db_conetc()
{
    $db_host = "localhost";
    $db_user = "vozhoart";
    $db_password = "webove aplikace";
    $db_name = "vozhoart";

    try {
        $db = new PDO("mysql:host={$db_host};dbname={$db_name}", $db_user, $db_password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    } catch (PDOEXCEPTION $e) {
        $e->getMessage();
        return Null;
    }
}

function addUser($username, $hashed_password, $occupation, $user_qustions, $user_about, $user_answers, $admin) {
    $db = db_conetc();
    if($db == Null) {
        echo "Chyba připojení k databázi";
        return false;
    }
    $sql = "INSERT INTO zwaover_users (username, password, occupation, user_qustions, user_about, user_answers, Admin) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt= $db->prepare($sql);
    $result = $stmt->execute([$username, $hashed_password, $occupation, json_encode($user_qustions), $user_about, json_encode($user_answers), $admin]);

    if($result) {
        return true;
    } else {
        return false;
    }
}

$user_nickname =  function (){
    $userId = $_SESSION['id'];
    return getUserColumn($userId, 'nickname');
};
$user_occupation = function (){
    $userId = $_SESSION['id'];
    return getUserColumn($userId, 'occupation');
};
$isAdmin = function (){
    $userId = $_SESSION['id'];
    return getUserColumn($userId, 'user_about');
};
$userQustions = function() {
    session_start();
    $userId = $_SESSION['id'];
    return getUserColumn($userId, 'user_qustions');
};

function fuckit()
{
    return 'blaaaa';
}
function userQustions()
{
//    return $_SESSION;
////    session_start();
    if(isset($_SESSION['id'])) {
        $userId = $_SESSION['id'];
//        return $userId;
        return getUserColumn($userId, 'user_qustions');
    }
    else{
        return 'ebana sessia';
    }
}
//$user_qustions = function (){
//    return json_encode('user_qustions atlist workuing');
////    $userId = $_SESSION['user_id'];
////    return getUserColumn($userId, 'user_qustions');
//};


//echo ($user_qustions);
function getUserColumn($userId, $column) {
    $db = db_conetc();
    if ($db == null) {
        echo "Chyba připojení k databázi";
        return false;
    }
    $sql = "SELECT $column FROM zwaover_users WHERE id = :userId";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);


    return $result ? $result[$column] : null;
}

function getAllUsers(){
    $db = db_conetc();
    if($db == Null) {
        echo "Chyba připojení k databázi";
        return false;
    }
    $sql = "SELECT * FROM zwaover_users";
    $stmt= $db->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
//    $stmt->close();
    return $result;
}
?>