var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var customers = require('./routes/customers');
var customers2 = require('./routes/customers2');
var info = require('./routes/informacion');
var ruta = require('./routes/ruta');
var WSServer = require('ws').Server;

var expressValidator = require('express-validator');
var methodOverride = require('method-override');

var connection  = require('express-myconnection');
var mysql = require('mysql');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('views', path.join(process.cwd() + '/views'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:"secretpass123456"}));
app.use(flash());
app.use(expressValidator());
app.use(methodOverride(function(req, res){
 if (req.body && typeof req.body == 'object' && '_method' in req.body)
  {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/
app.use(
    connection(mysql,{
        host: '186.118.81.82',
        user: 'root', // your mysql user
        password : '', // your mysql password
        port : 3306, //port mysql
        database:'simulacion' // your database name
    },'pool') //or single

);
wss = new WSServer({port:8085});

    wss.on('connection', function (socket) {
        console.log('cliente conectado');
        socket.on('message', function (msg) {
            //  console.log('Recibido: ', msg, '\n', 'Desde la IP: ', socket.upgradeReq.connection.remoteAddress
            //      , '\n', 'Desde el puerto: ', socket.upgradeReq.connection.remotePort
            //      , '\n', 'Desde la direccion: ', socket.upgradeReq.connection.address()

            // );

            if (msg === 'Hola') {   socket.send('Si funciona!');  }
            if (msg === 'migue') {   socket.send('migue es la verga!');  }
            if (msg === 'in') {   socket.send(JSON.stringify(info));  }
        });

        socket.on('message', function (infor) {
            //var inf = JSON.parse(infor.data);
            console.log(infor);
            });

        socket.on('close', function (code, desc) {
            console.log('Desconectado: ' + code + ' - ' + desc);
        });
    })



app.use('/', index);
app.use('/customers', customers);
app.use('/users', users);
app.use('/informacion', customers2);
app.use('/ruta',ruta);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
