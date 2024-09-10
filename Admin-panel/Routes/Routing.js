const express = require('express')
const routes = express.Router();
const controller = require('../Controller/Controller')

routes.get('/', controller.dashboard)

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

module.exports = routes