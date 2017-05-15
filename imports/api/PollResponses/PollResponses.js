import { Mongo } from 'meteor/mongo';

PollResponses = new Mongo.Collection('pollresponses');

PollResponses.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

PollResponses.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
