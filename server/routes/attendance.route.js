/* tslint:disable */

var express = require('express');
var attendanceCtrl = require('../controllers/attendance.controller');
var router = express.Router();

module.exports = router;

router.get('/codes', attendanceCtrl.getCodeList);
router.get('/categories', attendanceCtrl.getCategoryList);
router.get('/members', attendanceCtrl.getNewMemberList);
router.get('/services/:id', attendanceCtrl.getAllServicesAttended);
router.post('/codes/add', attendanceCtrl.addMemberCode);
router.post('/checkin/add', attendanceCtrl.checkMemberIn);
router.post('/members/add', attendanceCtrl.addNewMember);
router.post('/members/find', attendanceCtrl.findMember);
router.put('/username/:username', attendanceCtrl.updateAppId);
router.put('/services/:id', attendanceCtrl.updateServicesAttended);
router.delete('/members/:id', attendanceCtrl.removeNewMember);
