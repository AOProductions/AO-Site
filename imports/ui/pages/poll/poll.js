import './poll.html';

import '../../components/poll/photoItem/photoItem.js';
import '../../components/poll/textItem/textItem.js';
import '../../components/poll/radioItem/radioItem.js';

Template.poll.helpers({
    // This function takes a list of objects, then builds a list of rows with numPerRow object per rows
    // Used to build rows that fit into Bootstrap's row/column format
    /*

    ~Example~

    Input:
    ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

    Output:
    [{ row: [ "one", "two", "three" ] },
     { row: [ "four", "five", "six" ] },
     { row: [ "seven", "eight", "nine"] }]
    */
    buildRows: function(itemList, numPerRow) {
        row_list = [];
        if(itemList){
            row = {};
            row.row = [];
            for(var i = 0; i<itemList.length; i++){
                row.row.push(itemList[i])
                if((i+1) % numPerRow == 0){
                    row_list.push(row);
                    row = {row: []}
                }
            }
            row_list.push(row);
        }
        return row_list;
    },
    artistList: function() {
        return Template.instance().artistList.get();
    },
    speakerList: function() {
        return Template.instance().speakerList.get();
    },
    genderQuestions: function() {
        genderList = [
            {text: "Genderqueer or gender questioning"},
            {text: "Intersex, disorders of sex development, two-spirit, or other related terms"},
            {text: "Man"},
            {text: "Nonconforming"},
            {text: "Transgender"},
            {text: "Woman"},
            {text: ""},
            {text: "I prefer not to respond"}
        ];
        return genderList;
    },
    raceQuestions: function() {
        raceQuestions = [
            {text: "American Indian or Alaskan Native"},
            {text: "Asian or Asian-American"},
            {text: "Black or African-American"},
            {text: "Hispanic or Latinx"},
            {text: "Middle Eastern"},
            {text: "Native Hawaiian or Pacific Islander"},
            {text: "Two or more races"},
            {text: "White"},
            {text: ""},
            {text: "I prefer not to respond"}
        ];
        return raceQuestions;
    },
    genreQuestions: function() {
        genreQuestions = [
            {text: "Blues"},
            {text: "Country"},
            {text: "Electronic"},
            {text: "Folk"},
            {text: "Hip-Hop"},
            {text: "Jazz"},
            {text: "Reggae"},
            {text: "Alternative"},
            {text: "R&B/Soul"},
            {text: "Pop"},
            {text: "Dance"},
            {text: "Rock"},
            {text: "Rap"}
        ];
        return genreQuestions;
    },
    favoriteEventQuestions: function() {
        favoriteEventQuestions = [
            {text: "Ball (Jeremih & Aminé at Riviera Theatre)"},
            {text: "Blowout (Young Thug & Kehlani at Welsh-Ryan Arena)"},
            {text: "Fall Lineup (Finding Dory, The Nice Guys, The Jungle Book, Southside with You)"},
            {text: "Winter Q&A Speaker (Samantha Bee & Rebecca Traister)"},
            {text: "Winter Lineup (Arrival, Moana, Loving, Fantastic Beasts and Where to Find Them)"},
            {text: "B-Fest"},
            {text: "Chicago Benefit (Noname, Jamila Woods, Rachel Williams, Rebecca O’Neil)"},
            {text: "Spring Films Speaker (Moonlight with Barry Jenkins)"},
            {text: "Philfest (Margaret Glaspy & Sanctified Grumblers)"},
            {text: "Comedy Fest (Chris Gethard & Aparna Nancherla)"},
            {text: "Spring Lineup (Space Jam, Rogue One, Lego Batman, Get Out)"},
            {text: "Spring Standup Comedy Speaker (Michael Che & Julio Torres)"},
            {text: "I did not attend any"}
        ];
        return favoriteEventQuestions;
    },
    housingQuestions: function() {
        housingQuestions = [
            {text: "On Campus North"},
            {text: "On Campus South"},
            {text: "Off Campus North"},
            {text: "Off Campus South"},
            {text: "Other"}
        ];
        return housingQuestions;
    },
    yearQuestions: function() {
        yearQuestions = [
            {text: "Freshman"},
            {text: "Sophomore"},
            {text: "Junior"},
            {text: "Senior"},
            {text: "Other"}
        ];
        return yearQuestions;
    },
    starsQuestions: function() {
        starsQuestions = [
            {text: "5 (Excellent!)"},
            {text: "4 (Pretty Good)"},
            {text: "3 (Okay / Not Too Shabby)"},
            {text: "2 (Didn't Like It)"},
            {text: "1 (Awful!)"}
        ];
        return starsQuestions;
    },
    notAttendQuestions: function() {
        yearQuestions = [
            {text: "Answer n/a: I did attend events"},
            {text: "Did not hear about the event"},
            {text: "Did not enjoy previous A&O event"},
            {text: "Time conflicting events"},
            {text: "Did not like the artists"},
            {text: "Too expensive"},
            {text: "Too far of a location"},
            {text: "Did not know who the artists/celebrities were"},
            {text: "Do not personally like A&O"}
        ];
        return yearQuestions;
    },
    pollCompleted: function() {
        return Template.instance().pollCompleted.get();
    }
});

