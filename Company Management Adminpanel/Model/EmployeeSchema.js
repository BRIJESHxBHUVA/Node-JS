const mongoose = require('mongoose')
const EmployeeSchema = mongoose.Schema({
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

const employee = mongoose.model('Employee', EmployeeSchema)
module.exports = employee