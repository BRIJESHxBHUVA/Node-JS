const mongoose = require('mongoose')
const Modal = mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    }
})

const CrudSchema = mongoose.model('ProductData', Modal)
module.exports = CrudSchema;