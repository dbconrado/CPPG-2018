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
	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "root",
	  database: "cppg"
	});

	var nProjetosUltimoAno;
	var nProjetosPenultimoAno;
	var nProjetosAnoRetrasado;
	try {
		con.connect();
		con.query("SELECT MAX(anoEdital) AS anoAtual, COUNT(*) AS totalProj FROM projeto WHERE categoriaProjeto = 'Pesquisa';",
			function (er, result, fields) {
			if (er) throw er;
			else {
				nProjetosUltimoAno = result[0].totalProj;
			}
		});
		con.end();
	}
	catch(e) {
		throw e;
	}
	try {
		res.render(path.resolve(__dirname + '/../views/index.ejs'), {
			nProjetosUltimoAno: nProjetosUltimoAno
		});
	} catch(e) {
	console.error(e);
	}
	}
});
module.exports = router;