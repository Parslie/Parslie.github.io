function applyData(data) {
    const entryDiv = document.getElementById("entries");
    
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const elementTags = element.tags;
        const section = document.createElement("section");

        const title = document.createElement("h1");
        title.innerHTML = element.title;
        section.appendChild(title);

        const imageContainer = document.createElement("div");
        imageContainer.style.width = "100%";
        imageContainer.style.height = "0";
        imageContainer.style.paddingBottom = "100%";
        imageContainer.style.borderRadius = "0.5em";
        imageContainer.style.overflow = "hidden";
        imageContainer.style.position = "relative";
        section.appendChild(imageContainer);

        const image = document.createElement("img");
        image.setAttribute("class", "entryImg");
        image.setAttribute("src", element.image);
        imageContainer.appendChild(image);

        image.onload = function() {
            if (image.width < image.height) {
                image.style.width = "100%";
            }
            else {
                image.style.position = "absolute";
                image.style.top = "0";
                image.style.bottom = "0";
            }
        }

        const description = document.createElement("p");
        description.innerHTML = element.description;
        section.appendChild(description);

        if (element.repository) {
            const repository = document.createElement("p");
            repository.innerHTML = "Repository: ";
            section.appendChild(repository);

            const repositoryLink = document.createElement("a");
            repositoryLink.setAttribute("href", element.repository);
            repositoryLink.innerHTML = element.repository;
            repository.appendChild(repositoryLink);
        }

        const tags = document.createElement("ul");
        tags.setAttribute("class", "tags");
        section.appendChild(tags);

        elementTags.forEach(tag => {
            const li = document.createElement("li");
            tags.appendChild(li);

            const a = document.createElement("a");
            a.innerHTML = tag;
            li.appendChild(a);
        });

        entryDiv.appendChild(section);
    }
}

/*
        {
            "title": "Test Title", 
            "images": [
                "res/img/parslie.png"
            ],
            "description": "Desc",
            "repository": "parslie.github.io",
            "tags": [
                "tag1",
                "tag2",
                "tag3"
            ]
        }
*/

window.onload = function() {
    applyData(JSON.parse(`[
        {
            "title": "Doom-like (W.I.P)", 
            "image": "res/img/doom-like/20201126.gif",
            "description": "A project I started for fun, because of my fondness for the graphical & logical style of old-school doom-like games!",
            "repository": "https://github.com/Parslie/doom-like",
            "tags": [
                "Video Game",
                "FPS",
                "Unity"
            ]
        },{
            "title": "Outstanding (W.I.P)", 
            "image": "res/img/outstanding/profile.jpg",
            "description": "A university project for a Social Applications course. Made with a friend on github @tavro.",
            "repository": "https://github.com/Parslie/outstanding-app",
            "tags": [
                "Social Media",
                "Android Studio"
            ],
            "images": [
                "res/img/outstanding/splash.jpg",
                "res/img/outstanding/login.jpg",
                "res/img/outstanding/profile.jpg"
            ]
        }
    ]`));
}