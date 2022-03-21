const Router = require('express');
const router = new Router();
const scheduleController = require('../controllers/schedule-controller.js');

router.get('/schedule', scheduleController.getSchedule);

module.exports = router;
