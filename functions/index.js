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


exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);