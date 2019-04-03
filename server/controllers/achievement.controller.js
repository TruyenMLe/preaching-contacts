/* tslint:disable */
var db = require('./db');
var _ = require('lodash');
var uuid = require('node-uuid');
var Achievement = require('../models/achievement.model');

function addNewAchievement(req, res) {
  var username = req.params.username;
  req.body.fruits[req.body.fruits.length - 1].fruitId = uuid.v4();

  var newAchievement = new Achievement(req.body);

  newAchievement.save(function(err, achievement) {
    if (!err) {
      res.status(200).json({message: 'Successfully added new achievement'});
    } else {
      res.status(500).json({message: 'Error addding new achievement.'});
    }
  });
}

function addNewFruit(req, res) {
  var username = req.params.username;

  if (req.body.fruits && req.body.fruits.length) {
    req.body.fruits[req.body.fruits.length - 1].fruitId = uuid.v4();
  }

  Achievement.findOneAndUpdate({ username: username }, req.body, { upsert: true }, function(err, status) {
    if (!err) {
      res.sendStatus(200);
    } else {
      res.status(500).json({message: 'Error adding new achievement!'});
    }
  });
}

function getAchievement(req, res) {
  var username = req.params.username;

  Achievement.findOne({ username: username }, function(err, achievement) {
    if (!err) {
      res.json(achievement);
    } else {
      res.status(500).json({message: 'Error finding achievement!'});
    }
  });
}

function getAllZionAchievements(req, res) {
  Achievement.find({}, function(err, achievements) {
    if (!err) {
      res.json(achievements);
    } else {
      res.status(500).json({message: 'Error querying all zion achievements!'})
    }
  })
}

function getZionAchievements(req, res) {
  var zionId = req.params.zionId;

  Achievement.find({ zionId: zionId }, function(err, achievements) {
    if (!err) {
      res.json(achievements);
    } else {
      res.status(500).json({message: 'Error querying zion achievements!'})
    }
  })
}

function removeMemberAchievement(req, res) {
  var username = req.params.username;

  Achievement.findOneAndRemove({ username: username }, function(err, member) {
    if (!err) {
      if (member) {
        res.json({message: 'Successfully remove member achievement.'});
      } else {
        res.json({message: 'Can\'t find this member\'s achievement. It may not be created yet'});
      }
    } else {
      res.status(500).json({message: 'Error removing member achievement.'});
    }
  })
}

function updateAchievement(req, res) {
  var username = req.params.username;

  Achievement.findOneAndUpdate({ username: username }, req.body, { upsert: true }, function(err, status) {
    if (!err) {
      res.json(status);
    } else {
      res.status(500).json({message: 'Error updating achievement!'});
    }
  });
}

module.exports = {
  addNewAchievement: addNewAchievement,
  addNewFruit: addNewFruit,
  getAchievement: getAchievement,
  getAllZionAchievements: getAllZionAchievements,
  getZionAchievements: getZionAchievements,
  removeMemberAchievement: removeMemberAchievement,
  updateAchievement: updateAchievement
};
