$(document).ready(function() {

    fetch("https://api.github.com/repos/parslie/parslie.github.io/branches/master")
        .then(resp => {
            resp.json().then(json => {
                let date = json.commit.commit.author.date;
                let formattedDate = new Date(date).toLocaleString();

                $('<h5 id="last-update-label">').append('Last Updated: ' + formattedDate).appendTo('body');
            })
        })
        .catch(e => {
            console.log(e);
        });

});