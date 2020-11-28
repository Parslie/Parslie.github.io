$(document).ready(function() {
    const $entries = $('#entries');

    // Create image viewer
    const $imageViewerBg = $('<div id="image-viewer-bg">')
        .css('visibility', 'hidden')
        .appendTo('body');
    const $imageViewerImg = $('<img id="image-viewer">')
        .css('visibility', 'hidden')
        .appendTo('body');

    $imageViewerBg.click(function() {
        $imageViewerBg.css('visibility', 'hidden');
        $imageViewerImg.css('visibility', 'hidden');
    });

    $.each(entries, function(i, entry) {
        let $section = $('<section class="entry">').appendTo($entries);

        // Header
        let $title = $('<h1>').append(entry.title).appendTo($section);
        if (entry.color)
            $title.css('color', entry.color);

        // Place image
        let $imgContainer = $('<div class="img-container">').appendTo($section);
        let $img = $('<img>').attr('src', entry.image).appendTo($imgContainer);

        // Resize image
        let theImg = new Image();
        theImg.src = $img.attr('src');

        theImg.onload = function() {
            if (theImg.width < theImg.height) {
                $img.css('width', '100%');
            }
            else {
                $img.css('height', '100%');
                $img.css('min-width', '100%');
            }
        };

        // Set image onClick
        $img.click(function() {
            $imageViewerImg.attr('src', $img.attr('src'));
            $imageViewerBg.css('visibility', 'visible');
            $imageViewerImg.css('visibility', 'visible');
        });

        // Content
        $('<p>').append(entry.description).appendTo($section);

        // Footer
        if (entry.repository) {
            let $repository = $('<p>').append('Repository: ').appendTo($section);
            let $repLink = $('<a>').attr('href', entry.repository).append(entry.repository).appendTo($repository);
            if (entry.color)
                $repLink.css('color', entry.color);
        }

        if (entry.tags) {
            let $tagList = $('<ul class="tags">').appendTo($section);

            $.each(entry.tags, function(i, tag) {
                let $tagItem = $('<li>').appendTo($tagList);
                let $tagLink = $('<a>').append(tag).appendTo($tagItem);
                if (entry.color)
                    $tagLink.css('color', entry.color);
            });
        }
    });
});