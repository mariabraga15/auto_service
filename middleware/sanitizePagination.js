module.exports = (req, res, next) => {
    req.query.page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    req.query.limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
    req.query.sort = ['asc', 'desc'].includes(req.query.sort) ? req.query.sort : 'asc';
    next();
  };
  