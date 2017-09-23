// JavaScript source code

var auth = firebase.auth();
var database = firebase.database().ref("/");

var usrIdentity = document.getElementById("usrIdentity");
var submitDuaBtn = document.getElementById('submitDuaBtn');
var senderName = document.getElementById('senderName');
var usrDua = document.getElementById('usrDua');

auth.onAuthStateChanged(function (user) {

    if (user) {
        var usrName = user.displayName;
        usrIdentity.innerHTML = usrName;
        console.log(user);

       
        submitDuaBtn.onclick = function submitDua() {
            var post = {
                sender: senderName.value,
                dua: usrDua.value,
                likes: 0
            }

            database.child('posts').push(post);
            senderName.value = '';
            usrDua.value = '';
        }

    }
    else {
        console.log('User Not Signed In');
    }

})

