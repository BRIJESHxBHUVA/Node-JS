const jwt = require('jsonwebtoken')
const owner = require('../Model/OwnerSchema')


const auth = async (req, res, next)=> {

        try {
            
            const key = req.header('Authorization')
            if(!key) return res.status(404).json({ success: false, message: 'Access denied. No token provided'})
            const token = key.slice(7)
            const decode = jwt.verify(token, 'admin')
            console.log('Verification Token ===> ')
            console.log(decode)
            const own = await owner.findById(decode.user._id)
            console.log('own ===> ')
            console.log(own)
            if (!own) {
                return res.status(404).json({ success: false, message: 'Owner not found.' });
            }
            req.user = own
            next();

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
            }
            return res.status(401).json({ success: false, message: 'Invalid token.', error: error.message });
        }
        
}



module.exports = auth
