const mongoose = require('mongoose');
const { Schema } = mongoose;

const cropSchema = new Schema({
    temperature: String,
    humidity: String,
    date: Date    
});

module.exports = mongoose.model('Crop', cropSchema);