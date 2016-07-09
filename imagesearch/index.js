var express = require('express');
var router = express.Router();
var FifoArray = require('fifo-array');
var Search = require('bing.search');
var util = require('util');
var search = new Search(process.env.BING_SEARCH_KEY);

var fifoArray = new FifoArray(10);
console.log(fifoArray);

router.use('/', express.static(__dirname + '/static/'));

router.get('/v1/:search', function(request, response) {
  var result = [];
  var offset = parseInt(request.query.offset)||0;
  console.log(offset);

  search.images(request.params.search,
    {top: 10,
     skip: offset
    },
    function(err, results) {
      for(var i=0; i<results.length; i++){
        result[i]={"url": results[i].url,
          "snippet": results[i].title,
          "thumbnail": results[i].thumbnail.url,
          "context": results[i].sourceUrl
        };
      }
      if (request.query.output == 'html') {
        response.setHeader('Content-Type', 'text/html');
        var page = '';
        for (var i = 0; i< result.length; i++) {
          page += '<a href="' + result[i].context + '"><img src="' + result[i].thumbnail + '"></img></a>';
        }
        response.end(page);
      } else {
        response.setHeader('Content-Type', 'application/json');
        response.json(result);
      }
    }
  );

  fifoArray.push({"term": request.params.search, "time": (new Date()).toISOString()});
});


router.get('/v1/is-stat/latest', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.json(fifoArray);
});


module.exports = router;
