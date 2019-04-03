/* tslint:disable */

var db = require('./db');
var _ = require('lodash');
var uuid = require('node-uuid');
var Schedule = require('../models/schedule.model');

function addSchedule(req, res) {
  var newSchedule = Schedule(req.body);

  newSchedule.scheduleId = uuid.v4();

  newSchedule.save(function(err, schedules) {
    if (!err) {
      if (schedules) {
        res.json({message: 'Successfully added new schedule.'});
      }
    } else {
      res.status(500).json({message: 'Error saving schedule.'});
    }
  });
}

function deleteScheduleById(req, res) {
  Schedule.findOneAndRemove({ scheduleId: req.params.scheduleId }, function(err, status) {
    if (!err) {
      if (status) {
        res.json({message: 'Successfully remove schedule.'});
      }
    } else {
      res.status(500).json({message: 'Error removing schedule'});
    }
  });
}

function getScheduleByZion(req, res) {
  var queryObject;

  if (req.params.zion === 'scheduler') {
    queryObject = {};
  } else {
    queryObject = {'zions.zionId': req.params.zion, time: {$gte: new Date()}};
  }

  Schedule.find(queryObject, function(err, schedules) {
    if (!err) {
      if (schedules) {
        res.json(schedules);
      } else {
        res.status(404).json({message: 'No schedule(s) are found.'});
      }
    } else {
      res.status(500).json({message: 'Error finding schedule.'});
    }
  });
}

function updateScheduleById(req, res) {
  Schedule.update({ scheduleId: req.params.scheduleId }, { zions: req.body.zions }, function(err, schedule) {
    if (!err) {
      if (schedule) {
        res.json({message: 'Successfully updated schedule.'});
      }
    } else {
      res.status(500).json({message: 'Error updating schedule.'});
    }
  });
}

module.exports = {
  addSchedule: addSchedule,
  deleteScheduleById: deleteScheduleById,
  getScheduleByZion: getScheduleByZion,
  updateScheduleById: updateScheduleById
};
