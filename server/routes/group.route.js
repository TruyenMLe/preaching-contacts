/* tslint:disable */

var express = require('express');
var groupCtrl = require('../controllers/group.controller');
var router = express.Router();

module.exports = router;

router.get('/', groupCtrl.getAllGroups);
router.get('/:zion', groupCtrl.getGroupZion);
router.get('/region/:regionName', groupCtrl.getGroupRegion);
router.get('/total/:regionName', groupCtrl.getGroupTotalRegion);
router.post('/', groupCtrl.addGroup);
router.post('/:groupId/contacts', groupCtrl.getGroupContacts);
router.post('/:groupId/contacts/search', groupCtrl.searchGroupContacts);
router.post('/:groupId/members', groupCtrl.getGroupMembers);
