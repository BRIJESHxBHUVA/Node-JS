const mongoose = require('mongoose')
const OwnerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },  
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const owner = mongoose.model('Owner', OwnerSchema);
module.exports = owner;