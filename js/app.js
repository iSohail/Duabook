// JavaScript source code

var auth = firebase.auth();
var database = firebase.database().ref("/");

var emailIn = document.getElementById("emailIn");
var passIn = document.getElementById("passIn");
var usrNameIn = document.getElementById("usrNameIn");
var emailLogin = document.getElementById("usrEmail");
var passLogin = document.getElementById("psw");



function signUp() {
    var email = emailIn.value;
    var password = passIn.value;
    var userName = usrNameIn.value;

    // firebase method to create user
    auth.createUserWithEmailAndPassword(email, password)            //promises, then and catch
        .then(function (result) {
            // firebase method to update the user object
            return result.updateProfile({ displayName: userName })  // cannot be customize
                .then(function () {
                    // redirects to Sign In Page
                    window.location.assign("home.html");
                })

        })
        .catch(function (error) {
            console.log(error.message);
            // user alert goes here ...
        })

}


//function to sign in
function signIn() {
    var email = emailLogin.value;
    var password = passLogin.value;

    // firebase signin method
    auth.signInWithEmailAndPassword(email, password)            //promises, then and catch
        .then(function (result) {
            //redirects to home page
            window.location.assign("home.html");
        })
        .catch(function (error) {
            console.log(error.message);
            // user alert goes here ...
        })

}