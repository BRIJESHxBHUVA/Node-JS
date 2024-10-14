const express = require('express')
const route = express.Router()
const controller = require('../Controller/Controller')
const multer = require('multer')
const path = require('path')
const middleware = require('../middleware/adminAuth')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/admin')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploads =  multer({storage: storage}).single('image')

route.get('/newdata' ,controller.get)
route.post('/create', uploads , controller.post)
route.delete('/delete', controller.delete)
route.put('/update', controller.update)
route.post('/login' ,controller.login)

module.exports = route