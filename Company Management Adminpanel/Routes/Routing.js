const express = require('express')
const router = express.Router()
const controller = require('../Controller/Controller')

router.post('/addowner', controller.addowner)

module.exports = router