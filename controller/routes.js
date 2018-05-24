var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');

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
	  user: "root",
	  password: "root",
	  database: "cppg",
	  multipleStatements: true
	});

	try {
		con.connect();
		// Recupera os três últimos anos nos quais hajam dados no banco
		sql = "SELECT COUNT(*) AS total, anoEdital FROM aluno_participa_projeto AP JOIN projeto P ON P.idProjeto = AP.idProjeto GROUP BY P.anoEdital ORDER BY P.anoEdital DESC";
		con.query(sql, function (er, result, fields)
		{
		if (er) throw er;
		else
		{
			years = result;

			sql = "SELECT COUNT(*) AS total, anoEdital, categoriaProjeto FROM projeto WHERE categoriaProjeto = 'Pesquisa' GROUP BY anoEdital ORDER BY anoEdital DESC;";
			con.query(sql, function (er, result, fields)
			{
				lookForProjectsPerYear(years);

				/*if(er) throw er;
				else
				{
					numberOfProjectsPerYear = lookForProjectsPerYear(result,ultimoAno);

					if (result[0] != undefined)
					{
						if(result[0].anoEdital == ultimoAno) nPesquisaUltimoAno = result[0].total;
						else nPesquisaUltimoAno = 0;
					}
					else nPesquisaUltimoAno = 0;

					if (result[1] != undefined)
					{
						if(result[1].anoEdital == penultimoAno) nPesquisaPenultimoAno = result[1].total;
						else nPesquisaPenultimoAno = 0;
					}
					else nPesquisaPenultimoAno = 0;

					if (result[2] != undefined)
					{
						if(result[2].anoEdital == anoRetrasado) nPesquisaAnoRetrasado = result[2].total;
						else nPesquisaAnoRetrasado = 0;
					}
					else nPesquisaAnoRetrasado = 0;

					sql = "SELECT COUNT(*) AS total, anoEdital, categoriaProjeto FROM projeto WHERE categoriaProjeto = 'Ensino' GROUP BY anoEdital ORDER BY anoEdital DESC;";
					con.query(sql, function (er, result, fields)
					{
						if(er) throw er;
						else
						{
							if (result[0] != undefined)
							{
								if(result[0].anoEdital == ultimoAno) nEnsinoUltimoAno = result[0].total;
								else nEnsinoUltimoAno = 0;
							}
							else nEnsinoUltimoAno = 0;

							if (result[1] != undefined)
							{
								if(result[1].anoEdital == penultimoAno) nEnsinoPenultimoAno = result[1].total;
								else nEnsinoPenultimoAno = 0;
							}							
							else nEnsinoPenultimoAno = 0;

							if (result[2] != undefined)
							{
								if(result[2].anoEdital == anoRetrasado) nEnsinoAnoRetrasado = result[2].total;
								else nEnsinoAnoRetrasado = 0;
							}
							else nEnsinoAnoRetrasado = 0;

							sql = "SELECT COUNT(*) AS total, anoEdital, categoriaProjeto FROM projeto WHERE categoriaProjeto = 'Extensão' GROUP BY anoEdital ORDER BY anoEdital DESC;";
							con.query(sql, function (er, result, fields)
							{
								if(er) throw er;
								else
								{sql = "SELECT COUNT(*) AS total, anoEdital, categoriaProjeto FROM projeto WHERE categoriaProjeto = 'Pesquisa' GROUP BY anoEdital ORDER BY anoEdital DESC;";
			con.query(sql, function (er, result, fields)
			{
				lookForProjectsPerYear(years);
									if (result[0] != undefined)
									{
										if(result[0].anoEdital == ultimoAno) nExtensaoUltimoAno = result[0].total;
										else nExtensaoUltimoAno = 0;
									}
									else nExtensaoUltimoAno = 0;

									if (result[1] != undefined)
									{
										if(result[1].anoEdital == penultimoAno) nExtensaoPenultimoAno = result[1].total;
										else nExtensaoPenultimoAno = 0;
									}
									else nExtensaoPenultimoAno = 0;

									if (result[2] != undefined)
									{
										if(result[2].anoEdital == anoRetrasado) nExtensaoAnoRetrasado = result[2].total;
										else nExtensaoAnoRetrasado = 0;
									}
									else nExtensaoAnoRetrasado = 0;

									sendToView(ultimoAno, penultimoAno, anoRetrasado, nPesquisaAnoRetrasado, nExtensaoAnoRetrasado, nEnsinoAnoRetrasado, nPesquisaPenultimoAno, nExtensaoPenultimoAno, nEnsinoPenultimoAno, nPesquisaUltimoAno, nExtensaoUltimoAno, nEnsinoUltimoAno);
								}
							});
						}
					});
				}*/
			});
		}
		});
	
		function lookForProjectsPerYear(data)
		{
			var typesOfAssistance = [];
			var sql;

			for(var i = 0; i<data.length; i++)
			{
				typesOfAssistance[i] = [0, 0, 0, 0, 0];
			}
			
			for(var i = 0; i<data.length; i++)
			{
				sql = "SELECT AP.modalidadeBolsa AS tipoBolsa FROM aluno_participa_projeto AP JOIN projeto P ON P.idProjeto = AP.idProjeto WHERE P.anoEdital = " + data[i].anoEdital;

				typesOfAssistance.forEach(function(val){
					con.query(sql,val, function (er, result, fields)
					{
						//console.log(result);
						for(var j = 0; j<result.length; j++)
						{
							if(result[j].tipoBolsa == "PIBIC")
							{
								//console.log(typesOfAssistance[0]);
								typesOfAssistance[i][0]++;
							}
							else if(result[j].tipoBolsa == "PIBIC-JR")
							{
								typesOfAssistance[i][1]++;
							}
							else if(result[j].tipoBolsa == "PIBIT")
							{
								typesOfAssistance[i][2]++;
							}
							else if(result[j].tipoBolsa == "PIBEX")
							{
								typesOfAssistance[i][3]++;
							}
							else
							{
								//console.log(typesOfAssistance[i][0]);
								typesOfAssistance[i][4]++;
							}
						}
						//console.log(result);
					});
					});
				
			}
			return typesOfAssistance;
		}

		function sendToView(ultimoAno, penultimoAno, anoRetrasado, nPesquisaAnoRetrasado, nExtensaoAnoRetrasado, nEnsinoAnoRetrasado, nPesquisaPenultimoAno, nExtensaoPenultimoAno, nEnsinoPenultimoAno, nPesquisaUltimoAno, nExtensaoUltimoAno, nEnsinoUltimoAno)
		{
			res.render(path.resolve(__dirname + '/../views/index.ejs'), {
			ultimoAno: ultimoAno,
			penultimoAno: penultimoAno,
			anoRetrasado: anoRetrasado,
			nPesquisaUltimoAno: nPesquisaUltimoAno,
			nEnsinoUltimoAno: nEnsinoUltimoAno,
			nExtensaoUltimoAno: nExtensaoUltimoAno,
			nPesquisaPenultimoAno: nPesquisaPenultimoAno,
			nEnsinoPenultimoAno: nEnsinoPenultimoAno,
			nExtensaoPenultimoAno: nExtensaoPenultimoAno,
			nPesquisaAnoRetrasado: nPesquisaAnoRetrasado,
			nEnsinoAnoRetrasado: nEnsinoAnoRetrasado,
			nExtensaoAnoRetrasado: nExtensaoAnoRetrasado
			});
		}
	}
	catch(e) {
		throw e;
	}
});
module.exports = router;