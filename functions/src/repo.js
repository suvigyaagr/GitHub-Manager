const ar = require('./tasks/assistantReply');

const aogResponseType = require('./static/AOGResponseType');

const rsp = require('./static/response');

const request = require('request');

const moment = require('moment-timezone');

module.exports = {
  listOfRepos: function (conv, params) {
    if (!params.visibility) {
      ar.askUser(conv, aogResponseType.NONE_RESPONSE, 'Please choose the visibility:');
      ar.askUser(conv, aogResponseType.SUGGESTIONS, rsp.VISIBILITY_SUGGESTIONS);
    }
    else {
      const {
        visibility
      } = params;
      const API_URL = `${rsp.GITHUB_URL}/user/repos?visibility=${visibility}`;
      console.log(`GitHub-Manager:listOfRepo:API_URL: ${API_URL}`);
      const process = new Promise((resolve, reject) => {
        request.get(API_URL, {
          headers: {
            'Authorization': `Bearer ${conv.user.access.token}`,
            'User-Agent': 'Manager GitHub',
          },
          json: true,
        }, (err, res) => {
          if (err) {
            console.error(`GitHub-Manager:listOfRep:Error: ${err}`);
            reject(rsp.API_REQUEST_ERROR);
          }
          else {
            resolve({
              res,
            });
          }
        }
        ); // End of request.get
      }); // End of Promise
      return process.then(
        (result) => {
          console.log("Res"+JSON.stringify(result.res));
          listData = {}
          result.res.body
          .sort((a, b) => (moment(a.updated_at) < moment(b.updated_at) ? 1 : -1))
          .slice(0, rsp.LIST_LIMIT)
          .forEach((element, i) => {
            listData[i] = {
              title: `${element.full_name}`,
              description: `${element.description}`,
            };
          });
          ar.askUser(conv, aogResponseType.NONE_RESPONSE, `Status: ${result.res.statusCode}`);
          ar.askUser(conv, aogResponseType.LIST, {
            title: `List of repositeries`,
            items: listData,
          });
          return;
        },
        (error) => {
          if (error === API_REQUEST_ERROR) {
            ar.stateUser(conv, aogResponseType.NONE_RESPONSE, rsp.ERROR_RESPONSE);
          }
          else {
            ar.askUser(conv, aogResponseType.NONE_RESPONSE, rsp.ERROR_RESPONSE);
            ar.askUser(conv, aogResponseType.SUGGESTIONS, rsp.MAIN_SUGGESTIONS);
          }
          return;
        }
      );
    }
  }
}