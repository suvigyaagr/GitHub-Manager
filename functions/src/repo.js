const ar = require('./tasks/assistantReply');

const aogResponseType = require('./static/AOGResponseType');

const rsp = require('./static/response');

const request = require('request');

module.exports = {
  listOfRepos: function (conv) {
    const API_URL = `${rsp.GITHUB_URL}/user/repos`;
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
        result.res.body.slice(0, rsp.LIST_LIMIT).forEach((element, i) => {
          listData[element.id] = {
            title: `${i+1}: ${element.full_name}`,
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
        }
        return;
      },
  );
  }
}