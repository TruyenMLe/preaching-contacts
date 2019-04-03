/* tslint:disable */

var db = require('./db');
var _ = require('lodash');
var PdfMakePrinter = require('pdfmake');
var fs = require('fs');
var uuid = require('node-uuid');
var Group = require('../models/group.model');
var ContactNumber = require('../models/contact-number.model');

function addDailyContactNumber(req, res) {
  var newContactNumber = ContactNumber(req.body);

  newContactNumber.contactNumberId = uuid.v4();

  newContactNumber.save(function(err) {
    if (!err) {
      res.status(200).json({message: 'Successfully added number of people preached.'});
    } else {
      res.status(500).json({message: 'Error adding number of people preached.'});
    }
  });
}

function createPdfBinary(pdfDoc, callback) {
  var fontDescriptors = {
    Roboto: {
      normal: 'build/fonts/Roboto-Regular.ttf',
      bold: 'build/fonts/Roboto-Medium.ttf',
      italics: 'build/fonts/Roboto-Italic.ttf',
      bolditalics: 'build/fonts/Roboto-MediumItalic.ttf'
    }
  };

  var printer = new PdfMakePrinter(fontDescriptors);

  var doc = printer.createPdfKitDocument(pdfDoc);

  var chunks = [];
  var result;

  doc.on('data', function (chunk) {
    chunks.push(chunk);
  });
  doc.on('end', function () {
    result = Buffer.concat(chunks);
    callback('data:application/pdf;base64,' + result.toString('base64'));
  });
  doc.end();

}

function deleteContact(req, res) {
  var zion = req.body.zion,
    contactId = req.body.contactId,
    groupId = req.body.groupId,
    preachLongEnough = req.body.preachLongEnough === 'Yes',
    hasContact = req.body.phoneNumber || req.body.emailAddress;

  db.collection(zion).remove({contactId: contactId})
    .then(function(data) {
      if (data && data.result && data.result.n === 1) {
        if (hasContact || preachLongEnough) {
          Group.findOne({groupId: groupId}, function (err, group) {
            if (!err) {
              if (group) {
                group.totalContact--;
                group.save(function (err) {
                  if (!err) {
                    res.status(200).json({message: 'Successfully deleted contact.'});
                  }
                });
              } else {
                res.status(404).json({message: 'No matching group found!'});
              }
            }
          });
        } else {
          res.status(200).json({message: 'Successfully deleted contact.'});
        }
      }
    });
}

