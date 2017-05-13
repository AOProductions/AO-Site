import './poll.html';

import '../../components/poll/item/item.js';

Template.poll.helpers({
    rows: [{
        items: [
            {
                name: "Kanye",
                selected: false
            },
            {
                name: "Drake",
                selected: false
            },
            {
                name: "DRAM",
                selected: false
            },
            {
                name: "Skepta",
                selected: false
            }
        ]},{items: [
            {
                name: "Kendrick",
                selected: false
            },
            {
                name: "Pablo",
                selected: false
            },
            {
                name: "Jeff",
                selected: false
            }
        ]}
    ]
});

Template.poll.events({
  'submit .poll-submit'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    var elements = document.getElementsByClassName('artist-box');
    var artistSelectedPairs = [];

    for(var i = 0; i < elements.length; i++){
        var key_val = {
            name: elements[i].name,
            selected: elements[i].checked,
        }

        artistSelectedPairs.push(key_val);
    }

    function showSelected(pair) {
        return pair.selected;
    }

    console.log(artistSelectedPairs);

}}, {
    'change .artist-box'(event) {
        event.preventDefault();
        console.log("change");
    }
});
