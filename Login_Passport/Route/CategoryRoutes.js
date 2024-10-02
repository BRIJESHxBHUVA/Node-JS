const express = require('express')
const categoryroutes = express.Router()
const CategoryCTL = require('../Controller/CategoryCTL')

categoryroutes.get('/addcategory', CategoryCTL.category)

module.exports = categoryroutes