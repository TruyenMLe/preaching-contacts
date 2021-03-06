/* tslint:disable */

var db = require('./db');
var _ = require('lodash');
var uuid = require('node-uuid');
var Group = require('../models/group.model');
var User = require('../models/user.model');
var Token = require('../models/token.model');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwtDecode = require('jwt-decode');
var config = require('../config/config');

var RSA_PRIVATE_KEY = fs.readFileSync('./server/config/jwtRS256.key');

function getLanguageList(req, res) {
  db.collection('languages').find({})
    .sort({ languageName: 1 })
    .toArray()
    .then(function(data) {
      res.json(data);
    });
}

function login(req, res) {
  //remove whitespaces and make username all lowercase
  req.body.username = req.body.username.toLowerCase().replace(/\s+/g, '');

  User.findOne({ username: req.body.username }, function (err, user) {
    if (!err) {
      if (!user || !user.authenticate(req.body.password)) {
        res.status(404).json({message: 'Username or password is invalid!'});
      } else {
        if (user._doc.restricted) {
          res.status(500).json({message: 'User is restricted. Unable to login!', messageCode: 'restricted'});
        } else if (user._doc.disabled) {
          res.status(500).json({
            message: 'Account is already set up. Waiting for authorization!',
            messageCode: 'disabled'
          });
        } else {
          var userId = user._doc.username;

          Token.findOne({username: userId}, function(err, existingToken) {
            if (!err) {
              const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 7200, // 2 hours
                subject: userId
              });

              res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:config.env === 'production'});

              if (!existingToken) {

                var token = new Token({username: userId, sessionId: jwtBearerToken, status: 'active'});

                token.save(function(err, newToken) {
                  if (!err) {
                    if (newToken) {
                      res.status(200).json({message: 'Successfully login.'});
                    }
                  } else {
                    res.status(500).json({message: 'Error saving token.'});
                  }
                });
              } else {
                var decoded = jwtDecode(existingToken.sessionId);

                if (decoded.exp < ((new Date()).getTime() / 1000)) {
                  existingToken.sessionId = jwtBearerToken;

                  existingToken.save(function(err) {
                    if (!err) {
                      res.status(200).json({message: 'Successfully login.'});
                    } else {
                      res.status(500).json({message: 'Error saving token.'});
                    }
                  });
                } else {
                  res.status(200).json({message: 'Successfully login.'});
                }
              }
            } else {
              res.status(500).json({message: 'Error finding token.'});
            }
          });
        }
      }
    } else {
      res.status(500).json({message: 'Error finding users!'});
    }
  });
}

function resetPassword(req, res) {
  var queryObject = {
    zion: req.body.zion,
    groupId: req.body.groupId,
    username: req.body.username.toLowerCase()
  };

  User.findOne(queryObject, function(err, user) {
    if (!err) {
      if (user) {
        user.password = req.body.password;

        user.save(function(err) {
          if (err) {
            res.status(500).json({message: 'Error resetting password!'});
          } else {
            res.status(200).json({message: 'Successfully resetting password!'});
          }
        });
      } else {
        res.status(404).json({message: 'No matching user found!'});
      }
    } else {
      res.status(500).json(err);
    }
  });
}

function signup(req, res) {

  //remove whitespaces and make username all lowercase
  req.body.username = req.body.username.toLowerCase().replace(/\s+/g, '');

  //remove unnecessary confirm password
  delete req.body.confirmPassword;

  var member = req.body.username;

  User.findOne({ username: req.body.username }, function (err, existedUser) {
    if (!err) {
      if (!existedUser) {
        var newUser = User(req.body);

        newUser.save(function (err) {
          Group.findOne({groupId: req.body.groupId}, function(err, existedGroup) {
            if (!err) {
              if (existedGroup) {
                existedGroup.members.push(member);
                existedGroup.totalMember++;

                existedGroup.save(function () {
                  res.status(200).json({
                    message: 'Account is already set up. Waiting for authorization!'
                  });
                });
              } else {
                res.status(404).json({message: 'Selected group doesn\'t exist!'});
              }
            } else {
              res.status(500).json({message: 'Error finding existing group!'});
            }
          });
        });
      } else {
        res.status(500).json({
          message: 'User with username ' + req.body.username + ' already exists. Please choose another one!'
        });
      }
    } else {
      res.status(500).json({message: 'Error finding existing user!'});
    }
  });
}

function submitForm(req, res) {
  var groupId = req.body.groupId,
    preachLongEnough = req.body.preachLongEnough === 'Yes',
    hasContact = req.body.phoneNumber || req.body.emailAddress;

  req.body.contactId = uuid.v4();

  if (hasContact || preachLongEnough) {
    req.body.qualified = true;
  }

  db.collection(req.body.zion)
    .insert(req.body, function(err, result) {
      console.log('Inserted a document into the contact collection.');

      if (hasContact || preachLongEnough) {
        Group.findOne({groupId: groupId}, function (err, existedGroup) {
          if (!err) {
            if (existedGroup) {
              existedGroup.totalContact++;

              existedGroup.save(function () {
                res.sendStatus(200);
              });
            } else {
              res.json({message: 'Selected group doesn\'t exist!'});
            }
          } else {
            res.status(500).json({message: 'Error finding existing group!'});
          }
        });
      } else {
        res.sendStatus(200);
      }
    });
}

function makeReports(req, res) {
  var zion = req.body.zion,
    username = req.body.username,
    startDate = new Date(req.body.startDate).toISOString(),
    endDate = new Date(req.body.endDate).toISOString();

  var contactCursor = db.collection(zion).find({
    username: username,
    preachDate: {$gte: startDate, $lte: endDate}
  });

  contactCursor
    .sort({ _id: 1 })
    .toArray()
    .then(function(data) {
      res.json(data);
    });
}

function validateAdmin(req, res) {
  var decoded = jwtDecode(req.cookies.SESSIONID);

  User.findOne({ username: decoded.sub }, function (err, existedUser) {
    if (!err) {
      var isAdmin = existedUser.roles.indexOf('admin') > -1;

      if (isAdmin) {
        res.status(200).json({valid: true});
      } else {
        res.status(500).json({message: 'User is not an administrator'});
      }
    } else {
      res.status(500).json({message: 'Error finding existing user!'});
    }
  });
}

function validateSession(req, res) {
  var decoded = jwtDecode(req.cookies.SESSIONID);

  Token.findOne({username: decoded.sub}, function(err, token) {
    if (!err) {
      if (token && token.status === 'active') {
        res.status(200).json({valid: true});
      } else {
        res.status(500).json({message: 'Token is current not active. Please contact administrator for more information.'});
      }
    } else {
      res.status(500).json({message: 'Error validating user token.'});
    }
  });
}

function deleteSession(req, res) {
  var decoded = jwtDecode(req.cookies.SESSIONID);

  Token.findOneAndDelete({username: decoded.sub}, function(err) {
    if (!err) {
      res.status(200).json({message: 'Successfully removed current session.'});
    } else {
      res.status(500).json({message: 'Error clearing current session.'});
    }
  })
}

module.exports = {
  deleteSession: deleteSession,
  getLanguageList: getLanguageList,
  login: login,
  makeReports: makeReports,
  resetPassword: resetPassword,
  signup: signup,
  submitForm: submitForm,
  validateAdmin: validateAdmin,
  validateSession: validateSession
};
