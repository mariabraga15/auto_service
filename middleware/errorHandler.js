
module.exports = (err, req, res, next) => {
  console.error('Eroare:', err.message);
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: 'Eroare internă a serverului',
    message: err.message
  });
};
