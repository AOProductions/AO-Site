import './poll.html';

import '../../components/poll/item/item.js';

Template.poll.helpers({
    artists: [
        {
            row: [
                {
                    name: "Kanye"
                }, {
                    name: "Drake"
                }, {
                    name: "DRAM"
                }, {
                    name: "Skepta"
                }
            ]
        }, {
            row: [
                {
                    name: "Kendrick"
                }, {
                    name: "Pablo"
                }, {
                    name: "Jeff"
                }
            ]
        }
    ],
    artistList: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().artistList.get();
    },
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
    }
});

Template.poll.onCreated(function() {
    this.artistList = new ReactiveVar(null);
    var al = this.artistList;

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
