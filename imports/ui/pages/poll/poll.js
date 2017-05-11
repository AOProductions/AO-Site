import './poll.html';

Template.poll.helpers({
    artists: [
        {
            name: "Kanye",
            selected: false
        },
        {
            name: "Drake",
            selected: true
        },
        {
            name: "DRAM",
            selected: false
        },
        {
            name: "Skepta",
            selected: false
        },
        {
            name: "Kendrick",
            selected: true
        },
        {
            name: "Pablo",
            selected: false
        },
        {
            name: "Jeff",
            selected: false
        }
    ],
});



Template.poll.events({
  'submit .poll-submit'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    console.log("Yoooo");

    var elements = document.getElementsByClassName('artist-box');
    var artistSelectedPairs = [];

    for(var i = 0; i < elements.length; i++){
        var key_val = {
            name: elements[i].name,
            selected: elements[i].checked,
        }

        artistSelectedPairs.push(key_val);
    }

    console.log(artistSelectedPairs);

}}, {
    'change .artist-box'(event) {
        event.preventDefault();
        console.log("change");
    }
});
