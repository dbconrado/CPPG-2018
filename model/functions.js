var vars = require('./variables.js');

var functions = {
	getResearchsByItsNameTeacherOrStudents: function (toSearchValue) {
		var treatedResults = [];
		var queryGetResearchsByTitle = "SELECT idProjeto AS researchCode FROM projeto WHERE nomeProjeto LIKE '" + toSearchValue + "'";
		var queryGetResearchsByTeachers = "SELECT P.idProjeto AS researchCode, nomeProjeto AS researchName, nomeServidor AS researchAuthor FROM projeto P JOIN servidor_participa_projeto SP ON SP.idProjeto = P.idProjeto JOIN servidor S ON S.siapeServidor = SP.siapeServidor WHERE S.nomeServidor LIKE '" + toSearchValue + "'";
		var queryGetResearchsByStudents = "SELECT P.idProjeto AS researchCode FROM projeto P JOIN aluno_participa_projeto AP ON AP.idProjeto = P.idProjeto JOIN aluno A ON A.matriculaAluno = AP.matriculaAluno WHERE A.nomeAluno LIKE '" + toSearchValue + "'";
		var sql = queryGetResearchsByTitle + ";" + queryGetResearchsByTeachers + ";" + queryGetResearchsByStudents + ";";

		try {
			return new Promise(function (resolve) {
				vars.con.query(sql, [1, 2, 3], function (err, results) {
					if (err) {
						return Promise.reject(err);
					}

					//Trata cada resultado obtido
					//Trata a busca por nome de publicação
					var ResearchsByName = [];
					var promises = [];
					results[0].forEach(function (result) {
						var researchCode = result["researchCode"];
						const promise = functions.getResearchWorkInfoByItsCode(researchCode);
						promises.push(promise);
					});

					//Trata cada resultado obtido
					//Trata a busca por nome de autor
					Promise.all(promises).then(Researchs => {
						ResearchsByName.push(Researchs);
						treatedResults.push(ResearchsByName);

						var ResearchsByAuthor = [];
						promises = [];
						results[1].forEach(function (result) {
							var researchCode = result["researchCode"];
							const promise = functions.getResearchWorkInfoByItsCode(researchCode);
							promises.push(promise);
						});
						//Trata cada resultado obtido
						//Trata a busca por nome de aluno
						Promise.all(promises).then(research => {
							ResearchsByAuthor.push(research);
							treatedResults.push(ResearchsByAuthor);

							var ResearchsByStudents = [];
							promises = [];
							results[2].forEach(function (result) {
								var researchCode = result["researchCode"];
								const promise = functions.getResearchWorkInfoByItsCode(researchCode);
								promises.push(promise);
							});

							Promise.all(promises).then(research => {
								ResearchsByStudents.push(research);
								treatedResults.push(ResearchsByStudents);
								resolve(treatedResults);
							});
						});
					});
				});
			});
		}
		catch (e) {
			throw e;
		}
	},
	getProceedingsByItsNameTeacherOrStudents: function (toSearchValue) {
		var treatedResults = [];
		var queryGetProceedingsByTitle = "SELECT codPublicacao AS proceedingCode FROM publicacao WHERE nomePublicacao LIKE '" + toSearchValue + "'";
		var queryGetProceedingsByTeachers = "SELECT P.codPublicacao AS proceedingCode, nomePublicacao AS proceedingName, URN_ArtigoCompleto AS proceedingPath, nomeServidor AS proceedingAuthor FROM publicacao P JOIN servidor_publica SP ON SP.codPublicacao = P.codPublicacao  JOIN servidor S ON S.siapeServidor = SP.siapeServidor WHERE S.nomeServidor LIKE '" + toSearchValue + "'";
		var queryGetProceedingsByStudents = "SELECT P.codPublicacao AS proceedingCode FROM publicacao P JOIN aluno_publica AP ON AP.codPublicacao = P.codPublicacao JOIN aluno A ON A.matriculaAluno = AP.matriculaAluno WHERE A.nomeAluno LIKE '" + toSearchValue + "'";
		var sql = queryGetProceedingsByTitle + ";" + queryGetProceedingsByTeachers + ";" + queryGetProceedingsByStudents;

		try {
			return new Promise(function (resolve) {
				vars.con.query(sql, [1, 2, 3], function (err, results) {
					if (err) {
						return Promise.reject(err);
					}

					//Trata cada resultado obtido
					//Trata a busca por nome de publicação
					var proceedingsByName = [];
					var promises = [];
					results[0].forEach(function (result) {
						var proceedingCode = result["proceedingCode"];
						const promise = functions.getProceedingInfo(proceedingCode);
						promises.push(promise);
					});

					//Trata cada resultado obtido
					//Trata a busca por nome de autor
					Promise.all(promises).then(proceedings => {
						proceedingsByName.push(proceedings);
						treatedResults.push(proceedingsByName);

						var proceedingsByAuthor = [];
						promises = [];
						results[1].forEach(function (result) {
							var proceedingCode = result["proceedingCode"];
							const promise = functions.getProceedingInfo(proceedingCode);
							promises.push(promise);
						});
						//Trata cada resultado obtido
						//Trata a busca por nome de aluno
						Promise.all(promises).then(proceeding => {
							proceedingsByAuthor.push(proceeding);
							treatedResults.push(proceedingsByAuthor);

							var proceedingsByStudents = [];
							promises = [];
							results[2].forEach(function (result) {
								var proceedingCode = result["proceedingCode"];
								const promise = functions.getProceedingInfo(proceedingCode);
								promises.push(promise);
							});

							Promise.all(promises).then(proceeding => {
								proceedingsByStudents.push(proceeding);
								treatedResults.push(proceedingsByStudents);
								resolve(treatedResults);
							});
						});
					});
				});
			});
		}
		catch (e) {
			throw e;
		}
	},
	getGroupsByItsNameTeacherOrStudents: function (toSearchValue) {
		var treatedResults = [];
		var queryGetGroupsByTitle = "SELECT id AS groupCode FROM grupo_pesquisa WHERE nome LIKE '" + toSearchValue + "'";
		var queryGetGroupsByTeachers = "SELECT G.id AS groupCode, nome AS groupName, nomeServidor AS groupAuthor FROM grupo_pesquisa G JOIN servidor_participa_grupo SG ON SG.idGrupo = G.id JOIN servidor S ON S.siapeServidor = SG.siapeServidor WHERE S.nomeServidor LIKE '" + toSearchValue + "'";
		var queryGetGroupsByStudents = "SELECT G.id AS groupCode FROM grupo_pesquisa G JOIN aluno_participa_grupo AG ON AG.idGrupo = G.id JOIN aluno A ON A.matriculaAluno = AG.matriculaAluno WHERE A.nomeAluno LIKE '" + toSearchValue + "'";
		var sql = queryGetGroupsByTitle + ";" + queryGetGroupsByTeachers + ";" + queryGetGroupsByStudents + ";";

		try {
			return new Promise(function (resolve) {
				vars.con.query(sql, [1, 2, 3], function (err, results) {
					if (err) {
						return Promise.reject(err);
					}

					//Trata cada resultado obtido
					//Trata a busca por nome do grupo
					var GroupsByName = [];
					var promises = [];
					results[0].forEach(function (result) {
						var groupCode = result["groupCode"];
						const promise = functions.getResearchGroupInfoByItsCode(groupCode);
						promises.push(promise);
					});

					//Trata cada resultado obtido
					//Trata a busca por nome de autor
					Promise.all(promises).then(Groups => {
						GroupsByName.push(Groups);
						treatedResults.push(GroupsByName);

						var GroupsByAuthor = [];
						promises = [];
						results[1].forEach(function (result) {
							var groupCode = result["groupCode"];
							const promise = functions.getResearchGroupInfoByItsCode(groupCode);
							promises.push(promise);
						});
						//Trata cada resultado obtido
						//Trata a busca por nome de aluno
						Promise.all(promises).then(research => {
							GroupsByAuthor.push(research);
							treatedResults.push(GroupsByAuthor);

							var GroupsByStudents = [];
							promises = [];
							results[2].forEach(function (result) {
								var groupCode = result["groupCode"];
								const promise = functions.getResearchGroupInfoByItsCode(groupCode);
								promises.push(promise);
							});

							Promise.all(promises).then(research => {
								GroupsByStudents.push(research);
								treatedResults.push(GroupsByStudents);
								resolve(treatedResults);
							});
						});
					});
				});
			});
		}
		catch (e) {
			throw e;
		}
	},
	getResearchWorksByYearRangeAndTeacher: function (yearRange, teacherCod) {
		try {
			var years = "";
			var sql;

			if (typeof yearRange == 'string') {
				years = yearRange;
			}
			else {
				yearRange.forEach(function (year) {
					if (year != 'Nenhuma das opções') years += year + ",";
				});

				years = years.substring(0, years.length - 1);
			}

			sql = "SELECT DATE_FORMAT(dataInicio, '%Y') AS date, SP.Função AS function, nomeProjeto AS researchName, P.idProjeto AS researchCod, DATE_FORMAT(dataInicio, '%d-%m-%Y') AS initialData, DATE_FORMAT(dataTermino, '%d-%m-%Y') AS finalData, P.anoEdital AS edictYear, P.numEdital AS edictNumber FROM projeto P JOIN servidor_participa_projeto SP ON P.idProjeto = SP.idProjeto JOIN servidor S ON S.siapeServidor = SP.siapeServidor WHERE S.siapeServidor = " + teacherCod + " AND DATE_FORMAT(P.dataInicio, '%Y') IN (" + years + ") ORDER BY date ASC";

			return new Promise(function (resolve, reject) {
				vars.con.query(sql, function (err, results, fields) {
					if (err) reject(results);
					resolve(results);
				});
			});
		}
		catch (e) {
			throw e;
		}
	},

	/*
		This function runs queries in database in order to verify if already exists a certificate previously generated
		params: int with teacher unique code, string with unique research work code
		return: certificate hash if it exists and false if don't
	*/
	certificateExists: function (certificatedPersonCod, certificateWorkCod) {
		var sql = "SELECT hashCertificado AS certificateHash FROM certificados WHERE siapeServidor = " + certificatedPersonCod + " AND idProjeto = '" + certificateWorkCod + "'";

		return new Promise(function (resolve, reject) {

			vars.con.query(sql, function (err, results) {
				if (err) reject(err);
				else {
					if (results[0]) resolve(results[0].certificateHash);
					else {
						resolve(false);
					}
				}
			});
		});
	},

	/*
		Function to generate teacher certificate
		params: int with teacher unique code, string with unique research work code
		return: generated certificate hash
	*/
	generateCertificate: function (certificatedPersonCod, certificateWorkCod) {
		return new Promise(function (resolve, reject) {
			functions.certificateExists(certificatedPersonCod, certificateWorkCod).then(function (certificateHash) {
				if (!certificateHash) {
					var sql = "INSERT INTO certificados (siapeServidor, idProjeto) VALUES (" + certificatedPersonCod + "," + "'" + certificateWorkCod + "')";

					vars.con.query(sql, function (err, results) {
						if (err && err.message.substring(0, err.message.indexOf(' ')) != 'ER_BAD_NULL_ERROR:') reject(err);
						else {
							sql = "SELECT hashCertificado AS certificateHash FROM certificados WHERE idCertificado = " + results.insertId;

							vars.con.query(sql, function (err, results) {
								if (err) reject(err);
								else resolve(results[0].certificateHash);
							});
						}
					});
				}
				else {
					resolve(certificateHash);
				}
			}).catch((err) => setImmediate(() => { throw err; }));
		});
	},

	/*
		This function validates a certificate by a hash
		params: string containing hash to be verified
		return: true if it is valid, and false instead
	*/
	validateCertificateByHash: function (certificateHash) {
		var sql = "SELECT hashCertificado AS isValid FROM certificados WHERE EXISTS(SELECT hashCertificado FROM certificados WHERE hashCertificado = '" + certificateHash + "') AND hashCertificado = '" + certificateHash + "'";

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, function (err, result) {
				if (err) reject(err);
				if (result[0] != undefined) resolve(true);
				else resolve(false);
			});
		});
	},

	/*
		This function verify the years range that a teacher had been active with research works, by teacher name
		params: string containing teacher name
		return: inte array containing the start years of research works relative to given teacher, undefined if
		teacher have zero research works
	*/
	getYearsAvailableByTeacher: function (teacherName) {
		var sql1 = "SELECT siapeServidor FROM servidor WHERE nomeServidor = '" + teacherName + "';";
		var sql2 = "SELECT DATE_FORMAT(P.dataInicio, '%Y') AS initialData FROM servidor_participa_projeto SP JOIN servidor S ON SP.siapeServidor = S.siapeServidor JOIN projeto P ON P.idProjeto = SP.idProjeto WHERE S.siapeServidor = ? ORDER BY initialData DESC";
		return new Promise(function (resolve, reject) {
			vars.con.query(sql1, function (err, result, fields) {
				var siapeServidor = result[0]["siapeServidor"];
				vars.con.query(sql2, siapeServidor, function (err, results, fields) {
					resolve(results);
				});
			});
		});
	},
    /*
		Function to capitalize the first letter of each string
		params: string to treat, maybe an author full name, etc
		return: string with firts letters of each word capitalized
	*/
	capitalizeString: function (str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	},
	/* Function to get all research works codes
	   params: none
	   return: array containing all research works codes
	*/
	getResearchWorksCodes: function () {
		const sql = "SELECT idProjeto AS researchCode FROM projeto ORDER BY nomeProjeto ASC";

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, function (err, results) {
				if (err) reject(err);
				resolve(results);
			});
		});
	},
	/* Function to get info of a research work by it's code
	   params: code of research work to be searched
	   return: array containing research code, it's name,
	   authors and students involveds
	*/
	getResearchWorkInfoByItsCode: function (researchCode) {
		const getresearchInfo = "SELECT S.nomeServidor AS researchAuthor, P.nomeProjeto AS researchName, P.dataInicio AS initialDate, P.dataTermino AS finalData FROM servidor S JOIN servidor_participa_projeto SP ON S.siapeServidor = SP.siapeServidor JOIN projeto P ON P.idProjeto = SP.idProjeto WHERE P.idProjeto = '" + researchCode + "'";
		const getresearchStudents = "SELECT nomeAluno AS researchStudent, modalidadeBolsa AS scholarship, agenteFinanciadorBolsa AS financier FROM aluno_participa_projeto AP JOIN aluno A ON AP.matriculaAluno = A.matriculaAluno JOIN projeto P ON P.idProjeto = AP.idProjeto WHERE P.idProjeto = '" + researchCode + "'";
		const sql = getresearchInfo + ";" + getresearchStudents + ";";

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, [1, 2], function (err, results, fields) {
				if (err) reject(err);
				var researchInfo = [];
				researchInfo.push(researchCode);

				if (results[0][0] != undefined) {
					researchInfo.push(results[0][0]["researchName"]);
					researchInfo.push(results[0][0]["initialDate"]);
				}
				researchInfo.push([]);
				results[0].forEach(function (result) {
					var researchAuthor = functions.capitalizeString(result["researchAuthor"]);
					researchInfo[3].push(researchAuthor);
				});

				// Itera entre os alunos envolvidos
				researchInfo.push([]);
				results[1].forEach(function (student) {
					if (researchInfo[4] != undefined) {
						researchInfo[4].push(student["researchStudent"]);
					}
				});
				if (results[1][0] != undefined) {
					researchInfo.push(results[1][0]["scholarship"]);
					researchInfo.push(results[1][0]["financier"]);
				}
				resolve(researchInfo);
			});
		});
	},
    /* Function to get info of a proceeding by it's code
	   params: code of proceeding to be searched
	   return: array containing proceeding code, it's name and authors
	*/
	getProceedingInfo: function (proceedingCode) {
		const getProceedingInfo = "SELECT S.nomeServidor AS proceedingAuthor, P.nomePublicacao AS proceedingName, P.URN_ArtigoCompleto AS proceedingPath, SP.ano AS year, SP.local AS local, SP.país AS pais FROM servidor S JOIN servidor_publica SP ON S.siapeServidor = SP.siapeServidor JOIN publicacao P ON P.codPublicacao = SP.codPublicacao WHERE P.codPublicacao = " + proceedingCode + "";
		const getProceedingStudents = "SELECT nomeAluno AS proceedingStudent, AP.ano AS year, AP.local AS local, AP.país as pais  FROM aluno_publica AP JOIN aluno A ON AP.matriculaAluno = A.matriculaAluno JOIN publicacao P ON P.codPublicacao = AP.codPublicacao WHERE P.codPublicacao = " + proceedingCode + "";
		const sql = getProceedingInfo + ";" + getProceedingStudents + ";";

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, [1, 2], function (err, results, fields) {
				var proceedingInfo = [];
				proceedingInfo.push(proceedingCode);
				console.log(results)
				proceedingInfo.push(results[0][0]["proceedingName"]);
				proceedingInfo.push([]);

				if (results[0][0]["proceedingPath"] != null) proceedingInfo.push(results[0][0]["proceedingPath"]);
				else proceedingInfo.push('null');
				proceedingInfo.push(results[0][0]["year"]);
				proceedingInfo.push(results[0][0]["local"]);
				proceedingInfo.push(results[0][0]["pais"]);
				results[0].forEach(function (result) {
					var proceedingAuthor = functions.capitalizeString(result["proceedingAuthor"]);
					proceedingInfo[2].push(proceedingAuthor);
				});

				// Itera entre os alunos envolvidos
				proceedingInfo.push([]);
				results[1].forEach(function (student) {
					proceedingInfo[7].push(student["proceedingStudent"]);
				});
				resolve(proceedingInfo);
			});
		});
	},
    /* This function gets proceeding code, by one of it's keywords known
        params: Proceeding keyword (string)
        return: Proceeding code (int) 
    */
	getProceedingCodeByKeyword: function (keywordToBeSearched) {
		const sql = "SELECT P.codPublicacao AS code FROM palavras_chave_publicacao PCP JOIN publicacao P ON P.codPublicacao = PCP.fk_codPublicacao WHERE PCP.palavra = '" + keywordToBeSearched + "'";

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, function (err, results, fields) {
				if (err) return reject(err);
				else {
					var proceedingsCodes = [];
					results.forEach(function (proceedingCode) {
						proceedingsCodes.push(proceedingCode["code"]);
					});
					resolve(proceedingsCodes);
				}
			});
		});
	},
	getTeacherInfoByItsName: function (teacherName) {
		try {
			var sql = "SELECT nomeServidor AS teacherName FROM servidor WHERE nomeServidor LIKE '" + teacherName + "' AND tipo = 'DOCENTE'";
			return new Promise(function (resolve) {
				vars.con.query(sql, function (err, results) {
					if (err) throw err;
					var cloud = [];

					if (results) {
						results.forEach(function (result) {
							cloud.push({
								tagName: result["teacherName"], count: 1
							});
						});
					}
					resolve(cloud);
				});
			});
		}
		catch (err) {
			throw err;
		}
	},
	getTeachersOnDatabase: function () {
		const sql = "SELECT nomeServidor AS teacherName, siapeServidor AS teacherCod FROM servidor WHERE cargo LIKE '%Professor%' ORDER BY nomeServidor ASC";

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, function (err, results, fields) {
				if (err) return reject(err);
				else {
					resolve(results);
				}
			});
		});
	},
	getInternalResearchWorksInfo: function () {
		const sql = "SELECT nomeProjeto AS projectName FROM projeto";

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, function (err, results, fields) {
				if (err) return reject(err);
				else {
					resolve(results);
				}
			});
		});
	},
	getGalleryImagesNames: function () {
		images = [];
		return new Promise(function (resolve) {
			vars.fs.readdir('./public/assets/gallery/album/', (err, files) => {
				if (err) reject(err);

				files.forEach(file => {
					images.push(file);
				});

				resolve(images);
			})
		});
	},
	getCispNextPresentations: function () {
		const sql = "SELECT * FROM apresentacao_cisp order by data asc";
		return new Promise(function (resolve, reject) {
			vars.con.query(sql, function (err, results) {
				if (err) reject(err);
				resolve(results);
			});
		});
	},
	getCispPrestationCode: function (codePresentation) {
		const sql = "SELECT * FROM apresentacao_cisp WHERE id = " + codePresentation + ";";
		result = [];

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, function (err, results) {
				if (err) reject(err);
				/*return new Promise(function (resolve) {
					vars.fs.readdir(results['galeria_imagens'], (err, files) => {
						if (err) reject(err);
		
						files.forEach(file => {
							images.push(file);
						});
						console.log(images)
					})
				});*/
				resolve(results);
			});
		});
	},

	getResearchGroupsCode: function () {
		const sql = "SELECT id AS researchGroupCode FROM grupo_pesquisa ORDER BY nome ASC";

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, function (err, results) {
				if (err) reject(err);
				resolve(results);
			});
		});
	},

	getResearchGroupInfoByItsCode: function (researchGroupCode) {
		const getGroupInfo = "SELECT S.nomeServidor AS researchAuthor, G.nome AS researchName, G.area as area, G.data_inicio AS initialDate FROM servidor S JOIN servidor_participa_grupo SG ON S.siapeServidor = SG.siapeServidor JOIN grupo_pesquisa G ON G.id = SG.idGrupo WHERE G.id = '" + researchGroupCode + "' ";
		const getresearchStudents = "SELECT nomeAluno AS researchStudent FROM aluno_participa_grupo AG JOIN aluno A ON AG.matriculaAluno = A.matriculaAluno JOIN grupo_pesquisa G ON G.id = AG.idGrupo WHERE G.id = '" + researchGroupCode + "'";
		const sql = getGroupInfo + ";" + getresearchStudents + ";";

		return new Promise(function (resolve, reject) {
			vars.con.query(sql, [1, 2], function (err, results, fields) {
				if (err) reject(err);
				var groupInfo = [];
				groupInfo.push(researchGroupCode);

				if (results[0][0] != undefined) {
					groupInfo.push(results[0][0]["researchName"]);
					groupInfo.push(results[0][0]["area"]);
					groupInfo.push(results[0][0]["initialDate"]);
				}
				groupInfo.push([]);
				results[0].forEach(function (result) {
					var researchAuthor = functions.capitalizeString(result["researchAuthor"]);
					groupInfo[4].push(researchAuthor);
				});

				// Itera entre os alunos envolvidos
				groupInfo.push([]);
				results[1].forEach(function (student) {
					if (student["researchStudent"] != [] && student["researchStudent"] != undefined) {
						groupInfo[5].push(student["researchStudent"]);
					}
				});
				console.log(groupInfo[5].length)
				resolve(groupInfo);
			});
		});
	}
};
module.exports = functions;