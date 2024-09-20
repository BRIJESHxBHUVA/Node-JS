const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
})

const Admin = mongoose.model('Passport', Schema)

module.exports = Admin;