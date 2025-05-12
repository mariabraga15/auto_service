const router = require('express').Router();
const clientCtrl = require('../controllers/userController');
const rolesMiddleware = require('../middleware/rolesMiddleware')
const sanitizePagination = require('../middleware/sanitizePagination')
router.post('/', rolesMiddleware('admin'),clientCtrl.createClient);
router.get('/', rolesMiddleware('admin'),sanitizePagination,clientCtrl.getAllClients);
router.get('/:id',rolesMiddleware('admin','client') ,clientCtrl.getClientById);
router.put('/:id', rolesMiddleware('admin'), clientCtrl.updateClient);
router.delete('/:id',rolesMiddleware('admin'),clientCtrl.deleteClient);
module.exports = router;
