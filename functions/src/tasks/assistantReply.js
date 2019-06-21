const aogResponse = require('actions-on-google');


function askUser (conv, responseType, responseData) {
  var type = responseType ? responseType : "SimpleResponse"
  var data = responseType ? responseData : {
    speech : responseData,
    text : responseData,
  };
  conv.ask(new aogResponse[type](data));
}

function stateUser (conv, responseType, responseData) {
  var type = responseType ? responseType : "SimpleResponse"
  var data = responseType ? responseData : {
    speech : responseData,
    text : responseData,
  };
  conv.close(new aogResponse[type](data));
}

function eventFollowup (conv, eventName) {
  conv.followup(eventName);
}

module.exports = {
    askUser,
    stateUser,
    eventFollowup,
};