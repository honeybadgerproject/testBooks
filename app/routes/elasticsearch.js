var express = require('express');
var router = express.Router();
var models  = require('../models');



//Authentication API routes
module.exports = function(es, esclient) {


	/* GET home page. */
	router.post('/api/search', function(req, res, next) {
		console.log('GET: -----------------------SEARCH------------------');

    esclient.search({
  		index: 'recipes',
  		type: 'recipe',
			_id: 'AVU2JARWmL35jKtTTSa2'
  		/*body: {
    		query: {
      		match: {
        	body: 'elasticsearch'
      		}
    		}
			}*/
		}).then(function (resp) {
			console.log(resp)
    	var hits = resp.hits.hits;
			console.log(hits);
		}, function (err) {
    	console.trace(err.message);
		});
	});


	/* GET home page. */
	router.post('/api/running', function(req, res, next) {
		console.log('GET: -----------------------RUNNING------------------');

    esclient.ping({
      // ping usually has a 3000ms timeout
      requestTimeout: Infinity,

      // undocumented params are appended to the query string
      hello: "elasticsearch!"
    }, function (error) {
      if (error) {
        console.trace('elasticsearch cluster is down!');
      } else {
        console.log('All is well');
      }
    });
	});

		return router;
	}
