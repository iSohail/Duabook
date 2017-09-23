
// JavaScript source code

var auth = firebase.auth();
var database = firebase.database().ref("/");
var posts = document.getElementById('posts');

auth.onAuthStateChanged(function (user) {

    if (user) {
        var currentUser = auth.currentUser;
        //console.log(currentUser);

        database.child("posts").on("child_added", function (snapshot) {
            var obj = snapshot.val();
            obj.id = snapshot.key;
            render(obj);
        })
        database.child("comments").on("child_added", function (snapshot) {
            var obj = snapshot.val();
            renderComment(obj);
        })
        database.child("posts").on("child_changed", function (snapshot) {
            var likedObj = snapshot.val();
            renderLike(likedObj);

        })

        function render(dua) {
            var div = document.createElement("DIV");
            div.setAttribute("id", dua.id);
            div.setAttribute("class", "card mainCard");

            var divBody = document.createElement("DIV");
            divBody.setAttribute("class", "card-body");

            var p = document.createElement("P");
            p.setAttribute("class", "card-text");

            var h4 = document.createElement("H4");
            h4.setAttribute("class", "card-title");

            var divInput = document.createElement("DIV");
            divInput.setAttribute("class", "input-group");

            var likeBtn = document.createElement("BUTTON");
            likeBtn.setAttribute("id", "likeBtnID" + dua.id);
            var likeTxt = document.createTextNode("Like");

            likeBtn.setAttribute("class", "btn btn-primary btn-block");
            likeBtn.appendChild(likeTxt);
            likeBtn.onclick = function () {
                submitLike(dua, dua.id);
            }

            var likePara = document.createElement("P");
            var likeParaTxt = document.createTextNode("Likes ");
            likePara.appendChild(likeParaTxt);
            var span = document.createElement("SPAN");
            span.setAttribute("class", "badge badge-secondary");
            span.innerHTML = dua.likes;
            span.setAttribute("id", "like" + dua.id);
            likePara.appendChild(span);

            var sender = document.createTextNode("Name: " + dua.sender + ' ');
            var duaText = document.createTextNode("Dua: " + dua.dua);

            h4.appendChild(sender);
            p.appendChild(duaText);
            divBody.appendChild(h4);
            divBody.appendChild(p);


            var commentBox = document.createElement("INPUT");
            commentBox.setAttribute("id", "comment" + dua.id);
            commentBox.setAttribute("class", "form-control");
            var btn = document.createElement("BUTTON");
            btn.setAttribute("class", "input-group-addon btn-primary");
            var btnText = document.createTextNode("Comment");
            btn.onclick = function () {
                submitComment(dua.id);
            }



            divInput.appendChild(commentBox);
            divInput.appendChild(btn);

            divBody.appendChild(likeBtn);
            divBody.appendChild(likePara);
            divBody.appendChild(divInput);

            btn.appendChild(btnText);
            div.appendChild(divBody);

            var commentDiv = document.createElement("DIV");
            commentDiv.setAttribute("class", "commentMng");
            div.appendChild(commentDiv);

            posts.appendChild(div);
        }


        function submitComment(duaId) {
            var commentInput = document.getElementById("comment" + duaId);
            var commentObj = {
                commentSender: currentUser.displayName,
                comment: commentInput.value,
                duaId: duaId
            }
            database.child("comments").push(commentObj);
            commentInput.value = '';
        }

        //  check .once method 

        function renderComment(comment) {
            var duaDiv = document.getElementById(comment.duaId);
            var commentsDiv = duaDiv.lastElementChild;

            var text = document.createTextNode(comment.commentSender + " " + comment.comment);
            var card = document.createElement("DIV");
            card.setAttribute("class", "card");
            var cardBody = document.createElement("DIV");
            cardBody.setAttribute("class", "card-body");

            var senderTag = document.createElement("H5");
            var senderText = document.createTextNode(comment.commentSender);
            senderTag.appendChild(senderText);


            var commentTag = document.createElement("H6");
            var commentText = document.createTextNode(comment.comment);

            commentTag.appendChild(commentText);

            cardBody.appendChild(senderTag);
            cardBody.appendChild(commentTag);

            card.appendChild(cardBody);

            commentsDiv.appendChild(card);

        }

        //freecodecamp

        //TASK LIKE BUTTON INCREMENT 


        function submitLike(dua, duaId) {
            dua.likes += 1;
            database.child("posts/" + duaId).update(dua);

            unLike(dua);
        }

        function renderLike(likedObj) {
            var likeSpan = document.getElementById("like" + likedObj.id);
            likeSpan.innerHTML = likedObj.likes;
        }


        //Unlike 
        function unLike(dua) {
            var unLikeBtn = document.getElementById("likeBtnID" + dua.id);
            unLikeBtn.innerHTML = "Unlike";

            unLikeBtn.onclick = function () {
                dua.likes = dua.likes - 1;
                database.child("posts/" + dua.id).update(dua);

                unLikeBtn.innerHTML = "Like";
                unLikeBtn.onclick = function () {

                    submitLike(dua, dua.id);
                }
            }


        }

    }
    else {
        console.log('User Not Signed In');
    }

})

