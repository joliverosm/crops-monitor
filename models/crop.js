const mongoose = require('mongoose');
const { Schema } = mongoose;

const cropSchema = new Schema({
    temperature: String,
    humidity: String,    
});

module.exports = mongoose.model('Crop', cropSchema);