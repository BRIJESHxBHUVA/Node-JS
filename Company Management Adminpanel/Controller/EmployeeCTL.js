const employee = require("../Model/EmployeeSchema");
const path = require("path");
const fs = require("fs");
const Mailer = require('../Middleware/Mailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')

module.exports.getemployee = async (req, res) => {
  try {
    const data = await employee.find({});
    
    if (data.length <= 0) {
      res.status(300).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, message: "Employee get successfully", data });

  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports.addemployee = async (req, res) => {
  try {
    const useremail = await employee.findOne({ email: req.body.email });
    if (useremail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (req.file) {
      req.body.image = req.file.filename;
    }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        req.body.createdAT = moment().format('LLLL')

    const data = await employee.create(req.body);
    res.status(200).json({ message: "Employee registered successfully", data });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};


module.exports.deleteemployee = async (req, res)=> {
    try {
        const deletedata = await employee.findById(req.query.id)
        if(deletedata.image){
            const oldImage = path.join(__dirname, '../Images/employee/', deletedata.image)
            fs.unlinkSync(oldImage)
        }
        const data = await employee.findByIdAndDelete(req.query.id)
        res.status(200).json({ success: true, message: 'Manager deleted successfully.' });
        
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

module.exports.resetpassword = async (req, res)=> {
  try {
    const userpw = await employee.findById(req.query.id)
    if( await bcrypt.compare(req.body.oldps, userpw.password)){
      if(req.body.oldps != req.body.newps){
        if(req.body.newps == req.body.confirmps){
          const hashPassword = await bcrypt.hash(req.body.confirmps, 10)
          const data = await employee.findByIdAndUpdate(userpw.id, {password: hashPassword})
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
    res.status(404).json({ success: false, message: error.message });
  }
}

module.exports.sendotp = async (req, res)=> {
  try {
    const useremail = await employee.findOne({email: req.body.email})
    if(useremail){
      const otp = Math.floor(100000 + Math.random() * 900000)
      Mailer.sendotp(req.body.email, otp)
      req.session.otp = otp
      req.session.employeeId = useremail.id
      console.log(otp)
      res.status(200).json({ success: true, message: 'OTP send successfully', useremail})
    }else{
      res.status(400).json({ success: false, message: 'incorrect email.' })
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

module.exports.forgotpassword = async (req, res)=> {
  try {

    const otp = req.session.otp
    const employeeId = req.session.employeeId

    if(req.body.otp == otp){
      if(req.body.newps == req.body.confirmps){
        const hashPassword = await bcrypt.hash(req.body.confirmps, 10)
        const data = await employee.findByIdAndUpdate(employeeId, {password: hashPassword})
        res.status(200).json({ success: true, message: 'password changed successfully.', data })
      }else{
        res.status(400).json({ success: false, message: 'new password and confirm password are must be same'})
      }
    }else{
      res.status(400).json({ success: false, message: 'invalid OTP.'})
    }

  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

module.exports.login = async (req, res)=> {
  try {
    const user = await employee.findOne({email: req.body.email})
    console.log(user)
    if(user){
      if(await bcrypt.compare(req.body.password, user.password)){
        const token = jwt.sign({user: {_id: user._id}}, 'admin', {expiresIn: '7d'})
        res.status(200).json({ success: true, message: 'Login successfully.', token, user })
        console.log(token)
      }else{
        res.status(401).json({ success: false, message: 'Invalid password.'})
      }
    }else{
      res.status(401).json({ success: false, message: 'Invalid email address.'})
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}