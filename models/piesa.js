const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Piese', {
    nume: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cod: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    pret: {
      type: DataTypes.FLOAT
    }
  }, {
    indexes: [
      { fields: ['cod'] },
      { fields: ['nume'] }
    ]
  });
