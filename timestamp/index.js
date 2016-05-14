var chrono = require("chrono-node");
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use('/api/1/timestamp', express.static(__dirname + '/static/api/1/timestamp/'));

app.get('/api/1/timestamp/:time', function(request, response) {
  var result = {}; 
  if (isNaN(request.params.time)) {
    var natureDate = chrono.parseDate(request.params.time);
    if (!natureDate) {
      result.unix = null;
      result.natural = null;
    }else{
      result.unix= natureDate.getTime()/1000;
      result.natural = natureDate.toLocaleDateString('en-US', { day : 'numeric', month : 'long', year : 'numeric'});
    }
  }else{
      result.unix = Number(request.params.time);
      result.natural = new Date(Number(request.params.time*1000)).toLocaleDateString('en-US', { day : 'numeric', month : 'long', year : 'numeric'});
  }

  response.setHeader('Content-Type', 'application/json');
  response.json(result);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
