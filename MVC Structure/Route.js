const express = require('express')
const route = express.Router()

const RouteController = require('./PageControl')

route.get('/', RouteController.home)

module.exports = route