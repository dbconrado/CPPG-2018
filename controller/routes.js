// FAZER NUVEM DE TAGS SEPARANDO EM TRES SETORES (TITULO, AUTOR E ALUNO) NA MESMA TELA DOS RESULTADOS
// DA PESQUISA
'use strict';
var path = require('path');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var tagCloud = require('tag-cloud');
var env = process.env.NODE_ENV || 'development';
var config = require('../model/config')[env];
var con = mysql.createConnection({
	host: config.database.host,
	user: config.database.user,
	password: config.database.pass,
	database: config.database.db,
	multipleStatements: true
  });

router.get('/', function(req, res, next) {
	res.render('index.ejs');
});

/* DOCUMENTAÇÃO DA API https://www.npmjs.com/package/tag-cloud */
router.get('/cloud', function(req, res, next) {
	try
	{
		getData().then(function(cloud)
		{
			tagCloud.tagCloud(cloud, function (err, data) {
				res.render('cloud', { cloud: data } );
			}, {
				classPrefix: 'btn tag tag',
				randomize: true,
				numBuckets: 5,
				htmlTag: 'span'
			});
		}).catch((err) => setImmediate(() => { throw err; }));
	}
	catch(err)
	{
		throw err;
	}

	function getData()
	{
		try
		{
			sql = "SELECT palavra AS keyword, COUNT(*) AS totalUsage FROM palavras_chave_publicacao GROUP BY palavra";
			keywordsByUse = [];
			return new Promise(function(resolve, reject)
			{
				con.query(sql, function (err, results, fields)
				{
					var cloud = [];
					results.forEach(function(result)
					{
						cloud.push({
							tagName: result["keyword"], count: result["totalUsage"]
						});
					});
					console.log(cloud);
					resolve(cloud);
				});
			});
		}
		catch(err)
		{
			throw err;
		}
	}
});

router.get('/search/proceedingsOfTeacher=:teacherName', function(req, res, next) {
	teacherName = req.params.teacherName;

	try
	{
		res.send(teacherName);
	}
	catch(err)
	{
		throw err;
	}
});

router.get('/search/teacher=:teacherName', function(req, res, next) {
	var teacherName = req.params.teacherName;

	try
	{
		treatKeywordsForTeacher(teacherName).then(function(cloud)
		{
			tagCloud.tagCloud(cloud, function (err, data) {
				res.render('cloud', { cloud: data } );
			}, {
				classPrefix: 'btn tag tag',
				randomize: true,
				numBuckets: 5,
				htmlTag: 'span'
			});
		}).catch((err) => setImmediate(() => { throw err; }));
	}
	catch(err)
	{
		throw err;
	}
	function treatKeywordsForTeacher(teacherName)
	{
		try
		{
			var sql = "SELECT palavra AS keyword, COUNT(*) AS totalUsage FROM palavras_chave_publicacao PCP JOIN servidor_publica SP ON SP.codPublicacao = PCP.fk_codPublicacao JOIN servidor S ON S.siapeServidor = SP.siapeServidor WHERE S.nomeServidor = '" + teacherName + "' GROUP BY palavra";
			return new Promise(function(resolve, reject)
			{
				con.query(sql, function (err, results, fields)
				{
					console.log(this.sql);
					var cloud = [];
					results.forEach(function(result)
					{
						cloud.push({
							tagName: result["keyword"], count: result["totalUsage"]
						});
					});
					resolve(cloud);
				});
			});
		}
		catch(err)
		{
			throw err;
		}
	}
});

