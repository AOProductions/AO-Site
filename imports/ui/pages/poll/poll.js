import './poll.html';

import '../../components/poll/item/item.js';

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
        console.log(row_list)
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
        console.log(row_list)
        return row_list;
    },
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
        console.log(al.get());
    })

    Meteor.call('logSpeakers', function(err, response) {
        if (err) {
            console.log(err);
            return;
        }
        sp.set(response);
        console.log(sp.get());
    })
});

Template.poll.events({
    'submit .poll-submit' (event) {
        // Prevent default browser form submit
        event.preventDefault();
        var elements = document.getElementsByClassName('artist-box');
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

        Meteor.call('insertResponse', artistSelectedPairs, (error) => {
            if (error) {
                console.log(error);
            }
        });

    }
});
