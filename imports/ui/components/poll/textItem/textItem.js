import "./textItem.html"

Template.textItem.events({
    'click .text-item' (event) {
        // Stop Propagation makes sure you can register a click on the entire textItem and not just specific elements
        event.preventDefault();
        event.stopPropagation();

        event.currentTarget.getElementsByClassName('poll-item')[0].checked = !event.currentTarget.getElementsByClassName('poll-item')[0].checked;

        // Set current item's status given its checked status
        if(event.currentTarget.getElementsByClassName('poll-item')[0].checked){
            event.currentTarget.classList.add('selected-item');
        } else {
            event.currentTarget.classList.remove('selected-item');
        }
    }
});
