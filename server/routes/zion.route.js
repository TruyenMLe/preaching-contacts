/* tslint:disable */

var express = require('express');
var zionCtrl = require('../controllers/zion.controller');
var router = express.Router();

module.exports = router;

router.get('/', zionCtrl.getAllZions);
router.get('/leaders/account', zionCtrl.getZionLeaderAccount);
router.post('/:zion/contacts', zionCtrl.getZionContacts);
router.post('/:zion/contacts/search', zionCtrl.searchZionContacts);
