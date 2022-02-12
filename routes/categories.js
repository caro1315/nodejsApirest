const express = require('express');
const faker = require('faker');

const router = express.Router();

// meotod Get
// Ejemplo: http://localhost:3000/categorias/5345/productos/3534
router.get('/:categoriaId/productos/:productoId', (req, res) => {
    const { categoriaId, productoId } = req.params;
    res.json({
        categoriaId,
        productoId
    })
})

module.exports = router;
