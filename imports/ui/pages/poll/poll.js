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
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    console.log("yooooo");

    target.text.value = "";
    }
});
