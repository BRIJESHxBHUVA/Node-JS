const owner = require('../Model/OwnerSchema')
const path = require('path')
const fs = require('fs')
const manager = require('../Model/ManagerSchema')
const employee = require('../Model/EmployeeSchema')
const Mailer = require('../Middleware/Mailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')

module.exports.getowner = async (req, res)=> { 
    try {
        const data = await owner.find({}) 
        if(data.length <= 0) {
            res.status(300).json({success: false, message: 'Owner not found'})
        }
        res.status(200).json({ success: true, message: 'Owner get successfully',  data })
    } catch (error) {        
        res.status(400).json({success: false, message: 'Error while data getting', error})
    }
}

module.exports.getmanager = async (req, res)=> { 
    try {
        const data = await manager.find({}) 
        res.status(200).json({ success: true, message: 'Manager get successfully',  data })

        if(data.length <= 0) {
            res.status(300).json({success: false, message: 'Manager not found'})
        }
    } catch (error) {        
        res.status(400).json({success: false, message: 'Error while data getting', error})
    }
}

module.exports.getemployee = async (req, res)=> {
    try {
        const data = await employee.find({})
        res.status(205).json({ success: true, message: 'Employee get successfully',  data })

        if(data.length <= 0) {
            res.status(300).json({success: false, message: 'Employee not found'})
        }
    } catch (error) {
        res.status(400).json({success: false, message: 'Error while data getting', error})
    }
}

module.exports.addowner = async (req, res) => {
    try {
        const useremail = await owner.findOne({email: req.body.email})
        if(useremail){
            return res.status(400).json({message: "Email already exists"})
        }
        if(req.file){ 
            req.body.image = req.file.filename
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        req.body.createdAT = moment().format('LLLL')

        const data = await owner.create(req.body)
        res.status(201).json({message: "Owner registered successfully", data})
    } catch (error) {
        res.status(404).json({ success: false, message: error })
    }
    
}


module.exports.deleteowner = async (req, res) => {
    try {
        const deletedata = await owner.findById(req.query.id);

        if(deletedata.image){
            const oldImage = path.join(__dirname, '../Images/owner/', deletedata.image)
            fs.unlinkSync(oldImage)
        }

        const data = await owner.findByIdAndDelete(req.query.id);
        res.status(200).json({ success: true, message: 'Owner deleted successfully.' });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message, })
    }
}

module.exports.resetpassword = async (req, res)=> {
    try {
        const userpw = await owner.findById(req.query.id)
        console.log(userpw)
        if(userpw.password == req.body.oldps){
            if(userpw.password != req.body.newps){
                if(req.body.newps == req.body.confirmps){
                    const data = await owner.findByIdAndUpdate(userpw.id, {password: req.body.confirmps})
                    res.status(200).json({ success: true, message: 'Password change successfully.', data })
                }else{
                    res.status(400).json({ success: false, message: 'new password and confirm password must be same.' })
                }
            }else{
                res.status(400).json({ success: false, message: 'old password and new password must be different.' })
            }
        }else{
            res.status(400).json({ success: false, message: 'incorrect old password.' })
        }
        
    } catch (error) {
        res.status(404).json({ success: false, message: error.message, })
    }
}


module.exports.sendOTP = async (req, res)=> {
    try {
        const useremail = await owner.findOne({email: req.body.email})
        if(useremail){
            const otp = Math.floor(100000 + Math.random() * 900000)
            Mailer.sendotp(req.body.email, otp)
            req.session.otp = otp
            req.session.ownerId = useremail.id
            res.status(200).json({ success: true, message: 'OTP send successfully'})
        }else{
            res.status(400).json({ success: false, message: 'incorrect email.' })
        }
    } catch (error) {
        res.status(404).json({ success: false, message: error.message, })
    }
}

module.exports.forgotpassword = async (req, res)=> {
    try {

        const otp = req.session.otp
        const ownerId = req.session.ownerId

        if(req.body.otp == otp){
            if(req.body.newps == req.body.confirmps){
                const data = await owner.findByIdAndUpdate(ownerId, {password: req.body.newps})
                res.status(200).json({ success: true, message: 'password changed successfully.', data })
            }else{
                res.status(400).json({ success: false, message: 'new password and confirm password are must be same'})
            }
        }else{
            res.status(400).json({ success: false, message: 'invalid OTP.'})
        }

    } catch (error) {
        res.status(404).json({ success: false, message: error.message, })
    }
}

module.exports.login = async (req, res)=>{
    try {
        const user = await owner.findOne({email: req.body.email})
        if(user){
            if( bcrypt.compare(req.body.password, user.password)){
                const token = jwt.sign({user: {_id: user._id}}, 'admin', {expiresIn: '7d'})
                res.status(200).json({ success: true, message: 'Login successfully.', token })
                console.log(token)
            }else{
                res.status(401).json({ success: false, message: 'Invalid password.'})
            }
        }else{
            res.status(401).json({ success: false, message: 'Invalid email address.'})
        }
    } catch (error) {
        res.status(404).json({ success: false, message: error.message, })
    }
}