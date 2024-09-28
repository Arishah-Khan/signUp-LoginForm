var createAccount = document.getElementById("create");
var userArray = [];

createAccount && createAccount.addEventListener("click", function (event) {
    event.preventDefault();


    var userName = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var termsCheckbox = document.getElementById("terms");

    if (userName.value === "" && email.value === "" && password.value === "" && !termsCheckbox.checked) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in all fields.',
        });
}else if (userName.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your username.',
        });
    } else if (email.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your email.',
        });
    } else if (password.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your password.',
        });
    } else if (!termsCheckbox.checked) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please agree to the terms and conditions.',
        });
    } else if (!email.checkValidity()) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid email format',
            text: 'Please enter a valid email address.',
        });
    } else {


        var userObj = {
            username: userName.value,
            email: email.value,
            password: password.value
        };
        userArray.push(userObj)

        var fetchingUsers = JSON.parse(localStorage.getItem("users")) || [];

        fetchingUsers.push(userObj);

        localStorage.setItem("users", JSON.stringify(userArray));



        userName.value = "";
        email.value = "";
        password.value = "";
        termsCheckbox.checked = false;


        Swal.fire({
            icon: 'success',
            title: 'Account Created!',
            text: 'Your account has been successfully created. Redirecting to login...',
            timer: 2000,
            showConfirmButton: false,
        })

        setTimeout(function () {
            window.location.href = "login.html";
        }, 2000);
    }
});



var loginBtn = document.getElementById("loginBtn");
var users = JSON.parse(localStorage.getItem("users"));
var loginSuccessful = false;

loginBtn.addEventListener("click", function (event) {
    event.preventDefault();

    var userdata = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (userdata === "" && password === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your name or email and password.',
        });
    } else if (userdata === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your name or email.',
        });
    } else if (password === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your password.',
        });
    } else {

        for (var i = 0; i < users.length; i++) {
            var user = users[i];

            if ((user.username === userdata || user.email === userdata) && user.password === password) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful to Shh!',
                    text: 'Welcome, ' + user.username + '! Thanks for logging in to Shh.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6'
                });

                loginSuccessful = true;
                break; 
            }
        }

        if (!loginSuccessful) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid credentials',
                text: 'Invalid username or password.',
            });
        }
    }
});
