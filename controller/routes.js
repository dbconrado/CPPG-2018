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
	var sql;
	var ultimoAno=0;
	var penultimoAno=0;
	var anoRetrasado=0;
	var nPesquisaUltimoAno = 0;
	var nEnsinoUltimoAno = 0;
	var nExtensaoUltimoAno = 0;


	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "root",
	  database: "cppg",
	  multipleStatements: true
	});

	try {
		con.connect();
		con.query("SELECT anoEdital FROM projeto GROUP BY anoEdital ORDER BY anoEdital DESC", function (er, result, fields)
		{
		if (er) throw er;
		else
		{
			//setYearValues(result);

			ultimoAno = result[0].anoEdital;
			penultimoAno = ultimoAno-1;
			anoRetrasado = penultimoAno-1;

			sql = "SELECT COUNT(*) AS total, anoEdital, categoriaProjeto FROM projeto WHERE categoriaProjeto = 'Pesquisa' GROUP BY anoEdital ORDER BY anoEdital DESC;";
			con.query(sql, function (er, result, fields)
			{
				if(er) throw er;
				else
				{
					//console.log(result);
					if (result[0] != undefined)
					{
						if(result[0].anoEdital == ultimoAno) nPesquisaUltimoAno = result[0].total;
						else nPesquisaUltimoAno = 0;
					}
					else nPesquisaUltimoAno = 0;
					//console.log(nPesquisaUltimoAno);

					sql = "SELECT COUNT(*) AS total, anoEdital, categoriaProjeto FROM projeto WHERE categoriaProjeto = 'Ensino' GROUP BY anoEdital ORDER BY anoEdital DESC;";
					con.query(sql, function (er, result, fields)
					{
						if(er) throw er;
						else
						{
							//console.log(result);
							if (result[0] != undefined)
							{
								if(result[0].anoEdital == ultimoAno) nEnsinoUltimoAno = result[0].total;
								else nEnsinoUltimoAno = 0;
							}
							else nEnsinoUltimoAno = 0;
							//console.log(nEnsinoUltimoAno);


							sql = "SELECT COUNT(*) AS total, anoEdital, categoriaProjeto FROM projeto WHERE categoriaProjeto = 'Extensão' GROUP BY anoEdital ORDER BY anoEdital DESC;";
							con.query(sql, function (er, result, fields)
							{
								if(er) throw er;
								else
								{
									//console.log(result);
									if (result[0] != undefined)
									{
										if(result[0].anoEdital == ultimoAno) nExtensaoUltimoAno = result[0].total;
										else nExtensaoUltimoAno = 0;
										console.log(nExtensaoUltimoAno);
										/*console.log(ultimoAno);
										console.log(penultimoAno);
										console.log(anoRetrasado);
										console.log(nPesquisaUltimoAno);
										console.log(nEnsinoUltimoAno);
										console.log(nExtensaoUltimoAno);*/
										sendToView(ultimoAno, penultimoAno, anoRetrasado, nPesquisaUltimoAno, nExtensaoUltimoAno, nEnsinoUltimoAno);
									}
									else nExtensaoUltimoAno = 0;
									//console.log(nExtensaoUltimoAno);
								}
							});
						}
					});
				}
			});
		}
		});

		/*function setYearValues(years) {
			ultimoAno = years[0].anoEdital;
			penultimoAno = years[1].anoEdital;
			anoRetrasado = years[2].anoEdital;
		}*/

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