router.post('/search', function(req, res, next) {
	var searchValue = req.body.searchValue;

	try
	{
		if(con.state === 'disconnected')
		{
			con.connect(function(err) {
				if (err) throw err;
			});
		}
		
		searchValue = '%' + searchValue + '%'; // Apenas escapa as aspas simples

		runQueries(searchValue).then(function(result)
		{
			teacherByName(searchValue).then(function(cloud)
			{
				tagCloud.tagCloud(cloud, function (err, data)
				{
					console.log(cloud);
					res.render('searchProceedings', { proceedingsByName: result[0][0], proceedingsByAuthor: result[1][0], proceedingsByStudents: result[2][0], cloud: data } );
				}, {
					classPrefix: 'btn tag tag',
					randomize: true,
					numBuckets: 5,
					htmlTag: 'a',
					additionalAttributes: {href: 'http://' + config.server.host + ':' + config.server.port +'/search/teacher={{tag}}'}
				});
			}).catch((err) => setImmediate(() => { throw err; }));
		}).catch((err) => setImmediate(() => { throw err; }));
	}
	catch(err)
	{
		throw err;
	}

	function teacherByName(teacherName)
	{
		try
		{
			var sql = "SELECT nomeServidor AS teacherName FROM servidor WHERE nomeServidor LIKE '" + teacherName + "' AND tipo = 'DOCENTE'";
			return new Promise(function(resolve, reject)
			{
				con.query(sql, function (err, results, fields)
				{
					var cloud = [];
					results.forEach(function(result)
					{
						cloud.push({
							tagName: result["teacherName"], count: 1
						});
					});
					resolve(cloud);
				});
			});
		}
		catch(err)
		{
			throw err;
		}
	}

	function runQueries(toSearchValue)
	{
		var proceedingName, proceedingPath, index;
		var treatedResults = [];
		var queryGetProceedingsByTitle = "SELECT codPublicacao AS proceedingCode FROM publicacao WHERE nomePublicacao LIKE '" + toSearchValue + "'";
		var queryGetProceedingsByTeachers = "SELECT P.codPublicacao AS proceedingCode, nomePublicacao AS proceedingName, URN_ArtigoCompleto AS proceedingPath, nomeServidor AS proceedingAuthor FROM publicacao P JOIN servidor_publica SP ON SP.codPublicacao = P.codPublicacao  JOIN servidor S ON S.siapeServidor = SP.siapeServidor WHERE S.nomeServidor LIKE '" + toSearchValue + "'";
		var queryGetProceedingsByStudents = "SELECT P.codPublicacao AS proceedingCode FROM publicacao P JOIN aluno_publica AP ON AP.codPublicacao = P.codPublicacao JOIN aluno A ON A.matriculaAluno = AP.matriculaAluno WHERE A.nomeAluno LIKE '" + toSearchValue + "'";
		var sql = queryGetProceedingsByTitle + ";" + queryGetProceedingsByTeachers + ";" + queryGetProceedingsByStudents;

		try
		{
			return new Promise(function(resolve, reject)
			{
				con.query(sql, [1, 2, 3], function (err, results, fields)
				{
					if(err)
					{
						return Promise.reject(err);
					}

					//Trata cada resultado obtido
					//Trata a busca por nome de publicação
					var proceedingsByName = [];
					var promises = [];
					results[0].forEach(function(result)
					{
						proceedingCode = result["proceedingCode"];
						const promise = getProceedingInfo(proceedingCode);
						promises.push(promise);
					});

					//Trata cada resultado obtido
					//Trata a busca por nome de autor
					Promise.all(promises).then(proceeding =>
						{
							proceedingsByName.push(proceeding);
							treatedResults.push(proceedingsByName);
							
							var proceedingsByAuthor = [];
							promises = [];
							results[1].forEach(function(result)
							{
								var proceedingCode = result["proceedingCode"];
								const promise = getProceedingInfo(proceedingCode);
								promises.push(promise);
							});
							//Trata cada resultado obtido
							//Trata a busca por nome de aluno
							Promise.all(promises).then(proceeding =>
							{
								proceedingsByAuthor.push(proceeding);
								treatedResults.push(proceedingsByAuthor);

								var proceedingsByStudents = [];
								promises = [];
								results[2].forEach(function(result)
								{
									proceedingCode = result["proceedingCode"];
									const promise = getProceedingInfo(proceedingCode);
									promises.push(promise);
								});

								Promise.all(promises).then(proceeding =>
								{
									proceedingsByStudents.push(proceeding);
									treatedResults.push(proceedingsByStudents);
									resolve(treatedResults);
								});
							});
					});
				});
			});
		}
		catch(e)
		{
			throw e;
		}
	}
	
	/*
		Function to capitalize the first letter of each string
		params: string to treat, maybe an author full name, etc
		return: string with firts letters of each word capitalized
	*/
	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt){
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	/* Function to get info of a proceeding by it's code
	   params: code of proceeding to be searched
	   return: array containing proceeding code, it's name and authors
	*/
	function getProceedingInfo(proceedingCode)
	{
		const getProceedingInfo = "SELECT S.nomeServidor AS proceedingAuthor, P.nomePublicacao AS proceedingName, URN_ArtigoCompleto AS proceedingPath FROM servidor S JOIN servidor_publica SP ON S.siapeServidor = SP.siapeServidor JOIN publicacao P ON P.codPublicacao = SP.codPublicacao WHERE P.codPublicacao = " + proceedingCode + "";
		const getProceedingStudents = "SELECT nomeAluno AS proceedingStudent FROM aluno_publica AP JOIN aluno A ON AP.matriculaAluno = A.matriculaAluno JOIN publicacao P ON P.codPublicacao = AP.codPublicacao WHERE P.codPublicacao = " + proceedingCode + "";
		const sql = getProceedingInfo +";"+ getProceedingStudents +";";
		
		return new Promise(function(resolve, reject)
		{
			con.query(sql, [1, 2], function (err, results, fields)
			{
				var proceedingInfo = [];
				proceedingInfo.push(proceedingCode);
				proceedingInfo.push(results[0][0]["proceedingName"]);
				proceedingInfo.push([]);
				
				if(results[0]["proceedingPath"] != null) proceedingInfo.push(results[0]["proceedingPath"]);
				else proceedingInfo.push('null');
				results[0].forEach(function(result)
				{
					var proceedingAuthor = toTitleCase(result["proceedingAuthor"]);
					proceedingInfo[2].push(proceedingAuthor);
				});

				// Itera entre os alunos envolvidos
				proceedingInfo.push([]);
				results[1].forEach(function(student)
				{
					proceedingInfo[4].push(student["proceedingStudent"]);
				});
				resolve(proceedingInfo);
			});
		});
	}
});

