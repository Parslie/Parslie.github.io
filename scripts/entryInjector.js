

document.addEventListener("DOMContentLoaded", function(event) {
    let entryParent = document.getElementById("entries");

    /* Generate each entry */
    entries.forEach((entry, i) => {
        let entrySection = document.createElement("section");
        entrySection.className = "entry";
        entryParent.appendChild(entrySection);

        let entryHeader = document.createElement("header");
        entrySection.appendChild(entryHeader);
        let entryContent = document.createElement("content");
        entrySection.appendChild(entryContent);
        let entryFooter = document.createElement("footer");
        entrySection.appendChild(entryFooter);

        /* Header */
        let title = document.createElement("h2");
        title.className = "title";

        fetch(entry.repoURL)
        .then(resp => {
            resp.json().then(json => {
                let repoLink = document.createElement("a");
                repoLink.href = json.html_url;
                repoLink.innerHTML = entry.title;
                title.appendChild(repoLink);

                let date = json.updated_at;
                let formattedDate = new Date(date).toLocaleString();

                let updatedText = document.createElement("p");
                updatedText.innerHTML = "Updated: " + formattedDate;
                entryHeader.appendChild(updatedText);
            });
        })
        .catch(e => {
            title.innerHTML = entry.title;
        });

        entryHeader.appendChild(title);

        /* Content */
        if (entry.image != null && entry.image != "") {
            let imageContainer = document.createElement("div");
            imageContainer.className = "img-container";
            entryContent.appendChild(imageContainer);

            let image = document.createElement("img");
            image.src = entry.image;
            image.style.width = "100%";
            imageContainer.appendChild(image);

            function resizeImg(event) {
                imageContainer.style.maxHeight = imageContainer.offsetWidth + "px";
            }

            image.onload = resizeImg;
            window.addEventListener("resize", resizeImg);
        }

        let description = document.createElement("p");
        description.innerHTML = entry.description;
        entryContent.appendChild(description);

        /* Footer */
        let tagList = document.createElement("ul");
        tagList.className = "tags";
        entryFooter.appendChild(tagList);

        entry.tags.forEach((tag, i) => {
            let tagItem = document.createElement("li");
            tagList.appendChild(tagItem);

            let tagLink = document.createElement("a");
            tagLink.innerHTML = tag;
            tagItem.appendChild(tagLink);

            tagList.appendChild(document.createTextNode("\u00A0")); /* Adds whitespace */
        });
    });
});
