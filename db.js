var request = require("request")
var async = require("async");
var express = require('express');
var router = express.Router();

var app = require ('./app.js');

var sessionQuiz = 0;
var index = 0;
var questionsQuiz = {
  "qtdQuestions": 5,
  "Perguntas": [
    {
      "img": "/images/frevo_cancao.jpg",
      "loading": "login/profile",
      "index":0,
      "question": "Com qual frequencia você escuta frevo longe do carnaval  1",
      "answers": [
        "Nem sabia que existia frevo fora do carnaval",
        "Quando toca nas festas sempre danço",
        "Todos os meses do ano",
        "Nas prévias e no carnaval"
      ]
    },
    {
      "img": "/images/frevo_RUA.jpg",
      "loading": "#",
      "index": 1,
      "question": "No carnaval como você costuma reagir aquele calafrio?  2",
      "answers": [
        "Eu corro para qualquer banheiro quimico",
        "Morro mas não uso aqueles banheiros",
        "O que tiver mais perto, o que importa é aliviar.",
        "Pago R$10,00 se o banheiro tiver limpo"
      ]
    },
    {
      "img": "/images/frevo_bloco.jpg",
      "loading": "#",
      "index":2,
      "question": "No carnaval como você costuma reagir aquele calafrio?   3",
      "answers": [
        "Eu corro para qualquer banheiro quimico",
        "Morro mas não uso aqueles banheiros",
        "O que tiver mais perto, o que importa é aliviar.",
        "Pago R$10,00 se o banheiro tiver limpo"
      ]
    },
    {
      "img": "/images/frevo_cancao.jpg",
      "loading": "#",
      "index":3,
      "question": "No carnaval como você costuma reagir aquele calafrio?  4",
      "answers": [
        "Eu corro para qualquer banheiro quimico",
        "Morro mas não uso aqueles banheiros",
        "O que tiver mais perto, o que importa é aliviar.",
        "Pago R$10,00 se o banheiro tiver limpo"
      ]
    },
    {
      "img": "/images/frevo_RUA.jpg",
      "loading": "#",
      "index": 4,
      "question": "No carnaval como você costuma reagir aquele calafrio?   5",
      "answers": [
        "Eu corro para qualquer banheiro quimico",
        "Morro mas não uso aqueles banheiros",
        "O que tiver mais perto, o que importa é aliviar.",
        "Pago R$10,00 se o banheiro tiver limpo"
      ]
    }    
  ]};
var respostas = [];

//função responsável por recuperar as questões do banco de dados mysql
function getQuiz(req, res, next) {

	//if necessário para garantir que a página do quiz só será renderizada com as questões carregadas.
	//Bloco comentado para recuperar as perguntas do banco, atualmente as perguntas estão fixas.
/*	if (questionsQuiz==null){
		req.getConnection(function(err, connection){
			connection.query('Select question.description as pergunta, answer.description as resposta from question, answer where question.id_question = answer.id_question and question.id_question = 7',[],function(err,result){
				if(err) console.log(err);				
				//com o resultado da consulta o banco, o Json vai ser montado no formato desejado.
				questionsQuiz = montarJson(result);
				getQuiz(req,res,next);
				//res.render('index', questionsQuiz.Perguntas[index]);

			});
		});  	
	
	}else{
		req.session.index = 0;
		req.session.respostas = [];
		res.render('quiz', questionsQuiz.Perguntas[index]);	
	};*/
	req.session.index = 0;
	req.session.save();
	req.session.respostas = [];
	console.log('ANTES DO RENDER 2');

    async.series([
            function (callback) {

                   var login = require('./routes/login'); 
                   login.createSitemap(req, res, function () { console.log('sitemap');  });											


                callback(null, null);
            }],
        function (err, res) {
            if (err) {
                return callback({"Error": true, "Message": "Error \n\n" + err});
            }
            // OK 
        }
    );
	  
	  res.render('quiz', questionsQuiz.Perguntas[req.session.index]);	
  
	console.log('DEPOIS DO RENDER 2');

};


function montarJson(result){
	//result é o retorno da consulta no banco.
	//Selecionar uma pergunta que ainda nao foi registrada para secao atual 
	return {"qtdQuestions" : 2, "Perguntas":[{ "question": result[0].pergunta, "answers" : [ result[0].resposta , result[1].resposta , result[2].resposta , result[3].resposta ] }	, { "question": "pergunta2", "answers": ["1","2","3","4"]}]};
			

};

function saveAnswer(req,res,next){
	//adiciona no array as respostas do usuário para ao fim do quiz armazenar todas as perguntas no quiz.
	req.session.index = req.body.index;
	req.session.indexresp = req.body.indexresp;
	req.session.respostas.push(req.body.resp);
	if (req.session.index == (questionsQuiz.qtdQuestions-1)) {
		req.session.index=0;
		req.session.respostas = [];
		if (typeof(req.session.tipoFrevo) != 'undefined'){
			//res.redirect("/pi/match"); // COMENTADO PORQUE A PAGINA N PODE MAIS DAR RELOAD - THIAGO 09/11/2017
			res.json({perguntas: questionsQuiz.Perguntas[req.session.index], index: -1, message:"Muito obrigado por participar da nossa pesquisa!"});

		}else{
			console.log("deu ruim, espera um pouco");
			res.render('process');
		}
		index = req.session.index;
		req.session.save();
		
		//res.render('playFrevo',{'imagem':'/images/frevo-de-rua.jpg',"idMusica":'0PIzeDHvE2l3fgp4p9HI18', 'nome':'Frevo-de-rua', 'descricao':'Primeiro gênero a surgir, é puramente instrumental e único no mundo. Este frevo é destinado a ser dançado.', 'modelo':null});
	}else {
		//res.render('quiz', questionsQuiz.Perguntas[req.session.index]);  // COMENTADO PORQUE A PAGINA N PODE MAIS DAR RELOAD - THIAGO 09/11/2017
		
		req.session.index++;
		req.session.save();
		index = req.session.index;

		console.log(questionsQuiz.Perguntas[req.session.index]);
		res.json({perguntas: questionsQuiz.Perguntas[req.session.index], index: req.session.index});
		
		//console.log(req.session.respostas);
		
	};
	req.session.save();
	console.log(req.session.tipoFrevo);
	console.log('__________________Content Itens hahahhaha -----------------------------------------');
	console.log(typeof(req.session.itens.contentItems));
	//console.log(req.session.itens);
	//index responsável por identificar


};




function saveModel (req, res, next) {
	modelPerson = req.body.modelo;
	choicePerson = req.body.tipo;

	req.getConnection(function(err, connection){
		connection.query("Insert into choice_users (modelo, choice) values ('"+modelPerson+"','"+choicePerson+"')",[],function(err,result){
			if(err){ 
				console.log('Error no insert do modelo ' + err)
				res.send(err);
			}else{			
			//com o resultado da consulta o banco, o Json vai ser montado no formato desejado.
			res.render('thanks');
			//res.render('index', questionsQuiz.Perguntas[index]);
			};

		});
	}); 

};

function getIndex(req){
	return req.session.index;
}

//é necessário exportar as funções para que elas estejam disponíveis em outro arquivo.
module.exports = {getQuiz, saveAnswer, saveModel, getIndex};