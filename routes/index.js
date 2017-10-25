var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var db = require("../db");


var json = { question:"Qual tipo de Frevo você é?", answers : ["delando", "thiago", "Gleybson", "Frevo"]};

//Arquivo de routas da página inicial, todas as chamadas feitas em localhost:3000/ irá procurar um complemento nesse arquivo.

/* GET home page. default */
router.get('/quiz', function(req, res, next) {
	db.getQuiz(req, res, next);
  	//res.render('index', json);
});

router.post('/quiz', function(req, res, next) {
	//json = { question:req.body.resp, answers : ["delando", "thiago", "Gleybson", "Frevo"]};
  	db.saveAnswer(req, res, next);
});

router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/chart', function(req, res, next) {
  res.render('chart');
});


module.exports = router;
