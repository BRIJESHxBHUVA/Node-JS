const mongoose = require('mongoose')

const SubCategorySchema = mongoose.Schema({
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'Category',
        required: true
    },
    productcategory: {
        type: String,
        required: true
    }
})

const SubCategory = mongoose.model('ProductSubcategory', SubCategorySchema)

module.exports = SubCategory