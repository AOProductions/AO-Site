import './poll.html';

Template.poll.helpers({
    artists: [
        {name: "Kanye"},
        {name: "Drake"},
        {name: "Jaden Smith"},
        {name: "Skepta"},
        {name: "Dave"},
        {name: "Jeff"},
        {name: "Beyoncé"}
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
