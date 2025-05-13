const sequelize = require('../config/db');

const User = require('./user')(sequelize);
const Masina = require('./masina')(sequelize);
const Programare = require('./programare')(sequelize);
const Istoric = require('./istoric')(sequelize);
const Piesa = require('./piesa')(sequelize);


User.hasMany(Masina, { onDelete: 'CASCADE' ,foreignKey:'userId'});
Masina.belongsTo(User,{foreignKey:'userId'});

Masina.hasMany(Programare, { onDelete: 'CASCADE',foreignKey:'masinaId' });
Programare.belongsTo(Masina,{foreignKey:'masinaId'});

Programare.hasOne(Istoric, { onDelete: 'CASCADE',foreignKey: 'programareId'  });
Istoric.belongsTo(Programare,{ foreignKey: 'programareId' });

Istoric.belongsToMany(Piesa, { through: 'IstoricPiese', as: 'piese' });
Piesa.belongsToMany(Istoric, { through: 'IstoricPiese', as: 'istorice' });

module.exports = {
  sequelize,
  User,
  Masina,
  Programare,
  Istoric,
  Piesa
};
