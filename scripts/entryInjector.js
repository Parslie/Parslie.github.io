document.addEventListener("DOMContentLoaded", function(event) {
    let entryParent = document.getElementById("entries");

    /* Create image viewer */
    let imageViewer = document.createElement("div");
    imageViewer.id = "image-viewer";
    imageViewer.style.display = "none";
    document.body.appendChild(imageViewer);

    let viewedImage = document.createElement("img");
    imageViewer.appendChild(viewedImage);

    imageViewer.onclick = function() {
        imageViewer.style.display = "none";
    }

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
            image.className = "clickable-img";
            image.src = entry.image;
            imageContainer.appendChild(image);

            function resizeImg(event) {
                imageContainer.style.height = imageContainer.offsetWidth + "px";
            }

            let imageObj = new Image();
            imageObj.src = entry.image;
            imageObj.onload = function() {
                resizeImg();

                if (imageObj.width < imageObj.height) {
                    image.style.width = "100%";
                }
                else {
                    image.style.height = "100%";
                }
            }

            window.addEventListener("resize", resizeImg);

            /* Activate image viewer onclick */
            image.onclick = function() {
                imageViewer.style.display = "block";
                viewedImage.src = entry.image;
            }
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
