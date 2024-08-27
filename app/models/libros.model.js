module.exports = (sequelize, Sequelize) => {

        const Libro = sequelize.define("libro", {
            codigo: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: Sequelize.STRING
            },
            editorial: {
                type: Sequelize.STRING
            },
            autor: {
                type: Sequelize.STRING
            },
            
            genero: {
                type: Sequelize.STRING
            },
            pais_autor:{
                type: Sequelize.STRING
            },
            numero_pags: {
                type: Sequelize.INTEGER
            },
            anio:{
                type: Sequelize.INTEGER
            },
            precio:{
                type: Sequelize.FLOAT
            }
        });
        return Libro;
    };