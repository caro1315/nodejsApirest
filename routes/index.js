const express = require('express');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router); // Crearmos un path global
    router.use('/productos', productsRouter);
    router.use('/categorias', categoriesRouter);
    router.use('/users', usersRouter);
}

module.exports = routerApi;
