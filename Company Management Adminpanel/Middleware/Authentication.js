const jwt = require('jsonwebtoken')
const owner = require('../Model/OwnerSchema')

const auth = async (req, res, next)=> {
    const key = req.header('Authorization')
    if(!key) return res.status(404).json({ success: false, message: 'Access denied. No token provided'})
        const token = key.slice(7, key.length)
        const decode = jwt.verify(token, 'admin')
        const own = await owner.findById(decode.id)
        req.user = decode
        next();
        
}

module.exports = auth