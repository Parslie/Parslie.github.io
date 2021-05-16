var imageViewerBG;
var imageViewer;

function deactivateImageViewer() {
    imageViewerBG.style.display = "none";
    imageViewer.style.display = "none";
}

function activateImageViewer(image) {
    imageViewerBG.style.display = "block";
    imageViewer.style.display = "block";
    imageViewer.src = image;
}

function createImageViewer() {
    imageViewerBG = document.createElement("div");
    imageViewerBG.id = "image-viewer-bg";
    imageViewerBG.style.display = "none";
    document.body.appendChild(imageViewerBG);

    imageViewer = document.createElement("img");
    imageViewer.id = "image-viewer";
    imageViewer.style.display = "none";
    document.body.appendChild(imageViewer);

    imageViewerBG.onclick = function() {
        deactivateImageViewer();
    }
}

var entryParent;

function createEntry(entry) {
    let entrySection = document.createElement("section");
    entryParent.appendChild(entrySection);
    entrySection.className = "entry";

    //////////////////////
    // Create entry header
    let entryHeader = document.createElement("header");
    entrySection.appendChild(entryHeader);

    let entryTitle = document.createElement("h2");
    entryHeader.appendChild(entryTitle);
    entryTitle.innerHTML = entry.title;
    entryTitle.className = "title";

    if (entry.repoURL != null) {
        let repoDate = document.createElement("p");
        entryHeader.appendChild(repoDate);
        repoDate.innerHTML = "Updated: ";

        fetch(entry.repoURL).then(resp => {
            entryTitle.innerHTML = "";

            resp.json().then(json => {
                let repoLink = document.createElement("a");
                entryTitle.appendChild(repoLink);
                repoLink.innerHTML = entry.title;
                repoLink.href = json.html_url;

                let date = new Date(json.updated_at).toLocaleString();
                repoDate.innerHTML += date;
            });
        });
    }

    ///////////////////////
    // Create entry content
    let entryContent = document.createElement("content");
    entrySection.appendChild(entryContent);

    if (entry.image != null) {
        let entryImgContainer = document.createElement("div");
        entryContent.appendChild(entryImgContainer);
        entryImgContainer.className = "img-container";

        let entryImg = document.createElement("img");
        entryImgContainer.appendChild(entryImg);
        entryImg.src = entry.image;
        entryImg.onclick = function() {
            imageViewer.style.display = "block";
            viewedImage.src = entry.image;
        }

        function resizeImg() {
            entryImgContainer.style.height = entryImgContainer.offsetWidth + "px";
        }

        let imgObj = new Image();
        imgObj.src = entry.image;
        imgObj.onload = function() {
            resizeImg();

            if (imgObj.width < imgObj.height) {
                entryImg.style.width = "100%";
            }
            else {
                entryImg.style.height = "100%";
            }
        }

        window.addEventListener("resize", resizeImg);
    }

    if (entry.list != null) {
        let entryList = document.createElement("ul");
        entryContent.appendChild(entryList);

        entry.list.forEach(item => {
            let entryListItem = document.createElement("li");
            entryList.appendChild(entryListItem);
            entryListItem.innerHTML = item;
        });
    }

    if (entry.description != null) {
        let entryDescription = document.createElement("p");
        entryContent.appendChild(entryDescription);
        entryDescription.innerHTML = entry.description;
    }

    //////////////////////
    // Create entry footer
    if (entry.tags) {
        let entryFooter = document.createElement("footer");
        entrySection.appendChild(entryFooter);

        let entryTagList = document.createElement("ul");
        entryFooter.appendChild(entryTagList);
        entryTagList.className = "tags";

        entry.tags.forEach((tag, i) => {
            let entryTag = document.createElement("li");
            entryTagList.appendChild(entryTag);

            let entryTagLink = document.createElement("a");
            entryTag.appendChild(entryTagLink);
            entryTagLink.innerHTML = tag;

            if (i != entry.tags.length - 1)
                entryTagList.appendChild(document.createTextNode("\u00A0")); // Adds whitespace
        });
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    createImageViewer();

    entryParent = document.getElementById("entries");
    entries.forEach(entry => {
        createEntry(entry);
    });
});
