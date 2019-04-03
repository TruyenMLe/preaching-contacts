/* tslint:disable */

var db = require('./db');
var _ = require('lodash');
var uuid = require('node-uuid');
var Notification = require('../models/notification.model');
var NotificationGroup = require('../models/notification-group.model');

function addNotification(req, res) {
  var notification = Notification(req.body);

  notification.notificationId = uuid.v4();
  notification.createdDate = new Date();

  notification.save(function(err, notification) {
    if (!err) {
      if (notification) {
        res.json(notification);
      }
    } else {
      res.status(500).json({message: 'Error saving notification.'});
    }
  });
}

function addNotificationGroup(req, res) {
  var notificationGroup = NotificationGroup(req.body);

  notificationGroup.notificationGroupId = uuid.v4();

  notificationGroup.save(function(err, notificationGroups) {
    if (!err) {
      if (notificationGroups) {
        res.json(notificationGroups);
      }
    } else {
      res.status(500).json({message: 'Error saving notification group.'});
    }
  });
}

function deleteNotificationById(req, res) {
  Notification.findOneAndRemove({ notificationId: req.params.notificationId }, function(err, notification) {
    if (!err) {
      if (notification) {
        res.json({message: 'Successfully remove notification.'});
      }
    } else {
      res.status(500).json({message: 'Error removing notification.'});
    }
  });
}

function deleteNotificationGroupById(req, res) {
  NotificationGroup.findOneAndRemove({ notificationGroupId: req.params.notificationGroupId }, function(err, notificationGroup) {
    if (!err) {
      if (notificationGroup) {
        res.json({message: 'Successfully removing notification group.'});
      }
    } else {
      res.status(500).json({message: 'Error removing notification group.'});
    }
  });
}

function getNotificationById(req, res) {
  Notification.findOne({notificationId: req.params.notificationId}, function(err, notification) {
    if (!err) {
      if (notification) {
        res.json(notification);
      }
    } else {
      res.status(500).json({message: 'Error getting notification.'});
    }
  });
}

function getNotificationByUsername(req, res) {
  var isModifier = req.params.username === 'modifier';
  var queryObject;

  if (isModifier) {
    queryObject = {};
  } else {
    queryObject = {'users.username': req.params.username}
  }

  Notification.find(queryObject).sort('-createdDate').exec(function(err, notifications) {
    if (!err) {
      if (notifications) {
        res.json(notifications);
      }
    } else {
      res.status(500).json({message: 'Error getting notifications.'});
    }
  });
}

function getNotificationGroupList(req, res) {
  NotificationGroup.find({}, function(err, notificationGroups) {
    if (!err) {
      if (notificationGroups) {
        res.json(notificationGroups);
      }
    } else {
      res.status(500).json({message: 'Error getting notification groups.'});
    }
  });
}

function getUnreadNotificationByUsername(req, res) {
  var username = req.params.username;
  Notification.find({'users.username': username}, function(err, notifications) {
    if (!err) {
      var count = 0;

      for (var i = 0; i < notifications.length; i++) {
        for (var j = 0; j < notifications[i].users.length; j++) {
          var user = notifications[i].users[j];
          if (user.username === username && !user.hasRead) {
            count++;
          }
        }
      }

      res.json({count: count});
    } else {
      res.status(500).json({message: 'Error getting notifications.'});
    }
  });
}

function updateNotificationById(req, res) {
  Notification.update({ notificationId: req.params.notificationId }, {
    completedList: req.body.completedList,
    users: req.body.users
  }, function(err, notificationGroup) {
    if (!err) {
      if (notificationGroup) {
        res.json({message: 'Successfully updating notification.'});
      }
    } else {
      res.status(500).json({message: 'Error updating notification.'});
    }
  });
}

function updateNotificationGroup(req, res) {
  NotificationGroup.update({ notificationGroupId: req.body.notificationGroupId }, { members: req.body.members }, function(err, notificationGroup) {
    if (!err) {
      if (notificationGroup) {
        res.json({message: 'Successfully removing member from notification group.'});
      }
    } else {
      res.status(500).json({message: 'Error updating notification group.'});
    }
  });
}

module.exports = {
  addNotification: addNotification,
  addNotificationGroup: addNotificationGroup,
  deleteNotificationById: deleteNotificationById,
  deleteNotificationGroupById: deleteNotificationGroupById,
  getNotificationById: getNotificationById,
  getNotificationByUsername: getNotificationByUsername,
  getNotificationGroupList: getNotificationGroupList,
  getUnreadNotificationByUsername: getUnreadNotificationByUsername,
  updateNotificationById: updateNotificationById,
  updateNotificationGroup: updateNotificationGroup
};
