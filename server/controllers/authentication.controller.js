/* tslint:disable */

var db = require('./db');
var _ = require('lodash');
var uuid = require('node-uuid');
var Group = require('../models/group.model');
var User = require('../models/user.model');

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
          res.status(200).json({
            message: 'Account is already set up. Waiting for authorization!',
            messageCode: 'disabled'
          });
        } else {
          var uid = user._doc.username;
          var returnedUser = {
            firstName: user._doc.firstName,
            middleName: user._doc.middleName,
            lastName: user._doc.lastName,
            nickName: user._doc.nickName,
            username: user._doc.username,
            region: user._doc.region,
            zion: user._doc.zion,
            language: user._doc.language,
            groupId: user._doc.groupId,
            roles: user._doc.roles,
            acceptedPolicy: user._doc.acceptedPolicy,
            acceptedPolicyDate: user._doc.acceptedPolicyDate,
            academyMembers: user._doc.academyMembers,
            appId: user._doc.appId
          };
          res.json(returnedUser);
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

module.exports = {
  getLanguageList: getLanguageList,
  login: login,
  makeReports: makeReports,
  resetPassword: resetPassword,
  signup: signup,
  submitForm: submitForm
};
