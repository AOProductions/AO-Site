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

      var validResponse = true;

      // Validation Process
      // 1. Check time taken to complete poll and compare to threshold
      // 2. Validate each question to make sure the length of responses to each question is valid
      // 3. Validate each question to make sure the name is valid and value is a boolean
      // 4. Check Honeypot


      // Check time
      var threshold = 40;
      timeDiff = (new_response.endTimestamp.getTime() - new_response.startTimestamp.getTime()) / 1000;
      if(timeDiff < threshold){
          console.log("Spam detected, poll took: " + timeDiff + " seconds.")
          validResponse = false;
      } else {
          console.log("Took longer than " + threshold + " seconds, valid response");
      }

      // Validate question length
      var questionLengths = [
          51,
          13,
          14,
          5,
          5,
          8,
          10,
          5,
          13,
          13,
          13,
          9,
          1,
          1,
          1,
      ]

      for(var i=0; i<questionLengths.length; i++){
          curr_question_length = new_response.responses[i].response.length;
          if (curr_question_length != questionLengths[i]){
              console.log("Question length mismatch!");
              console.log(curr_question_length + " doesn't equal actual question length, " + questionLengths[i]);
              validResponse = false;
          }
      }

      // Check honeypot question
      var honey = response.responses[14].response[0].value;

      if (honey != ""){
          console.log("Spam response detected!");
          console.log("HoneyPot = " + honey);
          validResponse = false;
      }


      if (validResponse){
          console.log("Vaild response, inserting into the database")
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
