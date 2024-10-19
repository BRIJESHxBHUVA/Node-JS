const manager = require('../Model/ManagerSchema')
const jwt = require('jsonwebtoken')

const managerauth = async (req, res, next)=> {
    try {
        
        const key = req.header('Authorization')
            if(!key) return res.status(404).json({ success: false, message: 'Access denied. No token provided'})
            const token = key.slice(7)
            const decode = jwt.verify(token, 'admin')
            console.log('Manager Verification Token ===> ')
            console.log(decode)
            const mng = await manager.findById(decode.user._id)
            console.log('mng ===> ')
            console.log(mng)
            if (!mng) {
                return res.status(404).json({ success: false, message: 'Manager not found.' });
            }
            req.user = mng
            next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token.', error: error.message });
    }
}

module.exports = managerauth