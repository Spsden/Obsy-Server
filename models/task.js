const mongoose = require('mongoose');

const ObsyTaskSchema = new mongoose.Schema({ 
    title:String,
    durationType:String,
    icon:String,
    localiD:String,
    interval:Number,
    duration:String,
    url:String,
    xPath:String,
    date:Date,
})

module.exports = mongoose.model('Task',ObsyTaskSchema)