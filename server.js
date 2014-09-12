var express=require('express');
var http = require('http');
var app=express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var users=[];

app.use(express.static(__dirname + '/'));
app.get('/',inicio);

function inicio (req,res) {
	res.render('index.html');
}

//Evento que atiende a cada nuevo user conectado
io.sockets.on('connection', function (socket) {


   //Ingresa al nuevo user en un array
 	socket.on('nuevoUser',function(data){

 		var existe=checkUser(data.nick);
 		if (!existe){        
 	 		var user={
	 			nick:data.nick,
	 			lat:data.lat,
	 			lon:data.lon
 			}
 			users.push(user);
 			console.log(users);
 		}
 		//Envia una lista de todos los usuarios conectados
 		 io.sockets.emit('listaUsers',users);
 
 	});
	 
});


//Cheque si un userName ya existe
function checkUser(nick) {
	for (var i = 0, len = users.length; i < len; i++) {
    	if (users[i].nick === nick) {
    		return true;
    	}
    }
    return false;
}

server.listen(3000);