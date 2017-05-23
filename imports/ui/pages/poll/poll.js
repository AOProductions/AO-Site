import './poll.html';

import '../../components/poll/photoItem/photoItem.js';
import '../../components/poll/textItem/textItem.js';
import '../../components/poll/radioItem/radioItem.js';

Template.poll.helpers({
    artistList: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().artistList.get();
    },
    speakerList: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().speakerList.get();
    },
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
    },
    housingQuestions: function() {
        housingQuestions = [
            {text: "On Campus North"},
            {text: "On Campus South"},
            {text: "Off Campus North"},
            {text: "Off Campus South"}
        ];
        return housingQuestions;
    },
    yearQuestions: function() {
        yearQuestions = [
            {text: "Freshman"},
            {text: "Sophomore"},
            {text: "Junior"},
            {text: "Senior"}
        ];
        return yearQuestions;
    },
    starsQuestions: function() {
        starsQuestions = [
            {text: "1"},
            {text: "2"},
            {text: "3"},
            {text: "4"},
            {text: "5"}
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
    this.artistList = new ReactiveVar(null);
    this.speakerList = new ReactiveVar(null);
    this.pollCompleted = new ReactiveVar(false);

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

        console.log(artistSelectedPairs)
        var completed = Template.instance().pollCompleted;
        completed.set(true);

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
        event.currentTarget.getElementsByClassName('poll-item')[0].checked = !event.currentTarget.getElementsByClassName('poll-item')[0].checked;

        if(event.currentTarget.getElementsByClassName('poll-item')[0].checked){
            event.currentTarget.classList.add('selected-item');
        } else {
            event.currentTarget.classList.remove('selected-item');
        }
    },
    'change .radio-item' (event) {
        var name = event.target.name;
        $("input[type='radio'][name='" + event.target.name + "']:checked").parent().parent().addClass('selected-item');
        $("input[type='radio'][name='" + event.target.name + "']:not(:checked)").parent().parent().removeClass('selected-item');
    }
});
