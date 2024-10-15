const express = require('express')
const router = express.Router()
const controller = require('../Controller/Controller')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('image')

router.post('/addowner', upload ,controller.addowner)
router.get('/owner', controller.getowner)

module.exports = router