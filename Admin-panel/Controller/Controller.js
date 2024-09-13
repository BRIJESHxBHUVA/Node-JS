const Modal = require('../Model/Model')

module.exports.userlogin = async(req, res) => {
    try {
        console.log(req.body)
        let userdata = await Modal.findOne({email: req.body.email})

       console.log(userdata)
        
        if( userdata.password == req.body.password){
            res.cookie('Admin', userdata)
            res.redirect('/dashboard')
        }
        else{
            res.redirect('/')
        }
    }catch(err) {
        console.log(err)
    }
}

module.exports.dashboard = async(req, res)=>{
    try {
        if(req.cookies.Admin == undefined){
            return res.redirect("/")
        }
        else{
            let admindata =  await Modal.findById(req.cookies.Admin._id)
            console.log(admindata);
            if(admindata){
                res.render('Dashboard')
            }else{
                res.redirect("/")
            }
            
        }
    } catch (error) {
        console.log("Error rendering dashboard: ", error);
    }
   
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

module.exports.dashboard2 = (req, res)=>{
    res.render('Dashboard-2')
}

module.exports.pagegallery = (req, res)=>{
    res.render('Pages-gallery')
}

module.exports.pagecalendar = (req, res)=>{
    res.render('Pages-calendar')
}

module.exports.pageinvoice = (req, res)=>{
    res.render('Pages-invoice')
}

module.exports.pagechat = (req, res)=>{
    res.render('Pages-chat')
}

module.exports.login = (req, res)=>{
    res.render('Authentication-login')
}

module.exports.register = (req, res)=>{
    res.render('Authentication-register')
}

module.exports.error403 = (req, res)=>{
    res.render('Error-403')
}

module.exports.error404 = (req, res)=>{
    res.render('Error-404')
}

module.exports.error405 = (req, res)=>{
    res.render('Error-405')
}

module.exports.error500 = (req, res)=>{
    res.render('Error-500')
}
