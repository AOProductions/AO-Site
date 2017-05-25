import './photoItem.html';

// Component which consists of an image, and a text field underneath it

Template.photoItem.events({
    // Event that triggers class switching and item selection
    // 'selected-item': cyan border
    // TODO: Change this to reflect the state of the input checkbox instead
    // (i.e. if(image.checked == True){image.set(full color)} else {image.set(grayscale)})
    'click .photo-item' (event) {
        var name = event.target.name;
        // Searches if the image has the specific class
        if ($('img[data-name="' + name + '"]').hasClass('selected-item')){
            $('img[data-name="' + name + '"]').addClass('deselected-item');
            $('img[data-name="' + name + '"]').removeClass('selected-item');
        } else {
            $('img[data-name="' + name + '"]').addClass('selected-item');
            $('img[data-name="' + name + '"]').removeClass('deselected-item');
        }
    }
});
