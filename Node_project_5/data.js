const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: 'string',
    },
    password: {
        type: 'string',
    },
    email: {
        type: 'string',
        },
})

const userModal = mongoose.model('userdata', userSchema)

module.exports = userModal