const express = require('express')
const route = express.Router();

const controller = require('../Controller/Controller')

route.get('/', controller.login)

route.get('/dashboard', controller.dashboard)

route.get('/form', controller.form)

route.get('/table', controller.table)

route.post('/insert', controller.insert)

module.exports = route