import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/calendar/calendar.js';
import '../../ui/pages/about/about.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/calendar', {
    name: 'App.calendar',
    action() {
        BlazeLayout.render('calendar', {main: 'App_home'});
    }
});

FlowRouter.route('/about', {
    name: 'App.about',
    action() {
        BlazeLayout.render('about', {main: 'App_home'});
    }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
