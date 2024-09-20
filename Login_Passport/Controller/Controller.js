const Admin = require('../Model/Model')

module.exports.login = (req, res) => {
    try {
        res.render('Login')
    }catch(err) {
        console.log('Login Page Rendering Error..', err)
    }
}

module.exports.dashboard = (req, res) => {
    try {
        res.render('Dashboard')
    } catch (error) {
        console.log('Dashboard Rendering Error ', error)
    }
}

module.exports.form = (req, res) => {
    try {
       
         res.render('Form')
    } catch (error) {
        console.log('Form Rendering Error ', error)
    }
}

module.exports.table = async(req, res) => {
    try {
        const data = await Admin.find({})
        res.render('Table', {data})
    } catch (error) {
        console.log('Table Rendering Error ', error)
    }
}


module.exports.insert = async(req, res) => {
    try {
        const data = await Admin.create(req.body)        
        data ? res.render('Table') : console.log('Data Entry Error')
    } catch (error) {
        console.log("Insert Data Error", error)
    }
}
