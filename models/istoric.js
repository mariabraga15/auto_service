const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Istoric', {
      
    problemeVizuale: {
      type: DataTypes.TEXT
    },
    interventii: {
      type: DataTypes.TEXT
    },
    durataReparatie: {
      type: DataTypes.INTEGER
    }
  }, {
    indexes: [
      { fields: ['durataReparatie'] }
    ],
    
  });
