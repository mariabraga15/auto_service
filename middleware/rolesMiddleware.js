const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecret';

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(403).json({ error: 'Ruta este protejata' });

    try {
      const decoded = jwt.verify(token, SECRET);
      if (!allowedRoles.includes(decoded.rol)) {
        return res.status(403).json({ error: 'Acces interzis pentru rolul curent' });
      }

      req.user = decoded; // optional, pentru acces ulterior
      next();
    } catch (err) {
      res.status(403).json({ error: 'Token invalid' });
    }
  };
};
