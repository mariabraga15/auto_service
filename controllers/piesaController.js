const { Piesa } = require('../models/index');

exports.addPiesa = async (req, res) => {
  try {
    const { nume, cod, pret } = req.body;

    if (!nume || typeof nume !== 'string') {
      return res.status(400).send('Numele piesei este obligatoriu si trebuie sa fie text.');
    }

    if (pret === undefined || isNaN(pret) || pret <= 0) {
      return res.status(400).send('Pretul trebuie sa fie un numar pozitiv.');
    }

    const piesa = await Piesa.create({ nume, cod, pret });
    res.status(201).json(piesa);
  } catch (err) {
    res.status(500).send('Eroare la adaugarea piesei: ' + err.message);
  }
};

exports.getPiese = async (req, res) => {
  try {
    const { page, limit, sort } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Piesa.findAndCountAll({
      limit,
      offset,
      order: [['nume', sort]]
    });

    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      results: rows
    });
  } catch (err) {
    res.status(500).send('Eroare la preluarea pieselor: ' + err.message);
  }
};

exports.updatePiesa = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Piesa.update(req.body, { where: { id } });
    if (updated === 0) return res.status(404).send('Piesa nu a fost gasita.');

    const piesa = await Piesa.findByPk(id);
    res.send(piesa);
  } catch (err) {
    res.status(500).send('Eroare la actualizare: ' + err.message);
  }
};

exports.deletePiesa = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Piesa.destroy({ where: { id } });
    if (deleted === 0) return res.status(404).send('Piesa nu a fost gasita.');

    res.send('Piesa stearsa cu succes');
  } catch (err) {
    res.status(500).send('Eroare la stergere: ' + err.message);
  }
};
