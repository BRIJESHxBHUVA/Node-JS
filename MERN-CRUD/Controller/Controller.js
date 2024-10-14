const schema = require('../Model/ModelSchema')
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken')

module.exports.get = async (req, res) => {
    const data = await schema.find({})
    res.status(200).json({ message: 'data get successfully', data })
}

module.exports.post = async (req, res) => {
    try {
        const useremail = await schema.findOne({email: req.body.email}) 
        if(useremail){
            return res.status(400).json({ message: 'Email already exists' })
        }
        if(req.file){
            req.body.image = req.file.path
        }
    
        req.body.password = await bcrypt.hash(req.body.password, 10)
        req.body.createdAT = moment().format('LLLL')

        const data = await schema.create(req.body)
        res.status(201).json({ message: 'data created successfully', data })

    } catch (error) {
        res.status(404).json({ message: 'data is not created' })
    }
}

module.exports.delete = async (req, res) => {
    try {
        const data = await schema.findByIdAndDelete(req.query.id)
        res.status(205).json({ message: 'data deleted successfully', data })
    } catch (error) {
        res.status(400).json({ message: 'data is not deleted'})
    }
   
}

module.exports.update = async (req, res) => {
    try {
        const data = await schema.findByIdAndUpdate(req.query.id, req.body)
        res.status(203).json({ message: 'data is updated successfully.', data})
    } catch (error) {
        res.status(400).json({ message: 'data is not updated.'})
    }
}

module.exports.login = async (req, res) => {
    try {
        const user = await schema.findOne({email: req.body.email})
        if(bcrypt.compare(req.body.password, user.password)){
            const token = jwt.sign({user: user}, 'admin', {expiresIn: '1h'})
            res.status(200).json({ message: 'login successfully', token })
            console.log(token)
        }
        else{
            res.status(400).json({ message: 'invalid email or password' })
        }
        
    } catch (error) {
        res.status(400).json({message: 'user login error'})
    }

}