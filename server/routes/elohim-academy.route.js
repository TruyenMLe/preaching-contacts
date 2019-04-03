/* tslint:disable */

var express = require('express');
var elohimAcademyCtrl = require('../controllers/elohim-academy.controller');
var router = express.Router();

module.exports = router;

router.get('/authorizedList', elohimAcademyCtrl.getAuthorizedList);
router.get('/:username', elohimAcademyCtrl.getParticipantByUsername);
router.get('/:username/participantList', elohimAcademyCtrl.getParticipantList);
router.post('/:username/addParticipant', elohimAcademyCtrl.addParticipant);
router.post('/:username/checkAttendance/:subject', elohimAcademyCtrl.checkAttendance);
router.post('/:username/deleteAttendance/:subject', elohimAcademyCtrl.deleteAttendance);
