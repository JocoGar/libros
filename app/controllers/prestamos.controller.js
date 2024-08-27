const db = require('../config/db.config.js');
const Prestamo = db.prestamos;
const Libro = db.libros;  

exports.create = async (req, res) => {
    try {
        const { codigo, cod_usuario, fechasalida, fechamax, fechadevolucion } = req.body;

        // Verificar si el libro con el código proporcionado existe
        const libro = await Libro.findByPk(codigo);
        if (!libro) {
            return res.status(400).json({
                message: "El libro con el código proporcionado no existe.",
            });
        }

        // Crear el nuevo préstamo
        const prestamo = await Prestamo.create({
            codigo,
            cod_usuario,
            fechasalida,
            fechamax,
            fechadevolucion
        });

        res.status(200).json({
            message: "Préstamo creado exitosamente",
            prestamo: prestamo
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el préstamo!",
            error: error.message
        });
    }
};

exports.retrieveAllPrestamos = (req, res) => {
    Prestamo.findAll()
        .then(prestamoInfos => {
            res.status(200).json({
                message: "¡Préstamos obtenidos exitosamente!",
                prestamos: prestamoInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los préstamos!",
                error: error.message
            });
        });
};

exports.getPrestamoById = (req, res) => {
    const prestamoId = req.params.id;
    Prestamo.findByPk(prestamoId)
        .then(prestamo => {
            if (prestamo) {
                res.status(200).json({
                    message: "Préstamo obtenido exitosamente con id = " + prestamoId,
                    prestamo: prestamo
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el préstamo con id = " + prestamoId
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener el préstamo con id!",
                error: error.message
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        const prestamoId = req.params.id;
        const { codigo, cod_usuario, fechasalida, fechamax, fechadevolucion } = req.body;

        // Verificar si el préstamo existe
        const prestamo = await Prestamo.findByPk(prestamoId);
        if (!prestamo) {
            return res.status(404).json({
                message: "No se encontró el préstamo para actualizar con id = " + prestamoId,
            });
        }

        // Verificar si el libro con el código proporcionado existe
        const libro = await Libro.findByPk(codigo);
        if (!libro) {
            return res.status(400).json({
                message: "El libro con el código proporcionado no existe.",
            });
        }

        // Actualizar el préstamo
        const updatedObject = {
            codigo,
            cod_usuario,
            fechasalida,
            fechamax,
            fechadevolucion
        };
        const result = await Prestamo.update(updatedObject, { returning: true, where: { numero_pedido: prestamoId } });

        if (result[0] === 0) {
            return res.status(500).json({
                message: "No se pudo actualizar el préstamo con id = " + prestamoId,
            });
        }

        res.status(200).json({
            message: "Actualización exitosa del préstamo con id = " + prestamoId,
            prestamo: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el préstamo con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const prestamoId = req.params.id;
        const prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            return res.status(404).json({
                message: "No existe el préstamo con id = " + prestamoId
            });
        }

        await prestamo.destroy();
        res.status(200).json({
            message: "Eliminación exitosa del préstamo con id = " + prestamoId,
            prestamo: prestamo
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el préstamo con id = " + req.params.id,
            error: error.message
        });
    }
};
