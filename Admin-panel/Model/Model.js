const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
})

const ProductSchema = mongoose.Schema({

    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }

})

const Modal = mongoose.model('Data', ModelSchema)
const Product = mongoose.model('Product', ProductSchema)

module.exports = {Modal, Product}