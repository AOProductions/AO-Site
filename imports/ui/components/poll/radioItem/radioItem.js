import './radioItem.html'

Template.radioItem.events({
    // Grabs all radio inputs that AREN'T checked and removes 'selected-item' class
    // Grabs all radio inputs that ARE checked and adds the 'selected-item' class
    // TODO: Make this neater
    'change .radio-item' (event) {
        var name = event.target.name;
        $("input[type='radio'][name='" + event.target.name + "']:checked").parent().parent().addClass('selected-item');
        $("input[type='radio'][name='" + event.target.name + "']:not(:checked)").parent().parent().removeClass('selected-item');
    }
})
