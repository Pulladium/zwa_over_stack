function displayError(element, message, errorId) {
    element.style.background = 'Red';
    document.getElementById(errorId).innerHTML = message;
}

function validateLoginForm(form){
    // var reason = "";
    // reason += validateName(form.log_nickname);
    var passwordError = validatePassword(form.log_password);



    if(passwordError.length >0 || form.log_nickname.length==0) {
        displayError(form.log_nickname, 'Not valid password or login', 'login_error')
    }else {
        form.log_nickname.style.background = 'White';
        document.getElementById('login_error').innerHTML = '';
        submitLoginForm();
    }
}

function submitLoginForm(){
    let xmlhttp= window.XMLHttpRequest ?
        new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === 'Success' || this.responseText === 'already logedin') {
                document.getElementById('mainCont').innerHTML = "<h1>Logged in successfully</h1>"

                console.log(this.responseText); // Log the response
                location.reload();
            }else {
                console.log(this.responseText);
            }

        }else if(this.readyState === 4 && this.status === 401){
            console.log(this.responseText);
        }

    }

    let name = document.getElementById('log_nickname').value;
    let password = document.getElementById('log_password').value;

    xmlhttp.open("POST","phps/log_handler.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("submit=1&log_nickname=" + name  + "&password=" + password);

}


function validateFormOnSubmit(contact) {
    var reason = "";
    reason += validateName(contact.reg_nickname);
    reason += validateEmail(contact.reg_email);
    var passwordError = validatePassword(contact.password);
    if (passwordError.length > 0) {
        displayError(contact.password, passwordError, 'password-error');
        reason += passwordError;
    }
    var confirm_password_err =  validateConfirmPassword(contact.password, contact.confirm_password)
    if(confirm_password_err.length>0){
        displayError(contact.confirm_password, 'Passwords dosnt match','confirm_password-error')
        reason += confirm_password_err;
    }

    console.log(reason);
    if (reason.length > 0) {
        return false;
    } else {
        submitregForm();
        return true;
    }
}

// validate required fields
function validateName(name) {
    var error = "";

    if (name.value.length == 0) {
        displayError(name, "The required field has not been filled in",


            'name-error');



        error = "The required field has not been filled in";
    } else {
        name.style.background = 'White';
        document.getElementById('name-error').innerHTML = '';
    }
    return error;
}
// validate email as required field and format
function trim(s) {
    return s.replace(/^\s+|\s+$/, '');
}
function validateEmail(email) {
    var error = "";
    var temail = trim(email.value); // value of field with whitespace trimmed off
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

    if (email.value == "") {
        displayError(email, "Please enter an email address.", 'email-error');
        var error = "2";
    } else if (!emailFilter.test(temail)) { //test email for illegal characters
        displayError(email, "Please enter a valid email address.", 'email-error');
        var error = "3";
    } else if (email.value.match(illegalChars)) {
        displayError(email, "Email contains invalid characters.", 'email-error');
        var error = "4";
    } else {
        email.style.background = 'White';
        document.getElementById('email-error').innerHTML = '';
    }
    return error;
}

function validatePassword(password) {
    var passwordValue = password.value; // получение значения пароля
    var missingChars = ""; // переменная для хранения недостающих символов

    // Проверка на наличие хотя бы одного специального символа
    var specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!passwordValue.match(specialChar)) {
        missingChars += "Missing special character. ";
    }

    // Удаление специальных символов из пароля
    passwordValue = passwordValue.replace(specialChar, '');

    // Проверка на наличие цифр 0-9
    var number = /[0-9]/;
    if(!passwordValue.match(number)) {
        missingChars += "Missing number. ";
    }

    // Удаление цифр из пароля
    passwordValue = passwordValue.replace(number, '');

    // Проверка на наличие символов A-z
    var letter = /[a-zA-Z]/;
    if(!passwordValue.match(letter)) {
        missingChars += "Missing letter. ";
    }

    return missingChars;
}


function validateConfirmPassword(password, confirmPassword) {
    var error = "";

    if (password.value != confirmPassword.value) {
        displayError(confirmPassword, "Passwords do not match.", 'confirm_password-error');
        error = "Passwords do not match.";
    } else {
        confirmPassword.style.background = 'White';
        document.getElementById('confirm_password-error').innerHTML = '';
    }
    return error;
}

function submitregForm(){
    let xmlhttp= window.XMLHttpRequest ?
        new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200)
            if(this.responseText === "Nickname exists"){
                document.getElementById('name-error').innerHTML = 'Nickname exists in the array';

            }else if(this.responseText === "Success"){
                document.getElementById('mainCont').innerHTML = "<h1>Register successfully</h1>"
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
                // fetch('home/phps/log_handler').then(response => response.json())
                //     .then(data => console.log(data))
                //     .catch(error => console.error('Error:', error));
            }
        console.log(this.responseText); // Log the response
    }

    let name = document.getElementById('reg_nickname').value;
    let email = document.getElementById('reg_email').value;
    let password = document.getElementById('password').value;
    let userAbout = document.getElementById('reg_about_me').value;

    xmlhttp.open("POST","phps/reg_handler.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("submit=1&reg_nickname=" + name + "&reg_email=" + email + "&password=" + password+ "&reg_about_me=" + userAbout);
}