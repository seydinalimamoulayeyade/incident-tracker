const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/incident.controller');

router.get('/',     controller.getAllIncidents);
router.get('/:id',  controller.getIncidentById);
router.post('/',    controller.createIncident);
router.patch('/:id', controller.updateIncident);
router.delete('/:id', controller.deleteIncident);

module.exports = router;