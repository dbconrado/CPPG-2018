var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Cool, huh!', condition: false });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/users/detail', function(req, res, next) {
	res.send('detail');
});

router.get('/charts', function(req, res, next) {
	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "root",
	  database: "cppg"
	});

	var teste = con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT * FROM projeto AS gas", function (err, result, fields) {
	    if (err) throw err;
	    else {
    	    numRows = result[0];
	    	//console.log(result.gas);
	    	res.render(path.resolve(__dirname + '/../views/index.ejs'), {
			hamburguer: numRows
		});
	    }
	  });
	});
});
module.exports = router;