const express = require('express')
const routes = express.Router();
const controller = require('../Controller/Controller')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){   
        cb(null, 'movieimages/')
    },
    filename: function(req, file, cb){ 
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadpic = multer({storage : storage}).single('image')


routes.get('/', controller.home)

routes.get('/adding', controller.add)

routes.post('/insert', uploadpic ,controller.adddata)

routes.get('/delete', controller.deletedata)

routes.get('/editdata', controller.editdata)

routes.post('/editdata', uploadpic, controller.editeddata)

module.exports = routes