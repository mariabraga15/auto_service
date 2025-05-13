const {User,Masina,Istoric,Programare} = require('../models/index')

exports.createClient = async (req, res) => {
  try {
    const { nume, prenume, telefon, email, parola, rol } = req.body;

    
    if (!nume || !prenume || !telefon || !email || !parola || !rol) {
      return res.status(400).json({ error: 'Toate campurile sunt obligatorii' });
    }

    if (!/^[0-9]{10}$/.test(telefon)) {
      return res.status(400).json({ error: 'Telefonul trebuie să aibă 10 cifre' });
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ error: 'Email invalid' });
    }

    if (parola.length < 8) {
      return res.status(400).json({ error: 'Parola trebuie să aibă cel puțin 8 caractere' });
    }

    if (!['admin', 'client'].includes(rol)) {
      return res.status(400).json({ error: 'Rolul trebuie să fie "admin" sau "client"' });
    }

    
    const client = await User.create(req.body);
    res.status(201).json(client);
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

  
  exports.getAllClients = async (req, res) => {
  try {
    const { page, limit, sort } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where: { rol: 'client' },
      include: Masina,
      limit,
      offset,
      order: [['nume', sort], ['prenume', sort]]
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

  
  exports.getClientById = async (req, res) => {
    const client = await User.findByPk(req.params.id, { include: Masina });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  };
  
  exports.updateClient = async (req, res) => {
    const client = await User.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    await client.update(req.body);
    res.json(client);
  };
  
  exports.deleteClient = async (req, res) => {
    const client = await User.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    await client.destroy();
    res.json({ message: 'Client deleted' });
  };
  


