const mongoose = require('mongoose');
const { Schema } = mongoose;

const controlSchema = new Schema({    
    motor: Boolean,
    turbine: Boolean
});

module.exports = mongoose.model('Control', controlSchema);