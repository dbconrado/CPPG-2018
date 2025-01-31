var env = process.env.NODE_ENV || 'production';
var config = require('../model/config')[env];
var mysql = require('mysql');
var fs = require('fs');
var con = mysql.createConnection({
	host: config.database.host,
	user: config.database.user,
	password: config.database.pass,
	database: config.database.db,
	multipleStatements: true
	});
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

module.exports = {
		con: con,
		config: config,
		monthNames: monthNames,
		fs: fs
}