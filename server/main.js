// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

Meteor.methods({
  insertResponse(response) {
      new_response = {}
      new_response.timestamp = new Date();
      new_response.response = response;
      PollResponses.insert(new_response);
  },

  logArtists(){
      response = null
      response = JSON.parse(Assets.getText('artists.json'));
      return response;
  }
});
