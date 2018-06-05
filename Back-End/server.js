var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var Message = mongoose.model('Message', {
    msg : 'string'
})

app.use(bodyParser.json());

app.use(function(request, responce, next){
    responce.header("Access-Control-Allow-Origin", "*");
    responce.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.post('/api/message', function(request, responce){
    console.log(request.body);
    responce.status(200, "Santosh");
    var message = new Message(request.body);
    message.save();
    responce.status(200);
})

app.get('/api/message', GetMessages)

function GetMessages(request, responce){
    console.log("Get Data Responce")
    Message.find({}).exec(function(err, result){
        responce.send(result);
    })
}

mongoose.connect("mongodb://localhost:27017/users", function(err, db){
    if(!err){
        console.log("We are connected to Mongodb");
    }
})

var server = app.listen(5000, function(){
    console.log('Express is working on port', server.address().port);
})