var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Cool, huh!', condition: false });
});

router.get('/404', function(req, res, next) {
	console.log(req.session.error);
	res.render(path.resolve(__dirname + '/../views/404.ejs'), {});
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
	var nPesquisaPenultimoAno = 0;
	var nEnsinoPenultimoAno = 0;
	var nExtensaoPenultimoAno = 0;
	var nPesquisaAnoRetrasado = 0;
	var nEnsinoAnoRetrasado = 0;
	var nExtensaoAnoRetrasado = 0;
	var numberOfProjectsPerYear;
	var years;


	var con = mysql.createConnection({
	  host: "localhost",
	  user: "jose.luiz",
	  password: "jOzE741963258",
	  database: "cppg",
	  multipleStatements: true
	});

	try {
		con.connect();
		// Recupera os três últimos anos nos quais hajam dados no banco
		sql = "SELECT anoEdital FROM aluno_participa_projeto AP JOIN projeto P ON P.idProjeto = AP.idProjeto GROUP BY P.anoEdital ORDER BY P.anoEdital DESC";
		con.query(sql, function (er, result, fields)
		{
		if (er) throw er;
		else
		{
			years = result;
			var numberOfYears = 0;
			var conta=[];
			var typesOfAssistance = [];

			for(var i=0; i<years.length; i++)
			{
				var tal = lookForProjectsPerYear(years[i].anoEdital, numberOfYears, typesOfAssistance).then(function(typesDown) {
					conta.push(1);

					// Se já rodei todas as promises, mando pra view
					if(conta.length == years.length)
					{
						sendToView(years, typesOfAssistance);
					}
				}).catch((err) => setImmediate(() => { throw err; }));
				numberOfYears++;
			}
		}
		});
	
		function lookForProjectsPerYear(actualYear, countYears, typesOfAssistance)
		{
			var sql = "SELECT AP.modalidadeBolsa AS tipoBolsa FROM aluno_participa_projeto AP JOIN projeto P ON P.idProjeto = AP.idProjeto WHERE P.anoEdital = ?";

			typesOfAssistance[countYears] = [0, 0, 0, 0, 0];
			
			return new Promise(function(resolve,reject)
			{
				con.query(sql, [actualYear], function (er, result, fields)
				{
					if(er) return reject(err);
					for(var j = 0; j<result.length; j++)
					{
						if(result[j].tipoBolsa == "PIBIC")
						{
							typesOfAssistance[countYears][0]++;
						}
						else if(result[j].tipoBolsa == "PIBIC-JR")
						{
							typesOfAssistance[countYears][1]++;
						}
						else if(result[j].tipoBolsa == "PIBIT")
						{
							typesOfAssistance[countYears][2]++;
						}
						else if(result[j].tipoBolsa == "PIBEX")
						{
							typesOfAssistance[countYears][3]++;
						}
						else
						{
							typesOfAssistance[countYears][4]++;
						}
					}
					resolve(typesOfAssistance);
				});
			});
		}

		function getCol(matrix, col)
		{
			var column = [];
			for(var i=0; i<matrix.length; i++){
			   column.push(matrix[i][col]);
			}
			return column;
		 }

		function sendToView(years, typesOfAssistance)
		{
			var pibicAssistance 	= getCol(typesOfAssistance, 0);
			var pibicJrAssistance 	= getCol(typesOfAssistance, 1);
			var pibitAssistance 	= getCol(typesOfAssistance, 2);
			var pibexJrAssistance 	= getCol(typesOfAssistance, 3);
			var volunteerAssistance = getCol(typesOfAssistance, 4);

			var yearData = [];
			for(var i=(years.length-1); i>0; i--)
			{
				yearData.push(years[i].anoEdital);
			}

			res.render(path.resolve(__dirname + '/../views/index.ejs'), {
				years: yearData,
				pibicAssistance: pibicAssistance,
				pibicJrAssistance: pibicJrAssistance,
				pibitAssistance: pibitAssistance,
				pibexJrAssistance: pibexJrAssistance,
				volunteerAssistance: volunteerAssistance
			}, function(err, html) {
				if(err) {
					res.redirect('/404');
				} else {
					console.log('cai');
					res.send(html);
				}
			});
		}
	}
	catch(e) {
		throw e;
	}
});
module.exports = router;