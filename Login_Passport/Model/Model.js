const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        required: true
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

const LoginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model('Passport', Schema)
const Login = mongoose.model('Admin', LoginSchema)

module.exports = { Admin, Login };