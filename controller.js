	
	var express = require('express');
	var app     = express();
	var bodyParser = require('body-parser')
	var path    = require("path");
	var rssFeed = require(__dirname+'/messageApi.js');

	
	app.use(bodyParser.urlencoded({ extended: false }))
	 
	
	app.use(bodyParser.json())

	//All end points -->	
	app.get('/',function(req,res){
	  res.sendFile(path.join(__dirname+'/index.html'));
	});
	app.get('/allMessages', rssFeed.getAllMessages);
	app.get('/message/:id', rssFeed.getMessage);
	app.delete('/message/:id', rssFeed.deleteMessage);
	
	
	


	var server = app.listen(8083,function(){
	   console.log('express server listening on port ' + server.address().port);
	});