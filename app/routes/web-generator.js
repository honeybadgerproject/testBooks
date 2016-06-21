var express = require('express');
var router = express.Router();
var models  = require('../models');

var exec = require('child_process').exec;



	/* GET home page. */
	router.post('/api/createweb', function(req, res, next) {
		console.log('GET: -----------------------CREATE WEB------------------');

		// create a new nested folders path for the web index

	  exec('./script-web-creator.sh path1 path2 path3 content', function(error, stdout, stderr) {
    	console.log('stdout: ' + stdout);
    	console.log('stderr: ' + stderr);
    	if (error !== null) {
        console.log('exec error: ' + error);
    	}
		});
	});

module.exports = router;
