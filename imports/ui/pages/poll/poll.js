import './poll.html';

import '../../components/poll/photoItem/photoItem.js';
import '../../components/poll/textItem/textItem.js';

Template.poll.helpers({
    artistList: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().artistList.get();
    },
    // The following function converts a list of Artists to a list of rows,
    // where each row contains 4 artist elements. This is used in addition with the
    // bootstrap rows to ensure responsiveness across devices
    processedArtists: function() {
        var artistList = Template.instance().artistList.get()
        if(artistList){
            row_list = [];
            row = {};
            row.row = [];
            for(var i = 0; i<artistList.length; i++){
                row.row.push(artistList[i])
                if((i+1) % 4 == 0){
                    row_list.push(row);
                    row = {row: []}
                }
            }
            row_list.push(row);
        }
        return row_list;
    },
    speakerList: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().speakerList.get();
    },
    // The following function converts a list of Artists to a list of rows,
    // where each row contains 4 artist elements. This is used in addition with the
    // bootstrap rows to ensure responsiveness across devices
    processedSpeakers: function() {
        var speakerList = Template.instance().speakerList.get()
        if(speakerList){
            row_list = [];
            row = {};
            row.row = [];
            for(var i = 0; i<speakerList.length; i++){
                row.row.push(speakerList[i])
                if((i+1) % 4 == 0){
                    row_list.push(row);
                    row = {row: []}
                }
            }
            row_list.push(row);
        }
        return row_list;
    },
    genderQuestions: function() {
        genderList = [
            {text: "Genderqueer or gender questioning"},
            {text: "Intersex, disorders of sex development, two-spirit, or other related terms"},
            {text: "Man"},
            {text: "Nonconforming"},
            {text: "Transgender"},
            {text: "Woman"},
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
    }
});

Template.poll.onCreated(function() {
    this.artistList = new ReactiveVar(null);
    this.speakerList = new ReactiveVar(null);

    var al = this.artistList;
    var sp = this.speakerList;

    // Wooooooooooowwwwwwwww
    // https://github.com/meteor/blaze/issues/140
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
        var elements = document.getElementsByClassName('poll-item');
        var artistSelectedPairs = [];

        for (var i = 0; i < elements.length; i++) {
            var key_val = {
                name: elements[i].name,
                selected: elements[i].checked
            }

            artistSelectedPairs.push(key_val);
        }

        function showSelected(pair) {
            return pair.selected;
        }

        console.log(artistSelectedPairs);

    },
    'click .poll-item' (event) {
        var name = event.target.name;
        if ($('img[data-name="' + name + '"]').hasClass('selected-item')){
            $('img[data-name="' + name + '"]').addClass('deselected-item');
            $('img[data-name="' + name + '"]').removeClass('selected-item');
        } else {
            $('img[data-name="' + name + '"]').addClass('selected-item');
            $('img[data-name="' + name + '"]').removeClass('deselected-item');
        }
    },
    'click .text-item' (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.currentTarget.getElementsByClassName('poll-item')[0].checked);
        event.currentTarget.getElementsByClassName('poll-item')[0].checked = !event.currentTarget.getElementsByClassName('poll-item')[0].checked;

        if(event.currentTarget.getElementsByClassName('poll-item')[0].checked){
            event.currentTarget.classList.add('selected-item');
        } else {
            event.currentTarget.classList.remove('selected-item');
        }
    }
});
