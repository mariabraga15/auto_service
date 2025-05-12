const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Masini', {
    nrInmatriculare: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    serieSasiu: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anFabricatie: {
      type: DataTypes.INTEGER
    },
    motorizare: {
      type: DataTypes.ENUM('diesel', 'benzina', 'hibrid', 'electric')
    },
    capacitateMotor: {
      type: DataTypes.INTEGER
    },
    caiPutere: {
      type: DataTypes.INTEGER
    },
    kwPutere: {
      type: DataTypes.INTEGER,
      get() {
        const cai = this.getDataValue('caiPutere');
        return cai ? Math.round(cai * 0.7355) : null;
      }
    }
  }, {
    indexes: [
      { fields: ['nrInmatriculare'] },
      { fields: ['serieSasiu'] }
    ]
  });
