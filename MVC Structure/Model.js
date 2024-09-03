const mongoose = require('mongoose')

const NewModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})

const EmployeModal = mongoose.model('EmployData', EmployeSchema)

module.exports = EmployeModal