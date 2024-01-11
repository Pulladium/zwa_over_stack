let reg_btn = document.getElementById("reg_btn");
let login_btn = document.getElementById("log_btn");





login_btn.addEventListener('click', function (){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'components/login.php', true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('mainCont').innerHTML = this.responseText;

            // Добавление обработчика события submit после добавления формы на страницу
            var form = document.getElementById('login_form');
            if(form) {
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    return validateLoginForm(this);
                });
            }
        }
    };
    xhr.send();
});


reg_btn.addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'components/register_form.php', true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('mainCont').innerHTML = this.responseText;

            // Добавление обработчика события submit после добавления формы на страницу
            var form = document.getElementById('contact');
            if(form) {
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    return validateFormOnSubmit(this);
                });
            }
        }
    };
    xhr.send();
});