module.exports.dashboard = (req, res)=>{
    res.render('Dashboard')
}

module.exports.charts = (req, res)=>{
    res.render('Charts')
}

module.exports.widgets = (req, res)=>{
    res.render('Widgets')
}

module.exports.tables = (req, res)=>{
    res.render('Tables')
}

module.exports.grid = (req, res)=>{
    res.render('Grid')
}

module.exports.formbasic = (req, res)=>{
    res.render('Form-basic')
}

module.exports.formwizard = (req, res)=> {
    res.render('Form-wizard')
}

module.exports.buttons = (req, res)=>{
    res.render('Page-buttons')
}

module.exports.iconmaterial = (req, res)=>{
    res.render('Icon-material')
}

module.exports.iconfontawesome = (req, res)=>{
    res.render('Icon-fontawesome')
}

module.exports.pageelement = (req, res)=>{
    res.render('Page-element')
}