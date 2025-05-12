const {User,Masina} = require('../models/index')

exports.createClient = async (req, res) => {
    try {
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
  
