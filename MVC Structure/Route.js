const express = require('express')
const route = express.Router()

const RouteController = require('./PageControl')

route.get('/', RouteController.home)
route.get('/product', RouteController.product)
route.get('/cart', RouteController.cart)

module.exports = route