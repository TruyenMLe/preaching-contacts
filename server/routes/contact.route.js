/* tslint:disable */

var express = require('express');
var contactCtrl = require('../controllers/contact.controller');
var router = express.Router();

module.exports = router;

router.post('/', contactCtrl.getAllContacts);
router.post('/delete', contactCtrl.deleteContact);
router.post('/download', contactCtrl.downloadAllContacts);
router.post('/reference', contactCtrl.getReference);
router.post('/search', contactCtrl.searchContact);
router.post('/total', contactCtrl.getTotal);
router.put('/', contactCtrl.updateContact);

router.get('/preaching-festival/daily-total-people/:zionId', contactCtrl.getDailyTotalPeoplePreached);
router.get('/preaching-festival/daily-per-member/:username', contactCtrl.getDailyTotalPeoplePreachedPerMember);
router.get('/preaching-festival/total-people/:zionId', contactCtrl.getTotalPeoplePreached);
router.post('/preaching-festival', contactCtrl.addDailyContactNumber);
