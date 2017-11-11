var socket = io.connect(); 

// if we get an "info" emit from the socket server then console.log the data we recive
socket.on('info', function (data) {
    console.log(data);
    var html = '<span>'+data.data+'</span><br><br><hr />';
    $("#divfaceinfo").prepend(html);

});

socket.on('face', function (data) {
    //console.log(data);
    ///$("#imgloading").show()

    var dt = new Date(data.data.created_time);
    var html = '<span>'+dt.toDate('dd/mm/yyyy hh:ii:ss')+' - '+data.data.message+'</span><br><br>';
    $("#divfaceinfo").prepend(html);
});

socket.on('watson', function (data) {
    //console.log(data);
    var html = '';

	data.data.needs.forEach(function(entry) {
	    //console.log(entry);
	    html = '<span>'+entry.name+': '+entry.raw_score+'</span><br>';
	    $("#divfaceinfo").prepend(html);
	    
	});
	data.data.personality.forEach(function(entry) {
	    //console.log(entry);
	    html = '<span>'+entry.name+': '+entry.raw_score+'</span><br>';
	    $("#divfaceinfo").prepend(html);
	    
	});
	data.data.values.forEach(function(entry) {
	    //console.log(entry);
	    html = '<span>'+entry.name+': '+entry.raw_score+'</span><br>';
	    $("#divfaceinfo").prepend(html);
	});

});

socket.on('finish', function (data) {
    console.log(data);
    $("#btnavancar").val(data.data.nome+' - Clique para avançar');
    $("#btnavancar").show()
    $("#imgloading").hide()
    	
});
socket.on('login', function (data) {
    console.log(data);
    $(location).attr("href", "/login/");
});
