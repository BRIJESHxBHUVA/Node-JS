const express = require('express')
const Subcategory = express.Router()
const SubCategoryCTL = require('../Controller/SubCategoryCTL')

Subcategory.get('/addsubcategory', SubCategoryCTL.subcategory)


module.exports = Subcategory