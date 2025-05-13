const { Masina, User } = require('../models/index');

exports.addMasina = async (req, res) => {
  try {
    const {
      marca,
      model,
      nrInmatriculare,
      serieSasiu,
      anFabricatie,
      motorizare,
      capacitateMotor,
      caiPutere,
      clientId
    } = req.body;

   
    if (!marca || !model || !nrInmatriculare || !serieSasiu || !clientId) {
      return res.status(400).json({ error: 'Marca, model, numar inmatriculare, serie sasiu si clientId sunt obligatorii!' });
    }

    if (!/^[A-Z0-9\-]+$/i.test(nrInmatriculare)) {
      return res.status(400).json({ error: 'Numar de înmatriculare invalid' });
    }

    if (anFabricatie && (anFabricatie < 1900 || anFabricatie > new Date().getFullYear())) {
      return res.status(400).json({ error: 'An de fabricație invalid.' });
    }

    if (motorizare && !['diesel', 'benzina', 'hibrid', 'electric'].includes(motorizare)) {
      return res.status(400).json({ error: 'Tip motorizare invalid.' });
    }

    if (capacitateMotor && capacitateMotor <= 0) {
      return res.status(400).json({ error: 'Capacitatea motorului trebuie să fie pozitivă.' });
    }

    if (caiPutere && caiPutere <= 0) {
      return res.status(400).json({ error: 'Caii putere trebuie să fie pozitivi.' });
    }

    const masina = await Masina.create({
      marca,
      model,
      nrInmatriculare,
      serieSasiu,
      anFabricatie,
      motorizare,
      capacitateMotor,
      caiPutere,
      userId: clientId 
    });

    res.status(201).json(masina);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getMasini = async (req, res) => {
  const masini = await Masina.findAll({ include: User });
  res.json(masini);
};

exports.getMasiniByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const masini = await Masina.findAll({
      where: { UserId: userId },
      
    });

    res.json(masini);
  } catch (err) {
    res.status(500).send('Eroare la preluarea masinilor: ' + err.message);
  }
};


exports.updateMasina = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Masina.update(req.body, { where: { id } });

    if (updated === 0) {
      return res.status(404).json({ error: 'Masina nu a fost gasita' });
    }

    const masina = await Masina.findByPk(id);
    res.json({ message: 'Masina actualizata cu succes', masina });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMasina = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Masina.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Masina nu a fost gasita' });
    }

    res.json({ message: 'Masina stearsa cu succes' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
