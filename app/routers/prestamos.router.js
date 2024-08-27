const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamos.controller.js');

router.post('/api/prestamos/create', prestamoController.create);
router.get('/api/prestamos/all', prestamoController.retrieveAllPrestamos);
router.get('/api/prestamos/onebyid/:id', prestamoController.getPrestamoById);
router.put('/api/prestamos/update/:id', prestamoController.updateById);
router.delete('/api/prestamos/delete/:id', prestamoController.deleteById);

module.exports = router;
