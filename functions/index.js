'use-strict'

const {
    dialogflow,
  } = require('actions-on-google');
  
// Import the firebase-functions package for deployment.
const functions = require('firebase-functions')

// Instantiate the Dialogflow client.
const app = dialogflow({
    debug: true,
})

const onboarding = require('./src/onboarding');
app.intent('Default Welcome Intent', (conv) => onboarding.welcome(conv));
app.intent('GitHub SignIn', (conv, params, signin) => onboarding.signIn(conv, params, signin));

const repos = require('./src/repo.js');
app.intent('List of Repos', (conv) => repos.listOfRepos(conv));

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);