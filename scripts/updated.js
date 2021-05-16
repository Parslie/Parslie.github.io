document.addEventListener("DOMContentLoaded", function(event) {
    var updatedText = document.createElement("h5");
    updatedText.innerHTML = "Updated: "

    fetch("https://api.github.com/repos/parslie/parslie.github.io/branches/master")
    .then(resp => {
        resp.json().then(json => {
            let date = json.commit.commit.author.date;
            let formattedDate = new Date(date).toLocaleString();

            updatedText.innerHTML += formattedDate;
        });
    })
    .catch(e => {
        console.log(e);
    });

    document.getElementsByTagName("footer")[0].appendChild(updatedText);
});
