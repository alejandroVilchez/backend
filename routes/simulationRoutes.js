const router = require('express').Router();
const { startRegattaSimulation, stopRegattaSimulation } = require('../controllers/simulationController');
const { authMiddleware } = require('../controllers/userController');  // si quieres auth

router.use(authMiddleware);

router.post('/:regattaId/simulate/start', startRegattaSimulation);
router.post('/:regattaId/simulate/stop',  stopRegattaSimulation);

module.exports = router;
