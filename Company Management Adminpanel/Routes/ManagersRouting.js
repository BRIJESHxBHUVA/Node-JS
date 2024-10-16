const express = require('express')
const manager = express.Router()
const multer = require('multer')
const managerCTL = require('../Controller/ManagerCTL')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Images/manager')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('image')

manager.get('/getmanager', managerCTL.getmanager)
manager.get('/getemployee', managerCTL.getemployee)
manager.post('/addmanager', upload ,managerCTL.addmanager)
manager.delete('/deletemanager', managerCTL.deletemanager)
manager.put('/resetpassword', managerCTL.resetpassword)
manager.post('/sendotp', managerCTL.sendotp)
manager.put('/forgotpassword', managerCTL.forgotpassword)
manager.post('/login', managerCTL.login)


module.exports = manager