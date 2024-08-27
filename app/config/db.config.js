const env = require('./env.js');
const Sequelize = require('sequelize'); 
const { pool } = env; 

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    operatorAliases: false, 
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 


db.libros = require('../models/libros.model.js')(sequelize, Sequelize);
db.prestamos = require('../models/prestamos.model.js')(sequelize, Sequelize);


db.libros.hasMany(db.prestamos, { foreignKey: 'codigo' });
db.prestamos.belongsTo(db.libros, { foreignKey: 'codigo' });
module.exports = db;
