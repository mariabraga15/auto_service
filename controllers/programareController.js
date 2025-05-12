const { Programare, Masina } = require('../models/index');

exports.createProgramare = async (req, res) => {
  try {
    const prog = await Programare.create({ ...req.body, MasinaId: req.body.masinaId });
    res.status(201).json(prog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProgramari = async (req, res) => {
  try {
    const { page, limit, sort } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Programare.findAndCountAll({
      include: Masina,
      order: [['data', sort], ['ora', sort]],
      limit,
      offset
    });

    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      results: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateProgramare = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Programare.update(req.body, { where: { id } });

    if (updated === 0) {
      return res.status(404).json({ error: 'Programarea nu a fost gasita' });
    }

    const programare = await Programare.findByPk(id, { include: Masina });
    res.json({ message: 'Programare actualizata cu succes', programare });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProgramare = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Programare.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Programarea nu a fost gasita' });
    }

    res.json({ message: 'Programare stearsa cu succes' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
