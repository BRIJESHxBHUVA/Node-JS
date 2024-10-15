const owner = require('../Model/OwnerSchema')

module.exports.getowner = async (req, res)=> { 
    try {
        const data = await owner.find({}) 
        res.status(205).json({ message: 'Data get successfully', data: data })

        if(data.length <= 0) {
            res.status(300).json({success: false, message: 'Data not found'})
        }
        console.log(data)
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
        const data = await owner.create(req.body)
        res.status(201).json({message: "Owner created successfully", data})
    } catch (error) {
        res.status(404).json({ success: false, message: error, })
    }
    
}


module.exports.deleteowner = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(404).json({ success: false, message: error, })
    }
}