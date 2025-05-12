const router = require('express').Router();
const piesaCtrl = require('../controllers/piesaController');
const rolesMiddleware = require('../middleware/rolesMiddleware');
const sanitizePagination = require('../middleware/sanitizePagination');

router.post('/', rolesMiddleware('admin'), piesaCtrl.addPiesa);
router.get('/', rolesMiddleware('admin', 'client'), sanitizePagination, piesaCtrl.getPiese);
router.put('/:id', rolesMiddleware('admin'), piesaCtrl.updatePiesa);
router.delete('/:id', rolesMiddleware('admin'), piesaCtrl.deletePiesa);

module.exports = router;
