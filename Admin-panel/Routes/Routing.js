const express = require('express')
const routes = express.Router();
const controller = require('../Controller/Controller')

routes.post('/login', controller.userlogin)

routes.get('/dashboard', controller.dashboard)

routes.get('/charts', controller.charts)

routes.get('/widgets', controller.widgets)

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

routes.get('/', controller.login)

routes.get('/register', controller.register)

routes.get('/error-403', controller.error403)

routes.get("/error-404", controller.error404)

routes.get('/error-405', controller.error405)

routes.get('/error-500', controller.error500)

console.log(controller.register.data)

module.exports = routes