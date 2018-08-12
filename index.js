const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var helmet = require('helmet');


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
    socket.on('mazTemp', function (maxTemp) {
        io.emit('mazTemp', maxTemp);
    });    
});
