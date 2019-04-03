/* tslint:disable */
var db = require('./db');
var _ = require('lodash');
var uuid = require('node-uuid');
var Attendance = require('../models/attendance.model');
var AttendanceMember = require('../models/attendance-member.model');
var MemberCode = require('../models/member-code.model');
var User = require('../models/user.model');

function addMemberCode(req, res) {
  var newMemberCode = new MemberCode(req.body);

  MemberCode.findOne({appId: req.body.appId}, function(err, code) {
    if (!err) {
      if (code) {
        res.status(500).json({message: 'Code already used by another member.'});
      } else {
        newMemberCode.save(function(err, updatedCode) {
          if (!err) {
            res.status(200).json({message: 'Successfully added new member code'});
          } else {
            res.status(500).json({message: 'Error adding new member code.'});
          }
        });
      }
    } else {
      res.status(500).json({message: 'Error adding new member code.'});
    }
  });
}

function addNewMember(req, res) {
  var newMember = new AttendanceMember(req.body);

  newMember.save(function(err, member) {
    if (!err) {
      res.status(200).json({message: 'Successfully added new member'});
    } else {
      res.status(500).json({message: 'Error adding new member.'});
    }
  });
}

function checkMemberIn(req, res) {
  var newAppId = req.body.appId;
  var newAppPicture = req.body.picture;
  var newAppServiceTime = req.body.serviceTime;
  var newAppIsPartial = req.body.isPartial;
  var newAppUid = req.body.uid;

  Attendance.findOne({ appId: newAppId }, function(err, attendance) {
    if (!err) {
      if (attendance) {
        attendance.serviceAttended.push({
          time: new Date(), picture: newAppPicture, serviceTime: newAppServiceTime,
          isPartial: newAppIsPartial, uid: newAppUid
        });

        attendance.save(function(err, updatedAttendance) {
          if (!err) {
            res.status(200).json({message: 'Successfully check member in.'});
          } else {
            res.status(500).json({message: 'Error checking member in.'});
          }
        });
      } else {
        var newAttendance = new Attendance({
          appId: newAppId,
          serviceAttended: [{
            time: new Date(), picture: newAppPicture, serviceTime: newAppServiceTime,
            isPartial: newAppIsPartial, uid: newAppUid
          }]
        });

        newAttendance.save(function(err, updatedAttendance) {
          if (!err) {
            res.status(200).json({message: 'Successfully check member in.'});
          } else {
            res.status(500).json({message: 'Error checking member in.'});
          }
        });
      }
    } else {
      res.status(500).json({message: 'Error finding member.'});
    }
  });
}

function findMember(req, res) {
  AttendanceMember.find({ $text: { $search: req.body.searchString }})
    .exec(function(err, members) {
      if (!err) {
        if (members) {
          res.json(members);
        } else {
          res.status(400).json({message: 'No matching member found.'});
        }
      } else {
        res.status(500).json({message: 'Error finding member.'});
      }
    });
}

function getAllServicesAttended(req, res) {
  Attendance.findOne({ appId: req.params.id })
    .exec(function(err, attendance) {
      if (!err) {
        if (attendance) {
          _.forEach(attendance.serviceAttended, function(service) {
            service.picture = '';
          });
        }
        res.json(attendance);
      } else {
        res.status(500).json({message: 'Error getting services attended.'});
      }
    });
}

function getCodeList(req, res) {
  MemberCode.find({})
    .exec(function(err, data) {
      if (!err) {
        if (data) {
          res.json(data);
        }
      } else {
        res.status(500).json({message: 'Error finding member codes!!'});
      }
    });
}

function getCategoryList(req, res) {
  db.collection('attendancecategories').find({}).toArray()
    .then(function(data) {
      if (data) {
        res.json(data);
      } else {
        res.status(500).json({message: 'Error finding attendance categories!!'});
      }
    });
}

function getNewMemberList(req, res) {
  AttendanceMember.find({})
    .then(function(data) {
      if (data) {
        res.json(data);
      } else {
        res.status(500).json({message: 'Error finding new member attendance list!!'});
      }
    });
}

function updateAppId(req, res) {
  var appId = req.body.appId;

  User.findOne({username: req.params.username})
    .exec(function(err, user) {
      if (user) {
        user.appId = appId;

        user.save(function(err, updatedUser) {
          if (!err) {
            if (updatedUser) {
              res.json(updatedUser);
            } else {
              res.status(404).json({message: 'Error finding user.'});
            }
          } else {
            res.status(500).json({message: 'Error updating app id.'});
          }
        });
      } else {
        res.status(400).json({message: 'Error finding user.'});
      }
    });
}

function updateServicesAttended(req, res) {
  var serviceUid = req.body.uid;
  var updatedService = req.body;

  Attendance.findOne({ appId: req.params.id }, function(err, attendance) {
    if (!err) {
      if (attendance) {
        var match = _.findIndex(attendance.serviceAttended, { uid: serviceUid });

        if (match > -1) {
          attendance.serviceAttended[match].isPartial = updatedService.isPartial;

          attendance.save(function(err, updatedAttendance) {
            if (!err) {
              res.status(200).send({message: 'Successfully updated service.'});
            } else {
              res.status(500).send({message: 'Error updating service.'});
            }
          });
        } else {
          res.status(404).json({message: 'Error finding service!!'});
        }
      } else {
        res.status(404).json({message: 'Error finding member!!'});
      }
    } else {
      res.status(500).json({message: 'Error finding member codes!!'});
    }
  });
}

function removeNewMember(req, res) {
  AttendanceMember.findOneAndRemove({uid: req.params.id}, function(err, member) {
    if (!err) {
      if (member) {
        res.json({message: 'Successfully remove new member.'});
      } else {
        res.json({message: 'Can\'t find this new member.'});
      }
    } else {
      res.status(500).json({message: 'Error removing new member.'});
    }
  });
}

module.exports = {
  addMemberCode: addMemberCode,
  addNewMember: addNewMember,
  checkMemberIn: checkMemberIn,
  findMember: findMember,
  getAllServicesAttended: getAllServicesAttended,
  getCodeList: getCodeList,
  getCategoryList: getCategoryList,
  getNewMemberList: getNewMemberList,
  updateAppId: updateAppId,
  updateServicesAttended: updateServicesAttended,
  removeNewMember: removeNewMember
};
