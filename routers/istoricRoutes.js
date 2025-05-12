const istoricRouter = require('express').Router();
const istoricCtrl = require('../controllers/istoricController');
const rolesMiddleware = require('../middleware/rolesMiddleware');
const sanitizePagination = require('../middleware/sanitizePagination');

istoricRouter.post('/', rolesMiddleware('admin'), istoricCtrl.createIstoric);
istoricRouter.get('/', rolesMiddleware('admin', 'client'), sanitizePagination, istoricCtrl.getIstoric);
istoricRouter.put('/:id', rolesMiddleware('admin'), istoricCtrl.updateIstoric);
istoricRouter.delete('/:id', rolesMiddleware('admin'), istoricCtrl.deleteIstoric);

module.exports = istoricRouter;
