const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var helmet = require('helmet');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Settings
app.use(helmet());
const { mongoose } = require('./db.js');
const config = require('./config');
app.set('port', config.PORT);

//Middlewares
app.use(morgan('dev')); //For development purposes only
app.use(express.json()); //Before the module "bodyparser.json()" was used

//Routes
app.use('/api/crop', require('./routes/crop.routes'));
app.use('/api/control', require('./routes/control.routes'));


//Static files
app.use(express.static(path.join(__dirname, 'client')));


module.exports = io;

//Start server
server.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

//Socket.io - Web Sockets
io.on('connection', function (socket) {
    console.log('User Connected');    
    socket.on('disconnect', function () {
        console.log('User Disconnected');
    });
    socket.on('stateMotor', function(data) {
        io.emit('get motorState', data);
    });
    socket.on('stateTurbine', function (data) {
        io.emit('get turbineState', data);
    });
    socket.on('sensors', function (temp, humd, date) {        
        io.emit('sensors', temp, humd, date);
    });
    socket.on('minTemp', function (minTemp) {
        io.emit('minTemp', minTemp);
    });
    socket.on('maxTemp', function (maxTemp) {
        io.emit('maxTemp', maxTemp);
    });    
});
