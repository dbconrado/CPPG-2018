var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./controller/routes');
var compression = require('compression');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var vars = require('./model/variables.js');

var app = express();
app.use(compression());

// cookies and session setup
app.use(cookieParser());

var options = {
  host: vars.config.database.host,
  port:vars.config.database.port,
  user: vars.config.database.user,
  password: vars.config.database.pass,
  database: vars.config.database.db
};

var sessionStore = new MySQLStore(options);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.message = 'Choosing an existing page would make my life soooooo much easier..';
  res.status(err.status || 404);
  res.render('error', {
    errorCode: res.statusCode,
    message: err.message,
    err: {}
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      errorCode: res.statusCode,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    errorCode: res.statusCode,
    message: err.message,
    error: {}
  });
});
module.exports = app;