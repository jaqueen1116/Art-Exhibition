document.addEventListener("DOMContentLoaded", function () {
    const pollForm = document.getElementById("pollf");
    const resultVanGogh = document.getElementById("VGR");
    const resultDaVinci = document.getElementById("DVR");
    const resultPicasso = document.getElementById("PR");
    const commentsVanGogh = document.getElementById("VGC");
    const commentsDaVinci = document.getElementById("DVC");
    const commentsPicasso = document.getElementById("PC");
    const pollResults = JSON.parse(localStorage.getItem("pollResults")) || {
        "Van Gogh": 0,
        "Da Vinci": 0,
        "Picasso": 0
    };
    const comments = JSON.parse(localStorage.getItem("comments")) || {
        "Van Gogh": [],
        "Da Vinci": [],
        "Picasso": []
    };
    function updateResults() {
        resultVanGogh.textContent = "Vincent Van Gogh: " + pollResults["Van Gogh"] + " votes";
        resultDaVinci.textContent = "Leonardo Da Vinci: " + pollResults["Da Vinci"] + " votes";
        resultPicasso.textContent = "Pablo Picasso: " + pollResults["Picasso"] + " votes";
    }
    function displayComments() {
        commentsVanGogh.innerHTML = "<h3>Comments for Vincent Van Gogh:</h3>";
        commentsDaVinci.innerHTML = "<h3>Comments for Leonardo Da Vinci:</h3>";
        commentsPicasso.innerHTML = "<h3>Comments for Pablo Picasso:</h3>";

        comments["Van Gogh"].forEach(function(comment) {
            const commentItem = document.createElement("p");
            commentItem.textContent = comment.name + ": " + comment.feedback;
            commentsVanGogh.appendChild(commentItem);
        });

        comments["Da Vinci"].forEach(function(comment) {
            const commentItem = document.createElement("p");
            commentItem.textContent = comment.name + ": " + comment.feedback;
            commentsDaVinci.appendChild(commentItem);
        });

        comments["Picasso"].forEach(function(comment) {
            const commentItem = document.createElement("p");
            commentItem.textContent = comment.name + ": " + comment.feedback;
            commentsPicasso.appendChild(commentItem);
        });
    }
    updateResults();
    displayComments();
    pollForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const selectedArtist = document.querySelector("input[name='artist']:checked");
        const userName = document.getElementById("name").value;
        const feedbackText = document.getElementById("feedback").value;
        if (selectedArtist) {
            const artist = selectedArtist.value;
            pollResults[artist]++;
            localStorage.setItem("pollResults", JSON.stringify(pollResults));
        }
        if (selectedArtist && userName && feedbackText) {
            const artist = selectedArtist.value;
            const newComment = {
                name: userName,
                feedback: feedbackText
            };
            comments[artist].push(newComment);
            localStorage.setItem("comments", JSON.stringify(comments));
        }
        updateResults();
        displayComments();
        pollForm.querySelectorAll("input").forEach(function(input) {
            input.disabled = true;
        });
        document.getElementById("name").disabled = true;
        document.getElementById("feedback").disabled = true;
        pollForm.querySelector("button").disabled = true;
    });
});
