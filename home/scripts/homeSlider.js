let homeIcon = document.getElementById("homeMenuicon");
homeIcon.onclick = openNav;



if(document.getElementById('logOut') != null) {
    let logOut_btn = document.getElementById("logOut");


    logOut_btn.addEventListener('click', function (){
        console.log('try to logout');
        fetch('phps/log_handler.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'function_name=logout'
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                document.cookie = 'cookieName=; Max-Age=-99999999;';
                location.reload(); // перезагрузить страницу
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}




function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
        homeIcon.onclick = closeNav;       
    }
  

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    homeIcon.onclick = openNav;
    }