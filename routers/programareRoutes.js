const progRouter = require('express').Router();
const progCtrl = require('../controllers/programareController');
const rolesMiddleware = require('../middleware/rolesMiddleware')
const sanitizePagination = require('../middleware/sanitizePagination')
progRouter.post('/', rolesMiddleware('admin','client'),progCtrl.createProgramare);
progRouter.get('/',rolesMiddleware('admin','client') ,sanitizePagination, progCtrl.getProgramari);

module.exports = progRouter;