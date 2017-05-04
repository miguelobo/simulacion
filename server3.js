/**
 * Created by JOSE MANUEL LOBO on 26/04/17.
 */
var WSServer = require('ws').Server,
    wss = new WSServer({port:8085});



var operativeSystemModule = require("os");
/////red
var os = require("os");
//console.log(os.networkInterfaces())
///////cpu
var cpu=os.cpus();
console.log('cpu: '+cpu[0].model);
/////////arquitectura
console.log('arquitectura : '+os.arch());
////////////capacidad de memoria ram
var bytesAvailable = os.totalmem(); // Retorna un numero con la capacidad de la memoria(en bytes)
// 1 mb = 1048576 bytes
console.log("RAM Total (MB):" + (bytesAvailable/1048576) );
/////////////memoria libre

var mbTotal = ((os.totalmem())/1048576);
var mbFree = ((os.freemem())/1048576);

console.log("RAM Libre(MB)"+mbFree);
////sistema operativo

console.log('Sistema operativo : '+ os.type()); // Linux, Darwin or Window_NT
console.log('Plataforma: '+os.platform()); // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
///// disco duros npm install drivelist
console.log('Archivos Temporales: '+os.tmpDir());
var info ={
    host:os.hostname(),
    cpu:cpu[0].model,
    arq:os.arch(),
    ramt:mbTotal,
    raml:mbFree,
    so:os.type(),
    pla:os.platform(),
    version:os.release(),
    dtemp:os.tmpDir(),
    Tuso:os.uptime(),
    Propietario:os.userInfo().username
}

//console.log(info);






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
wss.on('connection', function (socket) {
    console.log('cliente conectado');
    socket.on('message', function (msg) {
      //  console.log('Recibido: ', msg, '\n', 'Desde la IP: ', socket.upgradeReq.connection.remoteAddress
      //      , '\n', 'Desde el puerto: ', socket.upgradeReq.connection.remotePort
      //      , '\n', 'Desde la direccion: ', socket.upgradeReq.connection.address()

       // );
        if (msg === 'Hola') {  console.log(msg); socket.send('Si funciona!');  }
        if (msg === 'migue') {   socket.send('migue es la verga!');  }
        if (msg === 'in') {   socket.send(JSON.stringify(info));  }
    });
    socket.on('close', function (code, desc) {
        console.log('Desconectado: ' + code + ' - ' + desc);
    });
});