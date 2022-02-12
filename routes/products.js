const express = require('express');
const ProductsService = require('./../services/products');
const validatorHandler = require('./../middlewares/validator.hander');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/products.schemas');

const router = express.Router();
const service = new ProductsService();


router.get('/', (req, res) => {
    res.json([{
            name: 'producto 1',
            price: 200
        },
        {
            name: 'producto 2',
            price: 3000
        }
    ]);
});

// Si requieres colocar una url parecida con la de abajo de id, debe agregarse las no dinamicas (especifico) primero que las que son dinamicas.
router.get('/filter', (req, res) => {
    res.send('Prueba de filter');
})

// Utilizando el paq de faker-->
//http://localhost:3000/productosFaker
//http://localhost:3000/productosFaker?size=2
//http://localhost:3000/api/v1/productos/productosFaker
router.get('/productosFaker', async(req, res) => {
    const products = await service.find();
    res.json(products);
});

//http://localhost:3000/productos/34
router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async(req, res, next) => {

        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error);
        }

        /* if (id === '999') {
            res.status(404).json({
                message: 'Not found'
            })
        } else {
            res.status(200).json({
                id,
                name: 'producto 1',
                price: 2000
            })

        } */
    })

//POST: http://localhost:3000/api/v1/productos
router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async(req, res) => {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
        // res.status(201).json({
        // message: 'created',
        //     data: body
        // })
    })

//PATCH: http://localhost:3000/api/v1/productos/1
router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product);
        } catch (error) {
            next(error);
            /*  res.status(404).json({
                 message: error.message
             }); */
        }

        /* res.json(product);
          res.json({
              message: 'update patch',
              data: body,
              id
          }) */
    })

//Put: http://localhost:3000/api/v1/productos/1
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
    /*  res.json({
         message: 'update',
         data: body,
         id
     }) */
})

//DELETE: http://localhost:3000/api/v1/productos/1
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
    /*  res.json(rta);
       res.json({
           message: 'delete',
           id
       }) */
})



module.exports = router;
