var express = require('express');
var router = express.Router();

router.get('/v:version/', function(request, response) {
  if(request.params.version !='1'){
    response.status(404);
    response.send('Invalid version');
    return;
  }
  var result = {};
  result.ipaddress = request.connection.remoteAddress;
  result.language = request.headers["accept-language"].split(",")[0];
  var userAagent = request.headers["user-agent"];
  if (userAagent) {
    var match = userAagent.match(/\((.+?)\)/);
    if (match) {
      result.software = match[1];
    }
  }

  response.setHeader('Content-Type', 'application/json');
  response.json(result);
});

router.use('/', express.static(__dirname + '/static/'));

module.exports = router;
