const { Istoric, Programare, Piesa } = require('../models/index');

exports.createIstoric = async (req, res) => {
  try {
    const istoric = await Istoric.create({
      ...req.body,
      ProgramareId: req.body.programareId
    });

    if (req.body.pieseIds?.length) {
      const piese = await Piesa.findAll({ where: { id: req.body.pieseIds } });
      await istoric.setPiese(piese);
    }

    res.status(201).json(istoric);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getIstoric = async (req, res) => {
  const istorice = await Istoric.findAll({ include: [Programare, Piesa] });
  res.json(istorice);
};

exports.updateIstoric = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Istoric.update(req.body, { where: { id } });

    if (updated === 0) {
      return res.status(404).send('Istoricul nu a fost gasit.');
    }

    const istoric = await Istoric.findByPk(id, { include: [Programare, Piesa] });
    res.json({ message: 'Istoric actualizat cu succes', istoric });
  } catch (err) {
    res.status(400).send('Eroare la actualizare: ' + err.message);
  }
};

exports.deleteIstoric = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Istoric.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).send('Istoricul nu a fost gasit.');
    }

    res.send('Istoric sters cu succes.');
  } catch (err) {
    res.status(500).send('Eroare la stergere: ' + err.message);
  }
};