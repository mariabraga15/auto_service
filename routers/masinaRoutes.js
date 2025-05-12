const router = require('express').Router();
const masinaCtrl = require('../controllers/masinaController');
const rolesMiddleware = require('../middleware/rolesMiddleware');
const sanitizePagination = require('../middleware/sanitizePagination');

router.post('/', rolesMiddleware('admin', 'client'), masinaCtrl.addMasina);
router.get('/', rolesMiddleware('admin', 'client'), sanitizePagination, masinaCtrl.getMasini);
router.get('/:userId', rolesMiddleware('admin', 'client'), masinaCtrl.getMasiniByUser);

router.put('/:id', rolesMiddleware('admin', 'client'), masinaCtrl.updateMasina);
router.delete('/:id', rolesMiddleware('admin', 'client'), masinaCtrl.deleteMasina);

module.exports = router;
