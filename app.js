var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, resp) {

    var express = require('express');
    var app = express();

    require('json-response');

    var mysql = require('mysql');

    if (req.url == '/app.js'){
        app.post('/index', function(req, res) { 
        //Do some req verification stuff here
        //If req verfiication passes
        var servResp = {};
        servResp.success = true;
        servResp.redirect = true;
        servResp.redirectURL = "http://localhost:8000/charts";
        res.send(servResp);
        });
    }

    if (req.url == "/charts"){
        fs.readFile("index.ejs", function (error, pgResp){
            if (error){
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            } else{
                var con = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "root",
                    database: "cppg"
                });

                con.connect(function(err){
                if (err) throw err;
                    con.query("SELECT * FROM projeto WHERE categoriaProjeto = 'Pesquisa'", function (err, result, fields) {
                    if (err) throw err;
                        console.log(result);
                    });
                });

                app.get('/index.ejs', function(req, res) {
                  res.send('porra');
                }); 
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.write(pgResp);
            }
            resp.end();
        });
    } else{
        resp.writeHead(404);
        resp.end();
    }
    module.exports = server;
}).listen(8000);