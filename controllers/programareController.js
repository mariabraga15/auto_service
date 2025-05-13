const { Programare, Masina} = require('../models/index');

exports.createProgramare = async (req, res) => {
  try {
    const {
      data,
      modalitateContact,
      actiune,
      ora, 
      masinaId
    } = req.body;

    
    if (!data || !modalitateContact || !actiune || !masinaId) {
      return res.status(400).json({ error: 'Data, modalitateContact, actiune și masinaId sunt obligatorii.' });
    }

    
    const dataObj = new Date(data);
    const azi = new Date();
    azi.setHours(0, 0, 0, 0);
    if (isNaN(dataObj) || dataObj < azi) {
      return res.status(400).json({ error: 'Data programării trebuie sa fie valida si in prezent sau viitor' });
    }

 
    const optiuniContact = ['email', 'telefon', 'in_persoana'];
    if (!optiuniContact.includes(modalitateContact)) {
      return res.status(400).json({ error: 'Modalitatea de contact trebuie sa fie: email, telefon sau in_persoana.' });
    }

    
    const prog = await Programare.create({
      data,
      modalitateContact,
      actiune,
      ora, 
      masinaId
    });

    res.status(201).json(prog);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

const { Programare } = require('../models');

exports.setOraProgramare = async (req, res) => {
  const { id } = req.params;
  const { ora } = req.body;

  try {
   
    if (!/^\d{2}:\d{2}$/.test(ora)) {
      return res.status(400).json({ error: 'Ora trebuie să fie în formatul HH:MM.' });
    }

    const [h, m] = ora.split(':').map(Number);
    const validSlots = [0, 30];

    if (h < 8 || h > 17 || !validSlots.includes(m) || (h === 17 && m > 0)) {
      return res.status(400).json({ error: 'Ora trebuie să fie între 08:00 și 17:00 în sloturi de 30 de minute.' });
    }

    const programare = await Programare.findByPk(id);
    if (!programare) {
      return res.status(404).json({ error: 'Programarea nu a fost găsită.' });
    }

    
    const existaConflict = await Programare.findOne({
      where: {
        data: programare.data,
        ora: ora
      }
    });

    if (existaConflict) {
      return res.status(409).json({ error: 'Există deja o programare la această oră.' });
    }

   
    programare.ora = ora;
    await programare.save();

    res.json({ message: 'Ora programării a fost setată.', programare });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
