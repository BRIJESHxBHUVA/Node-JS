const mongoose = require('mongoose');
const data = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAT: {
        type: String,
        required: true,
    }
})

const schema = mongoose.model('crud', data)
module.exports = schema