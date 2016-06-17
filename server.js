var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(__dirname + '/static/'));

app.use('/api/timestamp', require(__dirname + '/timestamp/index.js'));

app.use('/api/whoami', require(__dirname + '/whoami/index.js'));

app.use('/api/urlshortener', require(__dirname + '/urlshortener/index.js'));

app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'), app._router.stack);
  console.log('Node app is running on port', app.get('port'));
});
