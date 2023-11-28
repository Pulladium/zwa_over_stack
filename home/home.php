<!DOCTYPE html>
<html lang="en">
<head>
    <title>ZWA Over Stack</title>
    <link rel="stylesheet" href="home.css"> 
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <!-- codemirror -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/codemirror.min.css" />
</head>

<header class="header flex">
    <span class="material-symbols-outlined" id="homeMenuicon">
        menu
        </span>
    <h1 id = "home_href_h1">ZWA Over Stack</h1>

    
        
</header>

<div id="mySidenav" class="sidenav">
        
    <!-- <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a> -->
    <p><span id="profile_span">
        <img id = "profilePhoto"src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qb2wR410I2bqytOiB3RW4wHaHa%26pid%3DApi%26h%3D160&f=1&ipt=c4d4ccba4db9bc4027fd51f97d6e1b33e35254a3e5df87b79dc58dac1989171d&ipo=images">

    </span><label for = "profile_span">Profile</label></p>
    <!-- <nav>
        <a href="C:\Users\Admin\Desktop\ZWA_over_stack\register\register.html">Регистрация</a> |
        <a href="C:\Users\Admin\Desktop\ZWA_over_stack\login\login.html">Вход</a>
    </nav> -->
    <p id ="askButt">Ask Question</p>
    <p id = "myQust">My Question</p>
    
    <p id = "topQust">Top Questions</p>

    </div>


<body>
    <main id="mainCont">
        
        <section class="top-questions">
            <h2>Top raited</h2>
            <article class="question">
                <h3>Test_qustion</h3>
                <p>Popis...</p>
                <a href="#" class ="href_more">more</a>
            </article>
            <article class="question">
                <h3>Test_qustion</h3>
                <p>Popis...</p>
                <a href="#" class ="href_more">more</a>
            </article>
        </section>
        <section class="new-questions">
            <h2>Newest</h2>
            <article class="question">
                <h3>How to use filezilla</h3>
                <p>Popis...</p>
                <a href="#" class ="href_more">more</a>
            </article>
        </section>
        <form action="post_question.php" method="post" class="notebook">
            
        </form>
        <div id = "notebook-tools">
            <span class="material-symbols-outlined" id="add_code">
                add_circle
                </span>
            <span class="material-symbols-outlined" id ="add_markdown">
                add_box
                </span>
        </div>
        
    </main>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/mode/javascript/javascript.min.js"></script>
    <script src = "homeAsk_handler.js"></script>
    <script src = "myQustion_handler.js"></script>
    <script src = "homeSlider.js"></script>
    <script src = "go_back.js"></script>
</body>
<footer>
    <p>beta ZWA Over Stack</p>
</footer>
</html>