Template.poll.onCreated(function() {
    // Initialize variables used in the poll:
    // timestamp = The time the user first loads the poll
    // artistList = List of artists and their images
    // speakerList = List of speakers and their images
    // pollCompleted = Has the user finished the poll yet?

    this.timestamp = new ReactiveVar();
    this.artistList = new ReactiveVar();
    this.speakerList = new ReactiveVar();
    this.pollCompleted = new ReactiveVar(false);

    var prev_completed = Cookie.get('pollCompleted');
    if (prev_completed) {
        this.pollCompleted.set(true);
    }

    var time = this.timestamp;
    time.set(new Date());

    var al = this.artistList;
    var sp = this.speakerList;

    // The following functions grab the artists and speakers from the database
    Meteor.call('logArtists', function(err, response) {
        if (err) {
            console.log(err);
            return;
        }
        al.set(response);
    })

    Meteor.call('logSpeakers', function(err, response) {
        if (err) {
            console.log(err);
            return;
        }
        sp.set(response);
    })
});

Template.poll.events({
    'submit .poll-submit' (event) {
        // Prevent default browser form submit
        event.preventDefault();
        var response = {}

        // Grab all the 'poll-group' items from the form
        var poll_groups = Array.from(document.getElementsByClassName('poll-group'));

        // Grab the time the user started the poll
        var pollTimestamp = Template.instance().timestamp.get();
        response.startTimestamp = pollTimestamp;

        response.responses = [];

        // Iterate through each poll group and add the <input> fields and their values to the 'response' dictionary
        for (var i = 0; i<poll_groups.length; i++){
            var question = {};

            // Grab the poll-group's title and store it
            var question_title = poll_groups[i].getElementsByClassName('poll-question-title')[0].innerText;
            question["question"] = question_title;

            // grab all the poll-items within the pollGroup
            var pollGroupElements = Array.from(poll_groups[i].getElementsByClassName('poll-item'));

            question["response"] = []

            // If the pollGroup only has one input (textField, emailField, etc.)
            if(pollGroupElements.length == 1){
                var questionItem = {}
                questionItem.value = pollGroupElements[0].value
                question["response"].push(questionItem);
            } else {
                // If the pollGroup is multiple selection
                for(var j = 0; j<pollGroupElements.length; j++){
                    var questionItem = {}
                    // the <input>'s data-responsevalue field is the value we want to store
                    // grab it and its corresponding value, then store it in the question object
                    questionItem.name = pollGroupElements[j].getAttribute('data-responsevalue')
                    questionItem.value = pollGroupElements[j].checked;
                    question["response"].push(questionItem);

                }
            }
            // Add the results from the poll-group to the overall 'response' object
            response.responses.push(question);
        }

        // Store the response
        Meteor.call('insertResponse', response);

        Cookie.set('pollCompleted', true);
        var completed = Template.instance().pollCompleted;
        completed.set(true);
    }
});
