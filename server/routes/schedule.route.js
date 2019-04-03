/* tslint:disable */

var express = require('express');
var scheduleCtrl = require('../controllers/schedule.controller');
var router = express.Router();

module.exports = router;

router.get('/:zion', scheduleCtrl.getScheduleByZion);
router.post('/', scheduleCtrl.addSchedule);
router.put('/:scheduleId', scheduleCtrl.updateScheduleById);
router.delete('/:scheduleId', scheduleCtrl.deleteScheduleById);
