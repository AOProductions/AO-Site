// Import server startup through a single index entry point

import './fixtures.js';
import './register-api.js';

Meteor.startup(function() {
    var artists = JSON.parse(Assets.getText('artists.json'));
});
