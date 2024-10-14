const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const key = req.header('Authorization')
    if (!key) return res.status(401).json({message: 'Access denied. No token provided'})
    const token = key.splice(7, key.length)
    const decode = jwt.verify(token, 'admin');
    req.user = decode
    next();
}

module.exports = auth