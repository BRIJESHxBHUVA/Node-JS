module.exports.home = (req, res)=>{
    res.render('Tutorial')
}

module.exports.about = (req, res)=>{
    res.render('About')
}

module.exports.gallery = (req, res)=>{
    res.render('Gallery')
}

module.exports.blog = (req, res)=>{
    res.render('Blog')
}

module.exports.contact = (req, res)=>{
    res.render('Contact')
}