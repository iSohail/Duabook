
// JavaScript source code

var auth = firebase.auth();
var database = firebase.database().ref("/");
var posts = document.getElementById('posts');

auth.onAuthStateChanged(function (user) {

    if (user) {
        //var usrName = user.displayName;
        //usrIdentity.innerHTML = usrName;
        //console.log(user);

        console.log(user);
        var obj = {};
        database.child('posts').on("child_added", function (snapshot) {

            obj = snapshot.val();
            obj.id = snapshot.key;
            renderDua(obj);
        })

        database.child('comments').on("child_added", function (snapshot) {
            var commentObj = snapshot.val();
            commentObj.id = snapshot.key;
            renderComment(commentObj);

        })


        

        function renderDua(duaObj) {
            var div = document.createElement('DIV');
            div.setAttribute('id', duaObj.id);

            var nameDiv = document.createElement('DIV');
            var duaDiv = document.createElement('DIV');
            var commentDiv = document.createElement('DIV');
            
            var senderName = document.createTextNode('Name : ' + duaObj.sender);
            var dua = document.createTextNode('Dua : ' + duaObj.dua);

            nameDiv.appendChild(senderName);
            duaDiv.appendChild(dua);

            var commentBox = document.createElement('INPUT');
            commentBox.setAttribute('id', 'comment' + duaObj.id);
            var btn = document.createElement('BUTTON');
            var btnTxt = document.createTextNode('Comment');
            btn.appendChild(btnTxt);
            btn.onclick = function () {
                submitComment(duaObj.id);
            };

            commentDiv.appendChild(commentBox);
            commentDiv.appendChild(btn);

            div.appendChild(nameDiv);
            div.appendChild(duaDiv);
            div.appendChild(commentDiv);

            posts.appendChild(div);

            console.log('Render done');

        }

        function submitComment(duaId) {
            var commentInput = document.getElementById("comment" + duaId).value;
            var comment = {
                sender: user.displayName,
                comment: commentInput,
                duaId: duaId
            }

            database.child('comments').push(comment);
            commentInput.value = '';

        }

        function renderComment(comment) {
            //match duaId with posts child id if found comment under div of duaObj.id
            //console.log(comment.duaId);
            //console.log(obj.id);
            //console.log(posts.childNodes.length)
            //if (comment.duaId == posts.childNodes.id) {
            //    console.log("matched");

            //}
            //else {
            //    console.log("Object error")
            //}

            for (var i = 0; i < posts.childnodes.length; i++) {
                console.log(posts.childNodes[i]);
            }
        }
    }
    else {
        console.log('User Not Signed In');
    }

})







//var elm, href;
//elm = document.getElementById("date");
//for (elm = elm.firstChild; elm; elm = elm.nextSibling) {
//    if (elm.nodeName === "A") {
//        href = elm.href;
//        break;
//    }
//}