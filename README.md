# AO Productions Website

This is the website for Northwestern University's AO Productions. See this site live at: [ao-productions.net](http://www.ao-productions.net/)

## General Overview 

**Technology:** This project is written in Javascript, and uses [Meteor.js](http://www.meteor.com/) to manage the client frontend and the server backend.

## Building and Running:  
To run this project, you need to go through the following steps:  
(You may need to install a few programs, namely (`git`, `npm`, and `meteor`))  
1. Download the project folder to your computer: 
```
git clone https://github.com/AOProductions/AO-Site
```

2. Move into the project folder:
```
cd AO-Site
```

3. Install the required packages:
```
npm install
```

4. Run the project using meteor:
```
meteor
```

Once the project builds, you should see a message similar to:  
```
[[[[[ ~/<path>/<to>/<project>/AO-Site ]]]]]

=> Started proxy.
=> Started MongoDB.
=> Started your app.

=> App running at: http://localhost:3000/
```

This means you made it through successfully! :thumbsup: You can now visit that URL to see the project. 


## Deploying your changes to Galaxy  
In AO we use [Namecheap](http://namecheap.com) to manage our domain name (a.k.a. the url: ao-productions.net) and [Galaxy](http://www.meteor.com/hosting) to host the code for the site. When making changes to the site, you shouldn't need to change anything in Namecheap; you only need to push your changes to Galaxy. To do this, you need to:  

1. Make sure you're added to the Galaxy organization. (Ask someone if you need access to this)

2. Download the `settings.json` file and put it in the AO-Site folder you've been working on. You should only need to do this once. The `settings.json` file contains all the configuration we use on the live site such as Database URLs, Social Media plugin keys, etc. (Ask someone if you need this file)

3. Push your changes to Galaxy using the command:
```
DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy --settings settings.json www.ao-productions.net
```

After that you should see something similar to: 
```
Talking to Galaxy servers at https://us-east-1.galaxy-deploy.meteor.com
Deploying your app...
App starting at www.ao-productions.net in aoproductions's account in us-east-1. Visit https://galaxy.meteor.com/app/www.ao-productions.net to check the status of your app.
```

This means you made it through successfully! :thumbsup: You can now visit the official URL to see the live project. 


If you have any questions or need help with any part of the project, feel free to reach out to anyone whose worked on this project in the past and they'll be glad to help!
