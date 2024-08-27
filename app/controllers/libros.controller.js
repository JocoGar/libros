const db = require('../config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
    let libro = {};

    try {
        libro.nombre = req.body.nombre;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.pais_autor = req.body.pais_autor;
        libro.numero_pags = req.body.numero_pags;
        libro.anio = req.body.anio;
        libro.precio = req.body.precio;

        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con id = " + result.codigo,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el libro!",
            error: error.message
        });
    }
};

exports.retrieveAllLibros = (req, res) => {
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "¡Libros obtenidos exitosamente!",
                libros: libroInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los libros!",
                error: error
            });
        });
};

exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "Libro obtenido exitosamente con id = " + libroId,
                libro: libro
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener libro con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);
    
        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro para actualizar con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre: req.body.nombre,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                pais_autor: req.body.pais_autor,
                numero_pags: req.body.numero_pags,
                anio: req.body.anio,
                precio: req.body.precio
            }
            let result = await Libro.update(updatedObject, {returning: true, where: {codigo: libroId}});
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un libro con id = " + req.params.id,
                    error: "No se pudo actualizar el libro",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa de un libro con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un libro con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe el libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del libro con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un libro con id = " + req.params.id,
            error: error.message,
        });
    }
};
