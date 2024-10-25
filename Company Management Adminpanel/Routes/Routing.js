const express = require('express')
const router = express.Router()
const controller = require('../Controller/Controller')
const multer = require('multer')
const auth = require('../Middleware/Authentication')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images/owner')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const mngstorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images/manager')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const empstorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images/employee')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('image')
const mngupload = multer({storage: mngstorage}).single('image')
const empupload = multer({storage: empstorage}).single('image')

router.get('/owner', auth, controller.getowner)
router.get('/manager', auth, controller.getmanager)
router.get('/employee', auth, controller.getemployee)
router.post('/addowner', upload ,controller.addowner)
router.post('/addmanager',auth, mngupload ,controller.addmanager)
router.post('/addemployee',auth, empupload ,controller.addemployee)
router.delete('/deleteowner', controller.deleteowner)
router.delete('/deletemanager', auth, controller.deletemanager)
router.delete('/deleteemployee', auth, controller.deleteemployee)
router.put('/resetpassword',auth, controller.resetpassword)
router.post('/sendotp', controller.sendOTP)
router.put('/forgotpassword', controller.forgotpassword)
router.post('/login', controller.login)

module.exports = router