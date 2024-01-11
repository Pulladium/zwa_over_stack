<?php
if(isset($_GET['error_code'])){
    $error_code = $_GET['error_code'];
    echo "Error Code: " . htmlspecialchars($error_code);
} else {
    echo "No error code provided.";
}
?>

