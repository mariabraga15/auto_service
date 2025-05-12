const sequelize = require('../config/db');

const User = require('./user')(sequelize);
const Masina = require('./masina')(sequelize);
const Programare = require('./programare')(sequelize);
const Istoric = require('./istoric')(sequelize);
const Piesa = require('./piesa')(sequelize);


User.hasMany(Masina, { onDelete: 'CASCADE' });
Masina.belongsTo(User);

Masina.hasMany(Programare, { onDelete: 'CASCADE' });
Programare.belongsTo(Masina);

Programare.hasOne(Istoric, { onDelete: 'CASCADE' });
Istoric.belongsTo(Programare);

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
