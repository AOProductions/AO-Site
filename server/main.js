// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

Meteor.methods({
  insertResponse: function(response) {
      new_response = response;
      new_response.endTimestamp = new Date();
      console.log(new_response);
      PollResponses.insert(new_response);
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
