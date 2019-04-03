/* tslint:disable */

var db = require('./db');
var _ = require('lodash');
var Academy = require('../models/academy.model');
var User = require('../models/user.model');

function addParticipant(req, res) {
  var username = req.params.username;
  var participantUsername = req.body.username;
  var participantDisplayName = req.body.displayName;
  var participant = Academy({ username: participantUsername });

  Academy.findOne({username: participantUsername}, function(err, user) {
    if (!err) {
      if (user) {
        User.findOne({ username: username }, function(err, user) {
          if (!err) {
            user.academyMembers.push({ displayName: participantDisplayName, username: participantUsername });

            user.save(function(err, user) {
              if (!err) {
                res.status(200).json({message: 'Successfully added participant.', academyMembers: user.academyMembers});
              }
            });
          }
        });
      } else {
        participant.save(function(err) {
          if (!err) {
            User.findOne({ username: username }, function(err, user) {
              if (!err) {
                user.academyMembers.push({ displayName: participantDisplayName, username: participantUsername });

                user.save(function(err, user) {
                  if (!err) {
                    res.status(200).json({message: 'Successfully added participant.', academyMembers: user.academyMembers});
                  }
                });
              }
            });
          } else {
            res.status(500).json({message: 'Error adding participant!'});
          }
        });
      }
    }
  });
}

function checkAttendance(req, res) {
  Academy.findOne({username: req.params.username}, function(err, user) {
    if (!err) {
      if (user) {
        user[req.params.subject].push(new Date());
        user.save(function(err) {
          if (!err) {
            res.status(200).json({message: 'Successfully add attendance.'});
          }
        })
      }
    }
  });
}

function deleteAttendance(req, res) {
  Academy.findOne({username: req.params.username}, function(err, user) {
    if (!err) {
      if (user) {
        user[req.params.subject].splice(req.body.datePos, 1);

        user.save(function(err) {
          if (!err) {
            res.status(200).json({message: 'Successfully delete attendance.'});
          }
        });
      }
    }
  });
}

function getAuthorizedList(req, res) {
  User.find({ roles: 'authorizedBibleTeacher' }, function (err, users) {
    if (!err) {
      if (users) {
        var authorizedList = [];

        for (var i = 0; i < users.length; i++) {
          if (users[i].roles && (users[i].roles.indexOf('authorizedBibleTeacher') > -1)) {
            authorizedList.push({
              displayName: users[i].firstName + ' ' + users[i].lastName,
              username: users[i].username,
              isAuthorized: true,
              zion: users[i].zion
            })
          }
        }

        res.json(authorizedList);
      }
    } else {
      res.status(500).json({message: 'Error finding users!'});
    }
  });
}

function getParticipantByUsername(req, res) {
  var username = req.params.username;

  Academy.findOne({username: username}, function(err, user) {
    if (!err) {
      res.json(user);
    } else {
      res.status(500).json({message: 'Error finding participant!'});
    }
  })
}

function getParticipantList(req, res) {
  var username = req.params.username;

  User.findOne({username: username}, function(err, user) {
    if (!err) {
      res.json(user.academyMembers);
    } else {
      res.status(500).json({message: 'Error adding participant!'});
    }
  })
}

module.exports = {
  addParticipant: addParticipant,
  deleteAttendance: deleteAttendance,
  checkAttendance: checkAttendance,
  getAuthorizedList: getAuthorizedList,
  getParticipantByUsername: getParticipantByUsername,
  getParticipantList: getParticipantList
};
