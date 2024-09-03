module.exports.home = (req, res)=> { 
    res.render('Tutorial')
}

module.exports.product = (req, res)=> {
    res.render('Product')
}

module.exports.cart = (req, res)=> {
    res.render('Cart')
}