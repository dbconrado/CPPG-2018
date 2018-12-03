'use strict';
var path = require('path');
var express = require('express');
var router = express.Router();
var tagCloud = require('tag-cloud');
var sort = require('srtr');
var vars = require('../model/variables.js');
var functions = require('../model/functions.js');
var fs = require('fs');
var ejsLint = require('ejs-lint');

router.get('/', function(req, res)
{
	res.render('pages/index-novo');
});

router.get('/indicadores', function(req, res)
{
	try
	{
		if(vars.con.state === 'disconnected'){
			vars.con.connect(function(err) {
				if (err) throw err;
			});
		}

		getAssistanceChartData();
	}
	catch(e)
	{
		throw e;
	}

	function lookForProjectsPerYear(actualYear, countYears, typesOfAssistance)
	{
		var sql = "SELECT AP.modalidadeBolsa AS tipoBolsa FROM aluno_participa_projeto AP JOIN projeto P ON P.idProjeto = AP.idProjeto WHERE P.anoEdital = ?";

		typesOfAssistance[countYears] = [0, 0, 0, 0, 0];
		
		return new Promise(function(resolve,reject)
		{
			vars.con.query(sql, [actualYear], function (er, result)
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
					else if(result[j].tipoBolsa == "PIBITI")
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

		getKeywordsCloud().then(function(cloud)
		{
			tagCloud.tagCloud(cloud, function (err, data) {
				res.render('pages/indicadores', {
					cloud: data,
					years: yearData,
					pibicAssistance: pibicAssistance,
					pibicJrAssistance: pibicJrAssistance,
					pibitAssistance: pibitAssistance,
					pibexAssistance: pibexAssistance,
					volunteerAssistance: volunteerAssistance
				});
			}, {
				classPrefix: 'btn tag tag',
				randomize: false,
				numBuckets: 5,
				htmlTag: 'a',
				additionalAttributes: {href: vars.config.url +'/keyword={{tag}}'}
			});
		}).catch((err) => setImmediate(() => { throw err; }));
	}

	function getKeywordsCloud()
	{
		try
		{
			var sql = "SELECT palavra AS keyword, COUNT(*) AS totalUsage FROM palavras_chave_publicacao GROUP BY palavra";
			return new Promise(function(resolve)
			{
				vars.con.query(sql, function (err, results)
				{
					var cloud = [];
					
					results.forEach(function(result)
					{
						cloud.push({
							tagName: result["keyword"], count: result["totalUsage"]
						});
					});
					var sorted = sort.quicksort(cloud, (a, b) => b.count - a.count);
					resolve(sorted);
				});
			});
		}
		catch(err)
		{
			throw err;
		}
	}

	function getAssistanceChartData()
	{
		// Recupera os três últimos anos nos quais hajam dados no banco
		var sql = "SELECT anoEdital FROM aluno_participa_projeto AP JOIN projeto P ON P.idProjeto = AP.idProjeto GROUP BY P.anoEdital ORDER BY P.anoEdital DESC";

		vars.con.query(sql, function (er, result)
		{
			if (er) throw er;
			else
			{
				var years = result;
				var numberOfYears = 0;
				var conta = [];
				var typesOfAssistance = [];

				for(var i=(years.length-1); i>=0; i--)
				{
					lookForProjectsPerYear(years[i].anoEdital, numberOfYears, typesOfAssistance).then(function()
					{
						conta.push(1);

						// Se já rodei todas as promises, mando pra view
						if(conta.length == years.length)
						{
							sendToView(years,typesOfAssistance);
						}
					}).catch((err) => setImmediate(() => { throw err; }));
					numberOfYears++;
				}
			}
		});
	}
});

router.all('/gerarCertificado', function(req, res)
{
	if(req.body["teacherInfo"])
	{
		try
		{
			var trim = req.body["teacherInfo"].indexOf("SIAPE");
			var postMessage = req.body["teacherInfo"];
			var teacherName = postMessage.substring(trim+7, postMessage.length-1);
			teacherName = postMessage.substring(0, trim-2);

			functions.getYearsAvailableByTeacher(teacherName).then(function(yearsData)
			{
				var yearsAvailable = [];
				yearsData.forEach(function(year)
				{
					if(!year.initialData) return;
					else
					{
						if(!yearsAvailable.includes(year.initialData)) yearsAvailable.push(year.initialData);
					}
				});
				
				res.send(yearsAvailable);
			}).catch((err) => setImmediate(() => { throw err; }));
		}
		catch(e)
		{
			throw e;
		}
	}
	else
	{
		var teachers = [];
		functions.getTeachersOnDatabase().then(function(results)
		{
			results.forEach(function(result)
			{
				teachers.push([result.teacherName] + " (SIAPE: " + [result.teacherCod] + ")");
			});
			
			var noResearchs = false;
			if(req.body["noResearchs"]) noResearchs = true;
			res.render('pages/geraCertificado', { teachers: teachers, noResearchs: noResearchs });
		}).catch((err) => setImmediate(() => { throw err; }));
	}
});

router.post('/pdf', function(req, res)
{
	try
	{
		var PDF = require('pdfkit');
		
		var doc = new PDF({
			layout: 'landscape',
			margin: -6,
			size: [786,1108]
		});

		var writer = fs.createWriteStream(path.resolve(__dirname + '/../public/certificados/document.pdf'));
		doc.pipe(writer);

		var postMessage = req.body;
		var certificatedPersonInfo = req.body["teacherInfo"];
		var trim = certificatedPersonInfo.indexOf("SIAPE");
		var certificatedPersonCod = certificatedPersonInfo.substring(trim+7, certificatedPersonInfo.length-1);
		var yearsRange = postMessage.researchYearsRange;
		
		functions.getResearchWorksByYearRangeAndTeacher(yearsRange, certificatedPersonCod).then(function(results)
		{
			if(results.length == 0 || results == undefined)
			{
				return res.redirect(307, '/CPPG/gerarCertificado');
			}
			else
			{
				results.forEach(function(research, index)
				{
					var certificateWorkCod = research["researchCod"];
					
					functions.generateCertificate(certificatedPersonCod, certificateWorkCod).then(function(generatedCertificateHash)
					{
						doc.image('public/certificados/modelos/modelo1.jpg',
						{
							fit: [doc.page.width, doc.page.height],
							align: 'center',
							valign: 'center'
						});

						doc.fontSize(20);

						var certificatedPersonName = certificatedPersonInfo.substring(0, trim-2);
						var certificatedPersonFunction = research["function"];
						var certificatedWork = research["researchName"];
						var certificateInitialData = research["initialData"];
						var certificateFinalData  = research["finalData"];
						var certificateEdictNumber  = research["edictNumber"];
						var certificateEdictYear  = research["edictYear"];
						var date = certificateInitialData.split("-");
						
						certificateInitialData = new Date();
						certificateInitialData.setDate(date[0]);
						certificateInitialData.setMonth(date[1]);
						certificateInitialData.setFullYear(date[2]);

						var date = certificateFinalData.split("-");
						certificateFinalData = new Date();
						certificateFinalData.setDate(date[0]);
						certificateFinalData.setMonth(date[1]);
						certificateFinalData.setFullYear(date[2]);
						
						var certificateMessage = "Declaro para os devidos fins que o/a discente " + certificatedPersonName + " de matrícula SIAPE " + certificatedPersonCod + " atuou como " + certificatedPersonFunction.toLowerCase() + " no projeto de pesquisa '" + certificatedWork + "	' aprovado no Edital " + certificateEdictNumber + "/" + certificateEdictYear + " do Instituto Federal de Minas Gerais campus Sabará, com período de vigência de " +  vars.monthNames[certificateInitialData.getMonth()-1] + " de " + certificateInitialData.getFullYear() + " à " + vars.monthNames[certificateFinalData.getMonth()-1] + " de " + certificateFinalData.getFullYear() + ".";
						// functions.getCertificateHash(certificatedPersonCod, certificateWorkCod);

						doc.text(certificateMessage,280,350,
						{
							align: 'justify',
							width: doc.page.width/2
						});

						var currentDate = new Date();
						var certificateDate = "Gerado em: " + currentDate.getDate() + "/" + parseInt(currentDate.getMonth()+1) + "/" + currentDate.getFullYear() + " às " + currentDate.getHours() + "h" + (currentDate.getMinutes()<10?'0':'') + currentDate.getMinutes();
						var hashGenerated = "Código de Validação: " + generatedCertificateHash;

						doc.fontSize(15);
						doc.text(certificateDate, 550,690,
						{
							align: 'justify'
						});
						
						doc.text(hashGenerated, 785, 690,
						{
							align: 'justify'
						});

						if(index != results.length-1) doc.addPage();
						else
						{
							doc.end();
							writer.on('finish', function()
							{
								res.sendFile(path.resolve(__dirname + '/../public/certificados/document.pdf'));
							});
						}
					}).catch((err) => setImmediate(() => { throw err; }));
				});
			}
		}).catch((err) => setImmediate(() => { throw err; }));
	}
	catch(e)
	{
		throw e;
	}
});

router.get('/validarCertificado', function(req, res)
{
	res.render('pages/validarCertificado');
});

router.post('/validateCertificate', function(req, res)
{
	var certificateHash = req.body.certificateHash;
	
	try
	{
		functions.validateCertificateByHash(certificateHash).then(function(isValid)
		{
			if(isValid) res.send(true);
			else res.send(false);
		}).catch((err) => setImmediate(() => { throw err; }));
	}
	catch(err)
	{
		throw err;
	}
	
});

router.get('/projetos', function(req, res)
{
	functions.getResearchWorksCodes().then(function(researchWorksCodes)
	{
		var promises = [];
		researchWorksCodes.forEach(function(code)
		{
			const promise = functions.getResearchWorkInfoByItsCode(code.researchCode);
			promises.push(promise);
		});

		Promise.all(promises).then(researchWorks =>
		{
			res.render('pages/researchWorks', { researchWorks: researchWorks});
		});
	}).catch((err) => setImmediate(() => { throw err; }));
});

router.get('/teacher=:teacherName', function(req, res)
{
	var teacherName = req.params.teacherName;

	try
	{
		treatKeywordsForTeacher(teacherName).then(function(cloud)
		{
			tagCloud.tagCloud(cloud, function (err, data) 
			{
				if(err) throw err;
				res.render('pages/teacherPage', { cloud: data } );
			}, {
				classPrefix: 'btn tag tag',
				randomize: false,
				numBuckets: 5,
				htmlTag: 'a',
				additionalAttributes: {href: vars.config.url +'/keyword={{tag}}', title: ''}
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
			return new Promise(function(resolve)
			{
				vars.con.query(sql, function (err, results)
				{
					if(err)
					{
						return Promise.reject(err);
					}
					
					var cloud = [];
					results.forEach(function(result)
					{
						cloud.push({
							tagName: result["keyword"], count: result["totalUsage"]
						});
					});
					var sorted = sort.quicksort(cloud, (a, b) => b.count - a.count);
					resolve(sorted);
				});
			});
		}
		catch(err)
		{
			throw err;
		}
	}
});

router.get('/keyword=:word', function(req, res)
{
	var keyword = req.params.word;
	functions.getProceedingCodeByKeyword(keyword).then(function(proceedingsCodes)
	{
		var promises = [];
		proceedingsCodes.forEach(function(proceedingCode)
		{
			const promise = functions.getProceedingInfo(proceedingCode);
			promises.push(promise);
		});

		Promise.all(promises).then(proceedings =>
		{
			res.render('keywordPage', { proceedingsByKeyword: proceedings, word: keyword } );
		});
	}).catch((err) => setImmediate(() => { throw err; }));;
});

router.post('/antigo-search', function(req, res)
{
	var searchValue = req.body.searchValue;
	try
	{
		if(vars.con.state === 'disconnected')
		{
			vars.con.connect(function(err) {
				if (err) throw err;
			});
		}
		
		searchValue = '%' + searchValue + '%'; // Apenas escapa as aspas simples

		functions.getProceedingsByItsNameTeacherOrStudents(searchValue).then(function(result)
		{
			functions.getTeacherInfoByItsName(searchValue).then(function(cloud)
			{
				tagCloud.tagCloud(cloud, function (data)
				{
					res.render('searchProceedings', { resultsByName: result[0][0], resultsByAuthor: result[1][0], resultsByStudentsInvolved: result[2][0], cloud: data } );
				},
				{
					classPrefix: 'btn tag tag',
					randomize: true,
					numBuckets: 5,
					htmlTag: 'a',
					additionalAttributes: {href: vars.config.url +'/teacher={{tag}}'}
				});
			}).catch((err) => setImmediate(() => { throw err; }));
		}).catch((err) => setImmediate(() => { throw err; }));
	}
	catch(err)
	{
		throw err;
	}
});

router.get('/galeria', function(req,res)
{
	res.render("pages/galeria");
});

router.post('/search', function(req, res)
{
	var searchValue = req.body.searchValue;
	try
	{
		if(vars.con.state === 'disconnected')
		{
			vars.con.connect(function(err)
			{
				if (err) throw err;CPPG
			});
		}
		
		searchValue = '%' + searchValue + '%'; // Apenas escapa as aspas simples

		if(req.body.chkProceedings && req.body.chkResearchs)
		{
			functions.getProceedingsByItsNameTeacherOrStudents(searchValue).then(function(proceedings)
			{
				functions.getResearchsByItsNameTeacherOrStudents(searchValue).then(function(researchWorks)
				{
					functions.getTeacherInfoByItsName(searchValue).then(function(cloud)
					{
						tagCloud.tagCloud(cloud, function (err , data)
						{
							res.render('pages/searchProceedings', { chkBoxProceedings: true, chkBoxResearchWorks: true, proceedingsByName: proceedings[0][0], proceedingsByAuthor: proceedings[1][0], proceedingsByStudents: proceedings[2][0], researchWorksByName: researchWorks[0][0], researchWorksByAuthor: researchWorks[1][0], researchWorksByStudents: researchWorks[2][0], cloud: data});
						},
						{
							classPrefix: 'btn tag tag',
							randomize: true,
							numBuckets: 5,
							htmlTag: 'a',
							additionalAttributes: {href: vars.config.url +'/teacher={{tag}}'}
						});
					}).catch((err) => setImmediate(() => { throw err; }));
				}).catch((err) => setImmediate(() => { throw err; }));
			}).catch((err) => setImmediate(() => { throw err; }));
		}
		else
		{
			if(req.body.chkProceedings)
			{
				functions.getProceedingsByItsNameTeacherOrStudents(searchValue).then(function(proceedings)
				{
					functions.getTeacherInfoByItsName(searchValue).then(function(cloud)
					{
						tagCloud.tagCloud(cloud, function (err , data)
						{
							if(err) throw err;
							res.render('pages/searchProceedings', { chkBoxProceedings: true, chkBoxResearchWorks: false, proceedingsByName: proceedings[0][0], proceedingsByAuthor: proceedings[1][0], proceedingsByStudents: proceedings[2][0], cloud: data});
						},
						{
							classPrefix: 'btn tag tag',
							randomize: true,
							numBuckets: 5,
							htmlTag: 'a',
							additionalAttributes: {href: vars.config.url +'/teacher={{tag}}'}
						});
					}).catch((err) => setImmediate(() => { throw err; }));
				}).catch((err) => setImmediate(() => { throw err; }));
			}
			if(req.body.chkResearchs)
			{
				functions.getResearchsByItsNameTeacherOrStudents(searchValue).then(function(researchWorks)
				{
					functions.getTeacherInfoByItsName(searchValue).then(function(cloud)
					{
						tagCloud.tagCloud(cloud, function (err , data)
						{
							console.log(researchWorks[0][0]);
							if(err) throw err;
							res.render('pages/searchProceedings', { chkBoxProceedings: false, chkBoxResearchWorks: true, researchWorksByName: researchWorks[0][0], researchWorksByAuthor: researchWorks[1][0], researchWorksByStudents: researchWorks[2][0], cloud: data});
						},
						{
							classPrefix: 'btn tag tag',
							randomize: true,
							numBuckets: 5,
							htmlTag: 'a',
							additionalAttributes: {href: vars.config.url +'/teacher={{tag}}'}
						});
					}).catch((err) => setImmediate(() => { throw err; }));
				}).catch((err) => setImmediate(() => { throw err; }));
			}
		}
	}
	catch(err)
	{
		throw err;
	}
});

router.get('/grupos-de-pesquisa', function(req, res)
{
	// res.render('/')
});

router.get('/pub-discentes/compilados/2014-2016.pdf', function(res) {
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
module.exports = router;