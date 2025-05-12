const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'service_auto.sqlite'), 
  logging:false,
  define: {
    freezeTableName: true
  }
});

module.exports = sequelize;
