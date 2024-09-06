const mongoose = require('mongoose')
const ModelSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    rating: {
        type: String,
        require: true
    },
    image: {
        type: String,
    }
})

const Modal = mongoose.model('Movie Data', ModelSchema)
module.exports = Modal