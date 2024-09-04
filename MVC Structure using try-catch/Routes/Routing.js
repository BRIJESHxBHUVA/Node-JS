const express = require('express');
const routes = express.Router();
const controller = require('../Controller/Controller')

routes.get('/', controller.home)

routes.get('/about', controller.about)

routes.get('/gallery', controller.gallery)

routes.get('/blog', controller.blog)

routes.get('/contact', controller.contact)

module.exports = routes