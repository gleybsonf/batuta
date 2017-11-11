var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var db = require("../db");


var json = { question:"Qual tipo de Frevo você é?", answers : ["delando", "thiago", "Gleybson", "Frevo"]};

//Arquivo de routas da página inicial, todas as chamadas feitas em localhost:3000/ irá procurar um complemento nesse arquivo.

/* GET home page. default */
router.get('/quiz', function(req, res, next) {

	//global.broadcast.sockets.on('connection', function (socket) {
	//    console.log('Clique do facebook!');
	    //socket.emit('face', { msg: 'Agora os posts devem ser exibidos na tela!' });
	    //socket.emit ('info', { data: 'Agora os posts devem ser exibidos na tela!' });
	//});
	//console.log('ANTES DO RENDER 1');

	db.getQuiz(req, res, next);
	
	//console.log('DEPOIS DO RENDER!');
  	//res.render('index', json);
});

router.post('/quiz', function(req, res, next) {
	//json = { question:req.body.resp, answers : ["delando", "thiago", "Gleybson", "Frevo"]};
	
	console.log("save quiz");
  	db.saveAnswer(req, res, next);
});
router.post('/quiz2', function(req, res, next) {
	
	console.log("save quiz");
  	//db.saveAnswer2(req, res, next);
  	res.json(global.tipoFrevo);

});

router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/politica', function(req, res, next) {
  res.render('politica');
});
router.get('/playFrevo', function(req, res, next) {
  if(global.tipoFrevo){	
    res.render('playFrevo',global.tipoFrevo);
  }
  else{
	     console.log('error occurred' + res.error);
  }
});

module.exports = router;
