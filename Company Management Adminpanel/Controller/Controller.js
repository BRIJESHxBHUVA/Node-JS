const owner = require('../Model/OwnerSchema')

module.exports.addowner = async (req, res) => {
    try {
        const useremail = await owner.findOne({email: req.body.email})
        if(useremail){
            return res.status(400).json({message: "Email already exists"})
        }
        const Owner = await owner.create({})
        res.status(201).json({message: "Owner created successfully", Owner})
    } catch (error) {
        res.status(404).json({ success: false, message: error, })
    }
    
}