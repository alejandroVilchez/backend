const router = require('express').Router();
const { createRegatta, listRegattas } = require('../controllers/regattaControllers');

router.post('/', createRegatta);
router.get('/', listRegattas);

module.exports = router;