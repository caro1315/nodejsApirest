const express = require('express');
const faker = require('faker');

const router = express.Router();

// Utilizamos query parems
// Ejemplo: http://localhost:3000/users?limit=300&offset=2
router.get('/', (req, res) => {
    const { limit, offset } = req.query; // estos son opcionales
    if (limit && offset) {
        res.json({
            limit, // Limite de datos por ver
            offset // Para la paginacion
        })
    } else {
        res.send('No hay ningun valor');
    }
})

module.exports = router;
