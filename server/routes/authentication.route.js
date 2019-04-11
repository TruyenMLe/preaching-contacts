/* tslint:disable */

var express = require('express');
var authenticationCtrl = require('../controllers/authentication.controller');
var router = express.Router();
var expressJwt = require('express-jwt');
var fs = require('fs');
var RSA_PUBLIC_KEY = fs.readFileSync('./server/config/jwtRS256.key.pub');
var checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY,
  getToken: function fromHeaderOrQuerystring (req) {
    return req.cookies.SESSIONID;
  }
});

module.exports = router;

router.get('/languages', authenticationCtrl.getLanguageList);
router.post('/login', authenticationCtrl.login);
router.post('/password/reset', authenticationCtrl.resetPassword);
router.post('/reports', authenticationCtrl.makeReports);
router.post('/signup', authenticationCtrl.signup);
router.post('/submitForm', checkIfAuthenticated, authenticationCtrl.submitForm);