function downloadAllContacts(req, res) {
  var zion = req.body.zion,
    username = req.body.username,
    limitBy = req.body.itemsPerPage,
    skipBy = limitBy * (req.body.currentPage - 1),
    orderBy = -1,
    searchObject = {};

  if (req.body.contact) {
    searchObject.contactName = { $regex: req.body.contact, $options: 'i' };
  }

  if (req.body.onCampus) {
    searchObject.onCampus = true;
  } else {
    searchObject.username = username;
  }

  var contactCursor = db.collection(zion).find(searchObject);

  contactCursor
    .sort({preachDate: orderBy})
    .toArray()
    .then(function(data) {
      var tableData = [
        ['Name', 'Phone Number', 'Date Preached', 'Apt. Date', 'Apt. Time']
      ];

      for (var i = 0; i < data.length; i++) {
        var currentContact = data[i];
        var dataArray = [];

        dataArray.push(currentContact.contactName || '');
        dataArray.push(currentContact.phoneNumber || '');
        dataArray.push(currentContact.preachDate ? (new Date(currentContact.preachDate)).toLocaleDateString() : '');
        dataArray.push(currentContact.appointmentDate ? (new Date(currentContact.appointmentDate)).toLocaleDateString() : '');
        dataArray.push(currentContact.appointmentTime ? (new Date(currentContact.appointmentTime)).toLocaleDateString() : '');

        tableData.push(dataArray);
      }

      var docDefinition = {
        content: [
          {text: 'My Contacts', style: 'header'},
          {
            table: {
              body: tableData
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          }
        },
        defaultStyle: {
          // alignment: 'justify'
        }
      };

      createPdfBinary(docDefinition, function(binary) {
        res.contentType('application/pdf');
        res.send(binary);
      }, function(error) {
        res.send('ERROR:' + error);
      });
    });
}

function getAllContacts(req, res) {
  var zion = req.body.zion,
    username = req.body.username,
    limitBy = req.body.itemsPerPage,
    skipBy = limitBy * (req.body.currentPage - 1),
    orderBy = -1,
    searchObject = {};

  if (req.body.contact) {
    searchObject.contactName = { $regex: req.body.contact, $options: 'i' };
  }

  if (req.body.onCampus) {
    searchObject.onCampus = true;
  } else {
    searchObject.username = username;
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

function getReference(req, res) {
  var zion = req.body.zion,
    queryObject,
    username = req.body.username,
    limitBy = req.body.itemsPerPage,
    skipBy = limitBy * (req.body.currentPage - 1),
    orderBy = -1,
    displayName = req.body.firstName,
    preachingPartner;

  if (req.body.middleName) {
    displayName += ' ' + req.body.middleName;
  }

  if (req.body.lastName) {
    displayName += ' ' + req.body.lastName;
  }

  if (req.body.nickName) {
    displayName += ' (' + req.body.nickName + ')';
  }

  preachingPartner = { $regex: displayName, $options: 'i' };

  queryObject = {
    $or: [
      {username: username},
      {preachingPartnerFirst: preachingPartner},
      {'preachingPartnerFirst.username': username},
      {preachingPartnerSecond: preachingPartner},
      {'preachingPartnerSecond.username': username}
    ]
  };

  var contactCursor = db.collection(zion).find(queryObject);

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

function getTotal(req, res) {
  var zion = req.body.zion,
    count = 0;

  db.collection(zion).find({ username: req.body.username }).toArray()
    .then(function(contacts) {
      if (contacts) {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i].phoneNumber || contacts[i].emailAddress || (contacts[i].preachLongEnough === 'Yes')) {
            count++;
          }
        }

        res.json(count);
      } else {
        res.json(0);
      }
    });
}

function getDailyTotalPeoplePreached(req, res) {
  db.collection('contactnumbers')
    .aggregate([
      {$match: {zionId: req.params.zionId}},
      {$group: {_id: '$dateSubmitted', total: {$sum: '$numberOfPeoplePreached'}}},
      {$sort: { _id: -1 }},
      {$project: {date: '$_id', total: '$total'}}
    ], function(err, data) {
      if (!err) {
        if (data) {
          res.json(data);
        } else {
          res.status(500).json({message: 'Error calculating daily total number of people preached!'});
        }
      } else {
        res.status(500).json({message: 'Error getting daily total number of people preached!'});
      }
    });
}

function getDailyTotalPeoplePreachedPerMember(req, res) {
  db.collection('contactnumbers')
    .aggregate([
      {$match: {username: req.params.username}},
      {$group: {_id: '$dateSubmitted', total: {$sum: '$numberOfPeoplePreached'}}},
      {$sort: { _id: -1 }},
      {$project: {date: '$_id', total: '$total'}}
    ], function(err, data) {
      if (!err) {
        if (data) {
          res.json(data);
        } else {
          res.status(500).json({message: 'Error calculating daily total number of people preached!'});
        }
      } else {
        res.status(500).json({message: 'Error getting daily total number of people preached!'});
      }
    });
}

function getTotalPeoplePreached(req, res) {
  var count = 0;

  db.collection('contactnumbers').find({zionId: req.params.zionId})
    .toArray()
    .then(function(data) {
      if (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].numberOfPeoplePreached) {
            count += data[i].numberOfPeoplePreached;
          }
        }

        res.json({ total: count });
      } else {
        res.json({ total: 0 });
      }
    });
}

function searchContact(req, res) {
  var zion = req.body.zion,
    username = req.body.username,
    limitBy = req.body.itemsPerPage,
    skipBy = limitBy * (req.body.currentPage - 1),
    orderBy = -1,
    searchObject = {username: username};

  if (req.body.contact) {
    searchObject.contactName = { $regex: req.body.contact, $options: 'i' };
  }

  if (req.body.onCampus) {
    searchObject.onCampus = true;
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

function updateContact(req, res) {
  var zion = req.body.zion,
    preachLongEnough = req.body.preachLongEnough === 'Yes',
    hasContact = req.body.phoneNumber || req.body.emailAddress,
    groupId = req.body.groupId,
    qualified = req.body.qualified;

  if (!qualified) {
    req.body.qualified = true;
  }

  var contactCursor = db.collection(zion).update({contactId: req.body.contactId}, req.body);

  contactCursor
    .then(function(data) {
      if (data) {
        if (hasContact || preachLongEnough) {
          Group.findOne({groupId: groupId}, function (err, existedGroup) {
            if (!err) {
              if (existedGroup) {
                if (!qualified) {
                  existedGroup.totalContact++;

                  existedGroup.save(function () {
                    res.json(data);
                  });
                } else {
                  res.sendStatus(200);
                }
              } else {
                res.json({message: 'Selected group doesn\'t exist!'});
              }
            } else {
              res.status(500).json({message: 'Error finding existing group!'});
            }
          });
        } else {
          res.json(data);
        }
      }
    }, function(err) {
      res.json({message: err});
    });
}

module.exports = {
  addDailyContactNumber: addDailyContactNumber,
  deleteContact: deleteContact,
  downloadAllContacts: downloadAllContacts,
  getAllContacts: getAllContacts,
  getReference: getReference,
  getTotal: getTotal,
  getDailyTotalPeoplePreached: getDailyTotalPeoplePreached,
  getDailyTotalPeoplePreachedPerMember: getDailyTotalPeoplePreachedPerMember,
  getTotalPeoplePreached: getTotalPeoplePreached,
  searchContact: searchContact,
  updateContact: updateContact
};
