/* tslint:disable */

var db = require('./db');
var _ = require('lodash');
var Zion = require('../models/zion.model');

function getAllZions(req, res) {
  Zion.find({})
    .sort({ zionName: 'asc' })
    .exec(function(err, data) {
      if (!err) {
        if (data) {
          res.json(data);
        }
      } else {
        res.status(500).json({message: 'Error finding zion!!'});
      }
    })
}

function getZionContacts(req, res) {
  var limitBy = req.body.itemsPerPage,
    skipBy = limitBy * (req.body.currentPage - 1),
    orderBy = -1;

  var contactCursor = db.collection(req.params.zion).find({});

  contactCursor
    .sort({preachDate: orderBy})
    .limit(50000)
    .toArray()
    .then(function(data) {
      var paginatedItems = _.drop(data, skipBy).slice(0, limitBy);

      var paginatedData = {
        page: req.body.currentPage,
        pageSize: limitBy,
        totalItems: data.length,
        totalPages: Math.ceil(data.length / limitBy),
        content: paginatedItems
      };

      res.json(paginatedData);
    });
}

function getZionLeaderAccount(req, res) {
  db.collection('users').find({lastName: 'Zion'})
    .toArray()
    .then(function(data) {
      var arr = [];

      if (data) {
        for (var i = 0; i < data.length; i++) {
          var user = data[i];

          if ((user.firstName.toLowerCase() === user.username) && (user.username === user.zion.toLowerCase()) && (user.roles.indexOf('overseer') >= 0)) {
            arr.push({
              firstName: user.firstName,
              lastName: user.lastName,
              zion: user.zion,
              groupId: user.groupId,
              username: user.username,
              displayName: user.firstName + ' ' + user.lastName
            });
          }
        }
      }

      res.status(200).json(arr);
    });
}

function searchZionContacts(req, res) {
  var limitBy = req.body.itemsPerPage,
    skipBy = limitBy * (req.body.currentPage - 1),
    orderBy = -1,
    searchObject = {};

  if (req.body.contact) {
    searchObject.contactName = { $regex: req.body.contact, $options: 'i' };
  }

  var contactCursor = db.collection(req.params.zion).find(searchObject);

  contactCursor
    .sort({preachDate: orderBy})
    .toArray()
    .then(function(data) {
      var paginatedItems = _.drop(data, skipBy).slice(0, limitBy);

      var paginatedData = {
        page: req.body.currentPage,
        pageSize: limitBy,
        totalItems: data.length,
        totalPages: Math.ceil(data.length / limitBy),
        content: paginatedItems
      };

      res.json(paginatedData);
    });
}

module.exports = {
  getAllZions: getAllZions,
  getZionContacts: getZionContacts,
  getZionLeaderAccount: getZionLeaderAccount,
  searchZionContacts: searchZionContacts
};
