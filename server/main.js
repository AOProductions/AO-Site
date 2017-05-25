// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

Meteor.methods({
  insertResponse: function(response) {
      new_response = response;
      new_response.endTimestamp = new Date();

      var threshold = 30;
      timeDiff = (new_response.endTimestamp.getTime() - new_response.startTimestamp.getTime()) / 1000;
      console.log(timeDiff);
      if(timeDiff < threshold){
          console.log("Time to take poll too short, ignoring response");
      } else {
          console.log("Took longer than 30 seconds, valid response");
          PollResponses.insert(new_response);
      }
  },

  logArtists(){
      response = null
      response = JSON.parse(Assets.getText('artists.json'));
      return response;
  },
  logSpeakers(){
      response = null
      response = JSON.parse(Assets.getText('speakers.json'));
      return response;
  }
});