router.get('/publicacoes/:nomePub', function (req, res) {
	req.params.nomePub = '/../public/publicacoes-discentes/2014/Conferencias/Nacional/Resumo/01_CNMAC2014_Welton.pdf';

	res.sendFile(path.resolve(__dirname + req.params.nomePub), function(err, html) {
		if(err) {
			throw err;
		} else {
			if(!res.status(200))
			{
				res.send(html);
			}
		}
	});
});

router.get('/pub-discentes/compilados/2014-2016.pdf', function(req, res, next) {
	res.sendFile(path.resolve(__dirname + '/../public/publicacoes-discentes/compilados/2014-2016.pdf'), function(err, html) {
		if(err) {
			throw err;
		} else {
			if(!res.status(200))
			{
				res.send(html);
			}
		}
	});
});

router.get('/stackedBar', function(req, res, next) {
	var sql;
	var years;

	try {
		if(con.state === 'disconnected'){
			con.connect(function(err) {
				if (err) throw err;
			});
		}
		
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
				lookForProjectsPerYear(years[i].anoEdital, numberOfYears, typesOfAssistance).then(function(typesDown) {
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
	}
	catch(e) {
		throw e;
	}

	function lookForProjectsPerYear(actualYear, countYears, typesOfAssistance)
		{
			var sql = "SELECT AP.modalidadeBolsa AS tipoBolsa FROM aluno_participa_projeto AP JOIN projeto P ON P.idProjeto = AP.idProjeto WHERE P.anoEdital = ?";

			typesOfAssistance[countYears] = [0, 0, 0, 0, 0];
			
			return new Promise(function(resolve,reject)
			{
				con.query(sql, [actualYear], function (er, result, fields)
				{
					if(er) return reject(er);
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
			var pibexAssistance 	= getCol(typesOfAssistance, 3);
			var volunteerAssistance = getCol(typesOfAssistance, 4);

			var yearData = [];
			for(var i=(years.length-1); i>=0; i--)
			{
				yearData.push(years[i].anoEdital);
			}

			res.render('stackedBar.ejs', {
				years: yearData,
				pibicAssistance: pibicAssistance,
				pibicJrAssistance: pibicJrAssistance,
				pibitAssistance: pibitAssistance,
				pibexAssistance: pibexAssistance,
				volunteerAssistance: volunteerAssistance
			}, function(err, html) {
				if(err) {
					throw err;
				} else {
					res.send(html);
				}
			});
		}
});
module.exports = router;