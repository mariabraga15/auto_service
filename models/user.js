const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Users', {
    nume: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenume: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activ: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    parola: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    rol:{
        type:DataTypes.ENUM('admin','client'),
        allowNull:false
    }
  }, {
    indexes: [
      { fields: ['telefon'] },
      { fields: ['email'] },
      { fields:['rol'] }
    ]    
  }, {
  defaultScope: {
    attributes: { exclude: ['parola'] }
  },
  indexes: [
    { fields: ['telefon'] },
    { fields: ['email'] },
    { fields: ['rol'] }
  ]
});
};
