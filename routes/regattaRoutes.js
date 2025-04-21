const router = require('express').Router();
const { createRegatta, listRegattas } = require('../controllers/regattaControllers');
const { authMiddleware } = require('../controllers/userController');

router.use(authMiddleware);
router.post('/', createRegatta);
router.get('/', listRegattas);

module.exports = router;