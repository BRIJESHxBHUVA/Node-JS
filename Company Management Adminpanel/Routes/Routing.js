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

const upload = multer({storage: storage}).single('image')

router.get('/owner', auth, controller.getowner)
router.get('/manager', controller.getmanager)
router.post('/addowner', upload ,controller.addowner)
router.delete('/deleteowner', controller.deleteowner)
router.put('/resetpassword', controller.resetpassword)
router.post('/sendotp', controller.sendOTP)
router.put('/forgotpassword', controller.forgotpassword)
router.post('/login', controller.login)

module.exports = router