// JavaScript source code

var auth = firebase.auth();
var database = firebase.database().ref("/");
var posts = document.getElementById('posts');


auth.onAuthStateChanged(function (user) {
    if (user) {
        var currentUser = auth.currentUser;


    }

})