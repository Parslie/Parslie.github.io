$(document).ready(function() {
    const $entries = $('#entries');

    $.each(entries, function(i, entry) {
        let $section = $('<section class="entry">').appendTo($entries);

        // Header
        $('<h1>').append(entry.title).appendTo($section);

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
                $img.css('position', 'relative');
                $img.css('top', '0');
                $img.css('bottom', '0');
                $img.css('min-width', '100%');
            }
        };

        // Content
        $('<p>').append(entry.description).appendTo($section);

        // Footer
        if (entry.repository) {
            let $repository = $('<p>').append('Repository: ').appendTo($section);
            $('<a>').attr('href', entry.repository).append(entry.repository).appendTo($repository);
        }

        if (entry.tags) {
            let $tagList = $('<ul class="tags">').appendTo($section);

            $.each(entry.tags, function(i, tag) {
                let $tagItem = $('<li>').appendTo($tagList);
                $('<a>').append(tag).appendTo($tagItem);
            });
        }
    });
});