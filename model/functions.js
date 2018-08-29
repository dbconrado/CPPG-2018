var vars = require('./variables.js');

var functions = {
	getResearchWorksByYearRangeAndTeacher: function(yearRange, teacherCod)
	{
		try
		{
			var years = "";
			var sql;

			if(typeof yearRange == 'string')
			{
				years = yearRange;
			}
			else
			{
				yearRange.forEach(function (year)
				{
					if(year != 'Nenhuma das opções') years += year + ",";
				});

				years = years.substring(0, years.length-1);
			}

			sql = "SELECT DATE_FORMAT(dataInicio, '%Y') AS date, SP.Função AS function, nomeProjeto AS researchName, DATE_FORMAT(dataInicio, '%d-%m-%Y') AS initialData, DATE_FORMAT(dataTermino, '%d-%m-%Y') AS finalData, P.anoEdital AS edictYear, P.numEdital AS edictNumber FROM projeto P JOIN servidor_participa_projeto SP ON P.idProjeto = SP.idProjeto JOIN servidor S ON S.siapeServidor = SP.siapeServidor WHERE S.siapeServidor = " + teacherCod + " AND DATE_FORMAT(P.dataInicio, '%Y') IN (" + years + ") ORDER BY date ASC";

			return new Promise(function(resolve, reject)
			{
				vars.con.query(sql, function(err, results, fields)
				{
					console.log(this.sql);
					if(err) reject(results);
					resolve(results);
				});
			});
		}
		catch(e)
		{
			throw e;
		}
	},
	getYearsAvailableByTeacher: function(teacherName)
	{
		var sql1 = "SELECT siapeServidor FROM servidor WHERE nomeServidor = '" + teacherName + "';";	
		var sql2 = "SELECT DATE_FORMAT(P.dataInicio, '%Y') AS initialData FROM servidor_participa_projeto SP JOIN servidor S ON SP.siapeServidor = S.siapeServidor JOIN projeto P ON P.idProjeto = SP.idProjeto WHERE S.siapeServidor = ? ORDER BY initialData DESC";
		return new Promise(function(resolve, reject)
		{
			vars.con.query(sql1, function (err, result, fields)
			{
				var siapeServidor = result[0]["siapeServidor"];
				vars.con.query(sql2, siapeServidor, function (err, results, fields)
				{
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
	toTitleCase: function (str) {
		return str.replace(/\w\S*/g, function(txt){
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	},
    /* Function to get info of a proceeding by it's code
	   params: code of proceeding to be searched
	   return: array containing proceeding code, it's name and authors
	*/
	getProceedingInfo: function (proceedingCode)
	{
		const getProceedingInfo = "SELECT S.nomeServidor AS proceedingAuthor, P.nomePublicacao AS proceedingName, URN_ArtigoCompleto AS proceedingPath FROM servidor S JOIN servidor_publica SP ON S.siapeServidor = SP.siapeServidor JOIN publicacao P ON P.codPublicacao = SP.codPublicacao WHERE P.codPublicacao = " + proceedingCode + "";
		const getProceedingStudents = "SELECT nomeAluno AS proceedingStudent FROM aluno_publica AP JOIN aluno A ON AP.matriculaAluno = A.matriculaAluno JOIN publicacao P ON P.codPublicacao = AP.codPublicacao WHERE P.codPublicacao = " + proceedingCode + "";
		const sql = getProceedingInfo +";"+ getProceedingStudents +";";
		
		return new Promise(function(resolve, reject)
		{
			vars.con.query(sql, [1, 2], function (err, results, fields)
			{
				var proceedingInfo = [];
				proceedingInfo.push(proceedingCode);
				proceedingInfo.push(results[0][0]["proceedingName"]);
				proceedingInfo.push([]);
				
				if(results[0]["proceedingPath"] != null) proceedingInfo.push(results[0]["proceedingPath"]);
				else proceedingInfo.push('null');
				results[0].forEach(function(result)
				{
					var proceedingAuthor = functions.toTitleCase(result["proceedingAuthor"]);
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
    },
    /* This function gets proceeding code, by one of it's keywords known
        params: Proceeding keyword (string)
        return: Proceeding code (int) 
    */
   getProceedingCodeByKeyword: function (keywordToBeSearched)
   {
        const sql = "SELECT P.codPublicacao AS code FROM palavras_chave_publicacao PCP JOIN publicacao P ON P.codPublicacao = PCP.fk_codPublicacao WHERE PCP.palavra = '" + keywordToBeSearched + "'";
       
        return new Promise(function(resolve, reject)
        {
			vars.con.query(sql, function (err, results, fields)
			{
                if(err) return reject(err);
                else 
                {
                    var proceedingsCodes = [];
                    results.forEach(function(proceedingCode)
                    {
                        proceedingsCodes.push(proceedingCode["code"]);
                    });
                    resolve(proceedingsCodes);
                }
			});
        });
   },
   getTeachersOnDatabase: function()
   {
	   const sql = "SELECT nomeServidor AS teacherName, siapeServidor AS teacherCod FROM servidor WHERE cargo LIKE '%Professor%' ORDER BY nomeServidor ASC";

	   return new Promise(function(resolve, reject)
        {
			vars.con.query(sql, function (err, results, fields)
			{
                if(err) return reject(err);
                else
                {
                    resolve(results);
                }
			});
        });
   },
   getInternalResearchWorksInfo: function()
   {
	   const sql = "SELECT nomeProjeto AS projectName FROM projeto";

	   return new Promise(function(resolve, reject)
        {
			vars.con.query(sql, function (err, results, fields)
			{
                if(err) return reject(err);
                else
                {
                    resolve(results);
                }
			});
        });
   }
};
  module.exports = functions;