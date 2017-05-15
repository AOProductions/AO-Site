// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

Meteor.methods({
  insertResponse(response) {
      new_response = {}
      new_response.timestamp = new Date();
      new_response.response = response;
      PollResponses.insert(new_response);
  }
});
