var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(__dirname + '/static/'));

app.use('/api/timestamp', require('./timestamp'));

app.use('/api/whoami', require('./whoami'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'), app._router.stack);
});
