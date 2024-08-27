module.exports = (sequelize, Sequelize) => {

    const Prestamo = sequelize.define("prestamo", {
        numero_pedido: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        codigo: {
            type: Sequelize.INTEGER,
            references: {
                model: 'libros',
                key: 'codigo'
            }
        },
        cod_usuario: {
            type: Sequelize.INTEGER
        },
        fechasalida: {
            type: Sequelize.STRING
        },
        
        fechamax: {
            type: Sequelize.STRING
        },
        fechadevolucion:{
            type: Sequelize.STRING
        },
    });
    return Prestamo;
};