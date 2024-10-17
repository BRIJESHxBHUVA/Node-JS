const mongoose = require('mongoose')
const ManagerSchema = mongoose.Schema({
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
    },
    createdAT: {
        type: String,
        required: true
    }
})

const manager = mongoose.model('Manager', ManagerSchema)
module.exports = manager