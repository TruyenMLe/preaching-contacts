/* tslint:disable */

var db = require('./db');
var _ = require('lodash');

function getAllRegions(req, res) {
  db.collection('regions').find({})
    .sort({ regionName: 1 })
    .toArray()
    .then(function(data) {
      res.json(data);
    });
}

function getRegionActivities(req, res) {
  var months = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};
  var thisYear = (new Date()).getFullYear();
  var startDate = new Date(req.params.month + '/01/' + thisYear).toISOString();
  var endDate = new Date(req.params.month + '/' + months[req.params.month] + '/' + thisYear).toISOString();

  db.collection(req.params.zionId).find({ preachDate: {$gte: startDate, $lte: endDate} })
    .toArray()
    .then(function(data) {
      if (data) {
        var totalMember = [];
        var memberList = {};

        for (var i = 0; i < data.length; i++) {
          if (!memberList[data[i].username]) {
            memberList[data[i].username] = true;
            totalMember.push(data[i].firstName + ' ' + data[i].lastName);
          }
        }

        var sortedMemberList = _.sortBy(totalMember, function(member) {
          return member;
        });

        res.json(sortedMemberList);
      }
    });
}

function getRegionGroups(req, res) {
  db.collection('groups').find({region: req.params.regionId, zion: req.params.zionId})
    .sort({ groupName: 1 })
    .toArray()
    .then(function(data) {
      res.json(data);
    });
}

function getRegionZions(req, res) {
  db.collection('zions').find({region: req.params.regionId, disabled: false})
    .sort({ zionName: 1 })
    .toArray()
    .then(function(data) {
      res.json(data);
    });
}

module.exports = {
  getAllRegions: getAllRegions,
  getRegionActivities: getRegionActivities,
  getRegionGroups: getRegionGroups,
  getRegionZions: getRegionZions
};
