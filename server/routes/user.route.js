/* tslint:disable */

var express = require('express');
var userCtrl = require('../controllers/user.controller');

var router = express.Router();
module.exports = router;

router.get('/region/:regionName/:user', userCtrl.getMember);
router.get('/zions/:zionId', userCtrl.getMembersByZion);
router.get('/zions/:zionId/shortDName', userCtrl.getMembersByZionWithShortDName);
router.get('/requested', userCtrl.getRequestedUsers);
router.post('/delete', userCtrl.deleteMember);
router.post('/move', userCtrl.moveMember);
router.post('/enabled', userCtrl.enableUser);
router.post('/addAuthorization', userCtrl.addAuthorization);
router.post('/removeAuthorization', userCtrl.removeAuthorization);
router.post('/:username/removeParticipant', userCtrl.removeParticipant);
router.put('/:username', userCtrl.updateUser);
router.delete('/requests/:username', userCtrl.deleteRequestByUsername);
