var http = require('http');
var fs = require('fs');
//2.
var server = http.createServer(function (req, resp) {
    var mysql = require('mysql');

    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
    });

    con.connect(function(err) {
    if (err) throw err;
    });

    if (req.url == "/charts") {
        fs.readFile("index.html", function (error, pgResp) {
            if (error) {
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            } else {
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.write(pgResp);
            }
             
            resp.end();
        });
    } else {
        //4.
        resp.writeHead(404);
        resp.end();
    }
}).listen(8000);