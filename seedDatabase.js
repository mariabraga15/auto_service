const { sequelize, User, Masina, Programare, Istoric, Piesa } = require('./models');
const bcrypt = require('bcrypt');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Baza de date resetata cu ORM');

    const password = await bcrypt.hash('parola123', 10);

    const [user1, user2, user3] = await Promise.all([
      User.create({ nume: 'Popescu', prenume: 'Ion', telefon: '0711111111', email: 'ion@example.com', parola: password, rol: 'client' }),
      User.create({ nume: 'Braga', prenume: 'Maria', telefon: '0722222222', email: 'maria@example.com', parola: password, rol: 'admin' }),
      User.create({ nume: 'Dumitrescu', prenume: 'Radu', telefon: '0733333333', email: 'radu@example.com', parola: password, rol: 'client' }),
    ]);

    const [masina1, masina2, masina3] = await Promise.all([
      user1.createMasini({ nrInmatriculare: 'B123XYZ', serieSasiu: 'ABC123XYZ0001', marca: 'Dacia', model: 'Logan', anFabricatie: 2015, motorizare: 'benzina', capacitateMotor: 1400, caiPutere: 90 }),
      user2.createMasini({ nrInmatriculare: 'IF98QWE', serieSasiu: 'XYZ456IF0002', marca: 'Toyota', model: 'Corolla', anFabricatie: 2018, motorizare: 'hibrid', capacitateMotor: 1800, caiPutere: 122 }),
      user3.createMasini({ nrInmatriculare: 'CJ07MEC', serieSasiu: 'ZZZ789CJ0003', marca: 'Opel', model: 'Astra', anFabricatie: 2016, motorizare: 'diesel', capacitateMotor: 1600, caiPutere: 110 }),
    ]);

    const [p1, p2, p3, p4] = await Promise.all([
      Piesa.create({ nume: 'Filtru ulei', cod: 'U001', pret: 35 }),
      Piesa.create({ nume: 'Filtru aer', cod: 'A002', pret: 45 }),
      Piesa.create({ nume: 'Bujii', cod: 'B003', pret: 60 }),
      Piesa.create({ nume: 'Placute frana', cod: 'F004', pret: 100 }),
    ]);

    const prog1 = await Programare.create({
      masinaId: masina1.id,
      data: '2025-05-10',
      ora: '09:30',
      modalitateContact: 'telefon',
      actiune: 'Revizie completa',
    });

    const prog2 = await Programare.create({
      masinaId: masina2.id,
      data: '2025-05-11',
      ora: '10:30',
      modalitateContact: 'email',
      actiune: 'Verificare sistem franare',
    });

    const prog3 = await Programare.create({
      masinaId: masina3.id,
      data: '2025-05-12',
      ora: '11:00',
      modalitateContact: 'telefon',
      actiune: 'Diagnoza motor',
    });

    const ist1 = await Istoric.create({
      programareId: prog1.id,
      problemeVizuale: 'zgarieturi usoare',
      interventii: 'schimb ulei, filtru ulei si aer',
      durataReparatie: 60,
    });
    await ist1.setPiese([p1, p2]);

    const ist2 = await Istoric.create({
      programareId: prog2.id,
      problemeVizuale: 'placute uzate',
      interventii: 'inlocuire placute frana',
      durataReparatie: 50,
    });
    await ist2.setPiese([p4]);

    const ist3 = await Istoric.create({
      programareId: prog3.id,
      problemeVizuale: 'motor tremura la ralanti',
      interventii: 'inlocuire bujii',
      durataReparatie: 70,
    });
    await ist3.setPiese([p3]);

    console.log('Populare a bazei de date cu ORM finalizata cu succes');
    process.exit();
  } catch (err) {
    console.error('Eroare la populare baza de date cu ORM:', err);
    process.exit(1);
  }
};

seed();
