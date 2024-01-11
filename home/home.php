<?php
session_start();
//$_SESSION["loggedin"] = false;
?>
<!Doctype html>
<?php

require 'components/header.php';
require 'phps/dbconfig.php';

?>




<body>

<header class="header flex">
    <span class="material-symbols-outlined" id="homeMenuicon">
    menu
        </span>
    <h1 id = "home_href_h1">ZWA Over Stack</h1>
</header>

<div id="mySidenav" class="sidenav">

    <?php

//    include 'phps/dbconfig.php';
//    echo json_encode(getAllUsers());
//
    //    $_SESSION['user_id'] = 969;
//    session_start();
    if(isset($_SESSION["loggedin"])){
        if($_SESSION["loggedin"] == true) {
            include 'components/profile_nav.php';

        }else{
            echo 'loggedin set but false';
        }
    }else{
        include 'components/auth_nav.php';

    }
    ?>
    <p id = "topQust">Top Questions</p>
    <?php
    if(isset($_SESSION["loggedin"])) {
        if ($_SESSION["loggedin"] == true) {
            echo '<p id = "askButt">Ask Question</p>';
            echo '<p id = "myQust">My Question</p>';
            echo '<p id = "logOut">Log_out</p>';
        }
    }
    ?>

</div>


<main id="mainCont">

<!--    <p style="position: relative; top: 0; right: 0;">ENAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>-->
    <script src="scripts/reg_form.js"></script>
    <?php
        if(isset($_SESSION['result'])) {

            if (!$_SESSION['result']) {
                include 'components/error.php';
                // Отключить include 'registrace/register_form.php';
            }
        }
//                header('Location: registrace/error.php');


    ?>



    <div class="notebook"></div>

    <div id = "notebook-tools">
        <span class="material-symbols-outlined" id="add_code">
            add_circle
            </span>
        <span class="material-symbols-outlined" id ="add_markdown">
            add_box
            </span>

        <span class="material-symbols-outlined" id="sendNotebook">
            check_circle
            </span>
    </div>

<!--    --><?php
//        if(isset($_GET['Ask_Question'])){
//            require 'components/notebook_com.php';
//            echo '<p>WHAT<p>';
//        }
//    ?>
<!--        -->
</main>



<?php
include 'components/footer.php';
?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/javascript/javascript.min.js"></script>


    <script src = "scripts/sendNote.js"></script>
    <script src = "scripts/homeAsk_handler.js"></script>

    <script src = "scripts/myQustion_handler.js"></script>
    <script src = "scripts/homeSlider.js"></script>
    <script src = "scripts/go_back.js"></script>

</body>
