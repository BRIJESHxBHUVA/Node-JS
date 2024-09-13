const mongoose = require('mongoose');
const ModelSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirmps: {
        type:String,
        required: true,
    }
})

const Modal = mongoose.model('Data', ModelSchema)
module.exports = Modal