var express = require('express');
var router = express.Router();
var util = require('util');
var multer = require('multer');
var upload = multer({ dest: 'uploads' }).single('file');
var fs = require("fs");

router.use('/', express.static(__dirname + '/static/'));

router.get('/v1/upload', function(request, response) {
  response.setHeader('Content-Type', 'text/html');
  response.end(
    '<form action="size" method="post" enctype="multipart/form-data">\
    <input type="file" name="file">\
    <input type="submit" value="Upload">\
    </form>'
  );
});

router.post('/v1/size', function(request, response) {
  upload(request, response, function (err) {
    if (err) {
      // An error occurred when uploading
      response.status(500);
      response.end("Internal Server Error");
      console.log(err);
    }
    // Everything went fine
    if (request.file) {
  	  console.log(util.inspect(request.file));
  		response.end(request.file.size.toString());
  	}else{
  	  response.end('No file received');
  	}
  });

});

module.exports = router;

