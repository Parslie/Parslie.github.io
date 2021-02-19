$(document).ready(function() {

    fetch("https://api.github.com/repos/parslie/parslie.github.io/branches/master")
        .then(resp => {
            resp.json().then(json => {
                let date = json.commit.commit.author.date;
                let formattedDate = new Date(date).toLocaleString();

                $('<p id="last-update-label">').append('Website last updated at ' + formattedDate).appendTo('footer');
            })
        })
        .catch(e => {
            console.log(e);
        });

});