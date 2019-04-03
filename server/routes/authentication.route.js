/* tslint:disable */

var express = require('express');
var authenticationCtrl = require('../controllers/authentication.controller');
var router = express.Router();

module.exports = router;

router.get('/languages', authenticationCtrl.getLanguageList);
router.post('/login', authenticationCtrl.login);
router.post('/password/reset', authenticationCtrl.resetPassword);
router.post('/reports', authenticationCtrl.makeReports);
router.post('/signup', authenticationCtrl.signup);
router.post('/submitForm', authenticationCtrl.submitForm);
