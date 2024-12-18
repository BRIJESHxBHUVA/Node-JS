const express = require('express')
const employee = express.Router()
const multer = require('multer')
const employeeCTL = require('../Controller/EmployeeCTL')
const auth = require('../Middleware/Authentication')
const employeeauth = require('../Middleware/EmployeeAuth')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Images/employee')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('image')

employee.get('/getemployee', employeeauth ,employeeCTL.getemployee)
// employee.get('/getemployee' ,employeeCTL.getemployee)
// employee.post('/addemployee', upload ,employeeCTL.addemployee)
// employee.delete('/deleteemployee', employeeCTL.deleteemployee)
employee.put('/resetpassword', employeeCTL.resetpassword)
employee.post('/sendotp', employeeCTL.sendotp)
employee.put('/forgotpassword', employeeCTL.forgotpassword)
employee.post('/login', employeeCTL.login)

module.exports = employee