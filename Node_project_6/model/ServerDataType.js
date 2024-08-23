const mongoose = require('mongoose')

const CrudModal = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    job: {
        type: String,
        require: true,
    },
    salary: {
        type: Number,
        require: true,
    }
})
const crudtable = mongoose.model("EmployeData",CrudModal)

module.exports = crudtable