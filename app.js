var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');

var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var politica = require('./routes/politica');

var pi = require('./routes/pi');
//var socket = null;
//passport
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

//módulos de conexão com Banco de dados
var mysql = require('mysql');
var connection = require('express-myconnection');

var app = express();
app.use(cors()); 

//configurações de conexão com BD
app.use(
   connection(mysql,{
     host: 'mysql.inhalt.net.br',
     user: 'batutawatson',
     password : 'b@tut@Watson',
     port : 3306, //port mysql
     database:'batuta'
   },'request')
);

/*app.use(
   connection(mysql,{
     host: 'localhost',
     user: 'root',
     password : '',
     port : 3306, //port mysql
     database:'test'
   },'request')
);*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('morgan')('combined'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/pi', pi);
app.use('/politica', politica);

  app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
    var _send = res.send;
    var sent = false;
    res.send = function(data){
        if(sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();


  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//function getSocket(){
//	return socket;
//}

module.exports = app; 


