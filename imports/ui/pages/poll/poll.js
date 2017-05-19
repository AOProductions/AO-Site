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

        // Validation:

        // 1. Validate against original list of artists
        // Meteor.call('insertResponse', artistSelectedPairs, (error) => {
        //     if (error) {
        //         console.log(error);
        //     }
        // });

    },
    'click .poll-item' (event) {
        var name = event.target.name;
        if ($('img[data-name="' + name + '"]').hasClass('grey-image')){
            $('img[data-name="' + name + '"]').removeClass('grey-image');
        } else {
            $('img[data-name="' + name + '"]').addClass('grey-image');
        }
    }

});
