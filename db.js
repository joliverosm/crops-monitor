const mongoose = require('mongoose');
const config = require('./config');

const URL = config.DB;

mongoose.connect(URL, { useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log("Can't connect to DB"));

module.exports = mongoose;