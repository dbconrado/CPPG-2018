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
	  database: "cppg",
	  multipleStatements: true
	});

	try {
		con.connect();

		var sql = "SELECT anoEdital FROM projeto GROUP BY anoEdital ORDER BY anoEdital DESC;SELECT COUNT(*) AS totalPesquisa FROM projeto WHERE categoriaProjeto = 'Pesquisa' GROUP BY anoEdital;SELECT COUNT(*) AS totalExtensao FROM projeto WHERE categoriaProjeto = 'Extensão' GROUP BY anoEdital;SELECT COUNT(*) AS totalEnsino FROM projeto WHERE categoriaProjeto = 'Ensino' GROUP BY anoEdital;";
		con.query(sql, [1,2,3,4], function (er, result, fields) {
			if (er) throw er;
			else {
			    sendToView(result[0][0].anoEdital, result[0][1].anoEdital, result[0][2].anoEdital,
			   	result[0][0].totalPesquisa,result[1][0].totalExtensao,result[2][0].totalEnsino);
			}
		});
		con.end();

		function sendToView(ultimoAno, penultimoAno, anoRetrasado, totalPesquisaUltimoAno, totalExtensaoUltimoAno, totalEnsinoUltimoAno) {
			res.render(path.resolve(__dirname + '/../views/index.ejs'), {
			ultimoAno: ultimoAno,
			penultimoAno: penultimoAno,
			anoRetrasado: anoRetrasado,
			totalPesquisaUltimoAno: totalPesquisaUltimoAno,
			totalEnsinoUltimoAno: totalEnsinoUltimoAno,
			totalExtensaoUltimoAno: totalExtensaoUltimoAno
			});
		}
	}
	catch(e) {
		throw e;
	}
});
module.exports = router;