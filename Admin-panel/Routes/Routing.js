const express = require('express')
const routes = express.Router();
const controller = require('../Controller/Controller')
const multer = require('multer');
const path = require('path');
const passport = require('../Server/Passport');
// const passport = require('passport')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'productimages/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const uploadpic = multer({storage : storage}).single('image')

routes.get('/', controller.login)

routes.post('/login', passport.authenticate("local", {failureRedirect: "/"}), controller.userlogin)

routes.post('/addproductdata', uploadpic, controller.addProduct)

routes.get('/delete', controller.deleteProduct)

routes.get('/edit', controller.editProduct)

routes.post('/editproductdata', uploadpic, controller.editedProduct)

// routes.get('/logout',   controller.userlogout)

// routes.get('/dashboard',controller.isAuthenticated, controller.dashboard)
routes.get('/dashboard', controller.dashboard)

// routes.get('/charts', controller.isAuthenticated, controller.charts)
routes.get('/charts', controller.charts)

// routes.get('/widgets',controller.isAuthenticated, controller.widgets)

routes.get('/tables', controller.tables)

routes.get('/grid', controller.grid)

routes.get('/form-basic', controller.formbasic)

routes.get('/form-wizard', controller.formwizard)

routes.get('/buttons', controller.buttons)

routes.get('/icon-material', controller.iconmaterial)

routes.get('/icon-fontawesome', controller.iconfontawesome)

routes.get('/pages-elements', controller.pageelement)

routes.get('/dashboard2', controller.dashboard2)

routes.get('/pages-gallery', controller.pagegallery)

routes.get('/pages-calendar', controller.pagecalendar)

routes.get('/pages-invoice', controller.pageinvoice)

routes.get('/pages-chat', controller.pagechat)

routes.get('/register', controller.register)

routes.get('/error-403', controller.error403)

routes.get("/error-404", controller.error404)

routes.get('/error-405', controller.error405)

routes.get('/error-500', controller.error500)

module.exports = routes