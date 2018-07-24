var env = process.env.NODE_ENV || 'production';
var config = require('../model/config')[env];
var mysql = require('mysql');
var con = mysql.createConnection({
	host: config.database.host,
	user: config.database.user,
	password: config.database.pass,
	database: config.database.db,
	multipleStatements: true
  });

module.exports = {
		con: con,
		config: config
}