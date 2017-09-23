// JavaScript source code

var auth = firebase.auth();
var outAlert = document.getElementById("outAlert");
var indexBtn = document.getElementById("indexBtn");

function logout() {
    firebase.auth().signOut().then(function () {
        location.href = "logout.html";
    }, function (error) {
        outAlert.innerHTML = "Error Sign out";
    });

}

function redIndex() {
    location.href = "index.html";
}
