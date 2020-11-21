function applyData(data) {
    const entryDiv = document.getElementById("entries");
    
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const section = document.createElement("section");

        const title = document.createElement("h1");
        title.innerHTML = element.title;
        section.appendChild(title);

        const image = document.createElement("img");
        image.setAttribute("src", element.image);
        section.appendChild(image);

        const table = document.createElement("table");
        section.appendChild(table);

        const typeRow = document.createElement("tr");
        table.appendChild(typeRow);
        const whatRow = document.createElement("tr");
        table.appendChild(whatRow);
        const whenRow = document.createElement("tr");
        table.appendChild(whenRow);
        const howRow = document.createElement("tr");
        table.appendChild(howRow);

        const typeTitle = document.createElement("td");
        typeTitle.className = "title";
        typeTitle.innerHTML = "Type";
        typeRow.appendChild(typeTitle);
        const whenTitle = document.createElement("td");
        whenTitle.className = "title";
        whenTitle.innerHTML = "When";
        whenRow.appendChild(whenTitle);
        const whatTitle = document.createElement("td");
        whatTitle.className = "title";
        whatTitle.innerHTML = "What";
        whatRow.appendChild(whatTitle);
        const howTitle = document.createElement("td");
        howTitle.className = "title";
        howTitle.innerHTML = "How";
        howRow.appendChild(howTitle);

        const typeContent = document.createElement("td");
        typeContent.innerHTML =  element.type;
        typeRow.appendChild(typeContent);
        const whenContent = document.createElement("td");
        whenContent.innerHTML =  element.when;
        whenRow.appendChild(whenContent);
        const whatContent = document.createElement("td");
        whatContent.innerHTML =  element.what;
        whatRow.appendChild(whatContent);
        const howContent = document.createElement("td");
        howContent.innerHTML =  element.how;
        howRow.appendChild(howContent);

        entryDiv.appendChild(section);
    }
}

window.onload = function() {
    applyData(JSON.parse(`[
        {
            "title": "Test Title", 
            "image": "res/img/parslie.png",
            "type": "Test Type", 
            "what": "Test Description", 
            "when": "Test Time", 
            "how": "Test Source"
        },{
            "title": "Double Jam", 
            "image": "res/img/DoubleJams.png",
            "type": "Photoshop", 
            "what": "RMs face photoshopped over two of my friends' faces",
            "when": "9th grade (2015/2016)",  
            "how": "Photoshop"
        },{
            "title": "J-Horse", 
            "image": "res/img/J-Horse.png",
            "type": "Photoshop", 
            "what": "A photoshop if a horses face onto J-Hope's face, based on his (defunct) nickname", 
            "when": "9th grade (2015/2016)", 
            "how": "Photoshop"
        }
    ]`));
}