var watson = require('watson-developer-cloud');


function traduzir(texto, successCallback, errCallback){
/*
    var language_translator = watson.language_translator({
        url: "https://gateway.watsonplatform.net/language-translator/api",
        username: 'e8526278-1496-4258-bddb-b07c106c8046',
        password: 'NQTdqCoEcVn0',
        version: 'v2'
    });
    	*/
var language_translator = watson.language_translator({
       url: "https://gateway.watsonplatform.net/language-translator/api",
       username: '984483db-901e-4874-ab9a-ab311eec86de',
       password: 'HAVVEitaBcjo',
       version: 'v2'
   });    	
        language_translator.translate({
        text: texto,
        source: 'pt',
        target: 'en'
    }, function(err, translation) {
        if (err)
            errCallback(err)
        else
            var x = translation.translations[0].translation;
            successCallback(x)
    });

};
module.exports = {traduzir};
