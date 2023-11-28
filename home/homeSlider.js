let homeIcon = document.getElementById("homeMenuicon");
// homeIcon.addEventListener("click", openNav);
homeIcon.onclick = openNav;




function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // homeIcon.removeEventListener("click", openNav);
    // homeIcon.addEventListener("click", closeNav); 
        homeIcon.onclick = closeNav;       
    }
  

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // homeIcon.removeEventListener("click", closeNav);
    // homeIcon.addEventListener("click", openNav);
    homeIcon.onclick = openNav;
    }