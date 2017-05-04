/**
 * Created by JOSE MANUEL LOBO on 26/04/17.
 */
var WebSocketServer = require('ws').Server;

var PORT = 8087;

var wss = new WebSocketServer({port: PORT});

var messages = [];
wss.on('connection', function (ws) {
    messages.forEach(function(message){
        ws.send(message);
    });
    ws.on('message', function (message) {
        messages.push(message);
        console.log('Mensaje Recibido: %s', message);
        if (message === 'Hola') {   ws.send('Si funciona!');  }
        wss.clients.forEach(function (conn) {
            conn.send(message);
        });
    });
});