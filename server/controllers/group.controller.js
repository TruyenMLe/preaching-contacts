/* tslint:disable */

var db = require('./db');
var _ = require('lodash');
var Group = require('../models/group.model');

function addGroup(req, res) {
  var newGroup = Group(req.body),
    groupName = req.body.groupName;

  newGroup.save(function(err) {
    if (!err) {
      res.status(200).json({message: 'Successfully add group ' + groupName});
    } else {
      res.status(500).json({message: 'Error adding group ' + groupName});
    }
  });
}

function getAllGroups(req, res) {
  Group.find({})
    .sort({ groupName: 'asc' })
    .exec(function(err, data) {
      if (!err) {
        if (data) {
          res.json(data);
        }
      } else {
        res.status(500).json({message: 'Error finding group!!'});
      }
    })
}

function getGroupContacts(req, res) {
  var zion = req.body.zion,
    limitBy = req.body.itemsPerPage,
    skipBy = limitBy * (req.body.currentPage - 1),
    orderBy = -1;

  var contactCursor = db.collection(zion).find({groupId: req.params.groupId});

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

function getGroupMembers(req, res) {
  var limitBy = req.body.itemsPerPage,
    skipBy = limitBy * (req.body.currentPage - 1),
    orderBy = 1;

  var contactCursor = db.collection('users').find({groupId: req.params.groupId, roles: { $nin: ['zionAccount'] }});

  contactCursor
    .sort({firstName: orderBy})
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

function getGroupRegion(req, res) {
  var searchObject = { region: req.params.regionName };

  Group.find(searchObject)
    .sort({ groupName: 'asc' })
    .exec(function(err, results) {
      if (!err) {
        if (!results) {
          res.status(404).json({message: 'No groups found.'});
        } else {
          res.json(results);
        }
      } else {
        res.status(500).json({message: 'Error finding groups!'});
      }
    })
}

function getGroupTotalRegion(req, res) {
  var searchObject = { region: req.params.regionName };

  Group.find(searchObject)
    .sort({ groupName: 'asc' })
    .exec(function(err, results) {
      if (!err) {
        if (!results) {
          res.status(404).json({message: 'No groups found.'});
        } else {
          res.json(results);
        }
      } else {
        res.status(500).json({message: 'Error finding groups!'});
      }
    })
}

function getGroupZion(req, res) {
  var searchObject;

  if (req.params.zion === 'midwest') {
    searchObject = {};
  } else if (req.params.zion === 'total') {
    searchObject = {};
  } else {
    searchObject = { zion: req.params.zion, groupName: { $nin: ['P. Daniel', 'Denver, CO'] } };
  }

  Group.find(searchObject)
    .sort({ groupName: 'asc' })
    .exec(function(err, results) {
      if (!err) {
        if (!results) {
          res.status(404).json({message: 'No groups found.'});
        } else {
          res.json(results);
        }
      } else {
        res.status(500).json({message: 'Error finding groups!'});
      }
    })
}

function searchGroupContacts(req, res) {
  var zion = req.body.zion,
    limitBy = req.body.itemsPerPage,
    skipBy = limitBy * (req.body.currentPage - 1),
    orderBy = -1,
    searchObject = {groupId: req.params.groupId};

  if (req.body.contact) {
    searchObject.contactName = { $regex: req.body.contact, $options: 'i' };
  }

  var contactCursor = db.collection(zion).find(searchObject);

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
  addGroup: addGroup,
  getAllGroups: getAllGroups,
  getGroupContacts: getGroupContacts,
  getGroupMembers: getGroupMembers,
  getGroupRegion: getGroupRegion,
  getGroupTotalRegion: getGroupTotalRegion,
  getGroupZion: getGroupZion,
  searchGroupContacts: searchGroupContacts
};
