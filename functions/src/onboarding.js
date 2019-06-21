const ar = require('./tasks/assistantReply')

const aogResponseType = require('./static/AOGResponseType')


module.exports = {
  welcome: function (conv) {
    ar.askUser(conv, aogResponseType.NONE_RESPONSE, 'Welcome to GitHub Manager.')
  }
}