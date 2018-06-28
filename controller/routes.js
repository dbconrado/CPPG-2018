// FAZER NUVEM DE TAGS SEPARANDO EM TRES SETORES (TITULO, AUTOR E ALUNO) NA MESMA TELA DOS RESULTADOS
// DA PESQUISA
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
	var tags = [
		{tagName: 'js', count: 2},
		{tagName: 'css', count: 4},
		{tagName: 'less', count: 6},
		{tagName: 'rest', count: 8}
	];
	 
	/* Option 1 */
	tagCloud.tagCloud(tags, function (err, data) {
		console.log(err, data);
		res.render('cloud', { tags: data } );
	}, {
		classPrefix: 'btn tag tag',
		ramdomize: false,
		numBuckets: 5,
		htmlTag: 'span'
	});
	 
	/* Option 2 */
	tagCloud.tagCloud(tags, function (err, data) {
		console.log(err, data);
	}, {
		randomize: false
	});
	 
	var promise = require('bluebird');
	promise.promisifyAll(tagCloud);
	 
	/* Option 3 */
	tagCloud.tagCloudAsync(tags)
		.then( function (html) {
			console.log(html);
		})
		.catch( function (err) {
			console.log(err);
		});
	 
	/* Option 4 */
	tagCloud.tagCloudAsync(tags, {
		randomize: false
	})
		.then( function (html) {
			console.log(html);
		})
		.catch( function (err) {
			console.log(err);
		});
});

router.post('/search', function(req, res, next) {
	searchValue = req.body.searchValue;

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
			res.render('searchProceedings.ejs', { proceedingsByName: result[0][0], proceedingsByAuthor: result[1][0], proceedingsByStudents: result[2][0] }, function(err, html)
			{
				if(err)
				{
					throw err;
				} else {
					res.send(html);
				}
			});
		}).catch((err) => setImmediate(() => { throw err; }));
	}
	catch(err)
	{
		req.session.error = err.message;
		res.redirect('/404');
		throw err;
	}

	function runQueries(toSearchValue)
	{
		var proceedingName, proceedingPath, index;
		var treatedResults = [];
		queryGetProceedingsByTitle = "SELECT codPublicacao AS proceedingCode FROM publicacao WHERE nomePublicacao LIKE '" + toSearchValue + "'";
		queryGetProceedingsByTeachers = "SELECT P.codPublicacao AS proceedingCode, nomePublicacao AS proceedingName, URN_ArtigoCompleto AS proceedingPath, nomeServidor AS proceedingAuthor FROM publicacao P JOIN servidor_publica SP ON SP.codPublicacao = P.codPublicacao  JOIN servidor S ON S.siapeServidor = SP.siapeServidor WHERE S.nomeServidor LIKE '" + toSearchValue + "'";
		queryGetProceedingsByStudents = "SELECT P.codPublicacao AS proceedingCode FROM publicacao P JOIN aluno_publica AP ON AP.codPublicacao = P.codPublicacao JOIN aluno A ON A.matriculaAluno = AP.matriculaAluno WHERE A.nomeAluno LIKE '" + toSearchValue + "'";
		sql = queryGetProceedingsByTitle + ";" + queryGetProceedingsByTeachers + ";" + queryGetProceedingsByStudents;

		try
		{
			return new Promise(function(resolve, reject)
			{
				con.query(sql, [1, 2, 3], function (err, results, fields)
				{
					if (err)
					{
						return reject(err);
					}

					//Trata cada resultado obtido
					//Trata a busca por nome de publicação
					proceedingsByName = [];
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
							
							proceedingsByAuthor = [];
							promises = [];
							results[1].forEach(function(result)
							{
								proceedingCode = result["proceedingCode"];
								const promise = getProceedingInfo(proceedingCode);
								promises.push(promise);
							});
							//Trata cada resultado obtido
							//Trata a busca por nome de aluno
							Promise.all(promises).then(proceeding =>
							{
								proceedingsByAuthor.push(proceeding);
								treatedResults.push(proceedingsByAuthor);

								proceedingsByStudents = [];
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
				proceedingInfo = [];
				proceedingInfo.push(proceedingCode);
				proceedingInfo.push(results[0][0]["proceedingName"]);
				proceedingInfo.push([]);
				
				if(results[0]["proceedingPath"] != null) proceedingInfo.push(results[0]["proceedingPath"]);
				else proceedingInfo.push('null');
				results[0].forEach(function(result)
				{
					proceedingAuthor = toTitleCase(result["proceedingAuthor"]);
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
	
	

	/* 
		Function to search in a vector of an matrix for determinate value
		important note: this function don't search the entire matrix, but one subvector of it!
		param 1: matrix (i called it vector, because it is a vector of vectors)
		param 2: value to be searched
		param 3: op is the operator that represents the subvector for the matrix that will be target of search
		return: element-index if value is found, -1 otherwise.
	*/
	function searchInVector(vectorToSearch, value, op)
	{
		var exists = -1;
		vectorToSearch.every(function(element, i)
		{
			if(op == 0)
			{
				if(element[0] == value)
				{
					exists = element[0];
					return;
				}
			}
		});
		
		if(exists != -1)
		{
			return exists;
		}
		else
		{
			return -1;
		}
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