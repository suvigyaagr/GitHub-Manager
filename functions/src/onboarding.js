const ar = require('./tasks/assistantReply');

const aogResponseType = require('./static/AOGResponseType');

const rsp = require('./static/response');

module.exports = {
  welcome: function (conv) {
    ar.askUser(conv, aogResponseType.NONE_RESPONSE, 'Welcome to GitHub Manager.');
    ar.askUser(conv, aogResponseType.SIGN_IN, 'To personalize your GitHub experience');
  },

  signIn: function (conv, params, signin) {
    console.log(params);
    console.log(signin);
    if (signin.status === 'OK') {
      ar.askUser(conv, aogResponseType.NONE_RESPONSE, `${rsp.INITIAL_RESPONSE}`);
      ar.askUser(conv, aogResponseType.SUGGESTIONS, rsp.MAIN_SUGGESTIONS);
    }
  },
}