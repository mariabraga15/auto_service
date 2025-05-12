const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Programari', {
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ora: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modalitateContact: {
      type: DataTypes.ENUM('email', 'telefon', 'in_persoana')
    },
    actiune: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [
      { fields: ['data'] },
      { fields: ['data', 'ora'] }, 
      { fields: ['modalitateContact'] }
    ]
  });
