// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

import { check } from 'meteor/check'

Meteor.methods({
  insertResponse: function(response) {
      // To prevent spam responses
      // If the user fills out the poll quicker than 30 seconds, assume they're a bot and ignore the response
      new_response = response;
      new_response.endTimestamp = new Date();

      // Validation Process
      // 1. Check time taken to complete poll and compare to threshold
      // 2. Validate each question to make sure the length of responses to each question is valid
      // 3. Validate each question to make sure the name is valid and value is a boolean


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
