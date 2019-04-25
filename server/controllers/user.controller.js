/* tslint:disable */
var db = require('./db');
var Group = require('../models/group.model');
var User = require('../models/user.model');

function addAuthorization(req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (!err) {
      if (user) {
        if (user.roles.indexOf('authorizedBibleTeacher') < 0) {
          user.roles.push('authorizedBibleTeacher');
        }

        user.save(function(err) {
          if (err) {
            res.status(500).json({message: 'Error adding authorized teacher!'});
          } else {
            res.status(200).json({message: 'Successfully adding authorized teacher!'});
          }
        });
      }
    } else {
      res.status(500).json({message: 'Error finding users!'});
    }
  });
}

function deleteMember(req, res) {
  var username = req.body.username;

  Group.findOne({ groupId: req.body.groupId }, function(err, group) {
    if (!err) {
      if (group) {
        var index = group.members.indexOf(username);

        if (index >= 0) {
          group.members.splice(index, 1);
          group.totalMember--;

          group.save(function(err) {
            if (!err) {
              User.remove({ username: username }, function (err) {
                if (!err) {
                  res.status(200).json({message: 'Successfully updated requests'});
                } else {
                  res.status(500).json({message: 'Error removing member!'});
                }
              });
            }
          });
        } else {
          res.status(404).json({message: 'No matching user found!'});
        }
      } else {
        res.status(404).json({message: 'No matching group found!'});
      }
    }
  });
}

function deleteRequestByUsername(req, res) {
  var username = req.params.username;

  User.findOneAndRemove({username: username}, function(err, user) {
    if (!err) {
      res.json({message: 'Successfully removed request.'});
    }
  });
}

function enableUser(req, res) {
  User.update({ username: req.params.username }, { disabled: false }, function (err, users) {
    if (!err) {
      res.status(200).json({message: 'Successfully updated requests'});
    } else {
      res.status(500).json({message: 'Error finding users!'});
    }
  });
}

function getMember(req, res) {
  var memberList = [];

  var matchObject = { region: req.params.regionName };

  if (req.params.user !== 'all-members') {
    matchObject.username = { $ne: req.params.user };
  }

  User.aggregate()
    .match(matchObject)
    .sort({ firstName: 1 })
    .project({
      firstName: '$firstName', middleName: '$middleName', lastName: '$lastName', nickName: '$nickName',
      username: '$username', region: '$region', zion: '$zion', groupId: '$groupId'
    })
    .exec(function(err, data) {
      if (!err) {
        if (data) {
          for (var i = 0; i < data.length; i++) {
            var displayName = data[i].firstName;

            if (data[i].middleName) {
              displayName += ' ' + data[i].middleName + ' ' + data[i].lastName;
            } else {
              displayName += ' ' + data[i].lastName;
            }

            if (data[i].nickName) {
              displayName += ' (' + data[i].nickName + ')';
            }

            memberList.push({
              displayName: displayName,
              username: data[i].username,
              region: data[i].region,
              zion: data[i].zion,
              groupId: data[i].groupId
            });
          }

          res.json(memberList);
        }
      } else {
        res.status(404).json({message: 'No members found!!'});
      }
    });
}

function getMembersByZion(req, res) {
  User.find({zion: req.params.zionId}, function(err, members) {
    if (!err) {
      if (members) {
        var arr = [];

        for (var i = 0; i < members.length; i++) {
          var displayName = members[i].firstName;

          if (members[i].middleName) {
            displayName += ' ' + members[i].middleName + ' ' + members[i].lastName;
          } else {
            displayName += ' ' + members[i].lastName;
          }

          if (members[i].nickName) {
            displayName += ' (' + members[i].nickName + ')';
          }

          arr.push({
            username: members[i].username,
            displayName: displayName
          });
        }

        res.json(arr);
      }
    } else {
      res.status(500).json({message: 'Error getting members of selected zion.'});
    }
  })
}

function getMembersByZionWithShortDName(req, res) {
  User.find({zion: req.params.zionId}, function(err, members) {
    if (!err) {
      if (members) {
        var arr = [];

        for (var i = 0; i < members.length; i++) {
          var displayName = members[i].firstName + ' ' + members[i].lastName;

          arr.push({
            username: members[i].username,
            displayName: displayName
          });
        }

        res.json(arr);
      }
    } else {
      res.status(500).json({message: 'Error getting members of selected zion.'});
    }
  })
}

function getRequestedUsers(req, res) {
  User.find({ disabled: true, restricted: false }, function (err, users) {
    if (!err) {
      if (users) {
        res.json(users);
      }
    } else {
      res.status(500).json({message: 'Error finding users!'});
    }
  });
}

function moveMember(req, res) {
  var username = req.body.username,
    currentZion = req.body.zion,
    currentGroup = req.body.groupId,
    zion = req.body.newZion,
    groupId = req.body.newGroup;

  User.findOneAndUpdate({ username: username }, {zion: zion, groupId: groupId}, function(err, user) {
    if (!err) {
      Group.findOne({ groupId: currentGroup }, function(err, group) {
        if (!err) {
          if (group) {
            var index = group.members.indexOf(username);

            if (index >= 0) {
              group.members.splice(index, 1);
              group.totalMember--;

              group.save(function(err) {
                if (!err) {
                  Group.findOne({ groupId: groupId }, function(err, group) {
                    if (!err) {
                      if (group) {
                        var index = group.members.indexOf(username);

                        if (index < 0) {
                          group.members.push(username);
                          group.totalMember++;

                          group.save(function(err) {
                            if (!err) {
                              var bulkInsert = db.collection(zion).initializeUnorderedBulkOp();
                              var bulkRemove = db.collection(currentZion).initializeUnorderedBulkOp();

                              db.collection(currentZion).find({username: username}).toArray()
                                .then(function(data) {
                                  if (zion !== currentZion) {
                                    for (var i = 0; i < data.length; i++) {
                                      data[i].zion = zion;
                                      data[i].groupId = groupId;

                                      bulkInsert.insert(data[i]);
                                      bulkRemove.find({_id: data[i]._id}).removeOne();
                                    }

                                    if (bulkInsert.length > 0) {
                                      bulkInsert.execute();
                                      bulkRemove.execute();
                                    }
                                  } else {
                                    bulkInsert.find({username: username}).update({ $set: { groupId: groupId } });
                                    bulkInsert.execute();
                                  }

                                  res.status(200).json({message: 'Successfully move member'});
                                });
                            } else {
                              res.status(500).json({message: "Error updating new group!"})
                            }
                          });
                        } else {
                          res.status(404).json({message: 'No matching user in ' + group.groupName + ' group found!'});
                        }
                      } else {
                        res.status(404).json({message: 'No matching group found!'});
                      }
                    }
                  });
                } else {
                  res.status(500).json({message: "Error updating old group!"})
                }
              });
            } else {
              res.status(404).json({message: 'No matching user in ' + group.groupName + ' group found!'});
            }
          } else {
            res.status(404).json({message: 'No matching group found!'});
          }
        }
      });
    } else {
      res.status(500).json({message: 'Error updating new zion and group!'});
    }
  });
}

function removeAuthorization(req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (!err) {
      if (user) {
        user.roles = user.roles.filter(function(data) {
          return data !== 'authorizedBibleTeacher';
        });

        user.save(function(err) {
          if (err) {
            res.status(500).json({message: 'Error removing authorized teacher!'});
          } else {
            res.status(200).json({message: 'Successfully removing authorized teacher!'});
          }
        });
      }
    } else {
      res.status(500).json({message: 'Error finding users!'});
    }
  });
}

function removeParticipant(req, res) {
  var username = req.params.username;
  var participantUsername = req.body.username;
  User.findOne({ username: username }, function (err, user) {
    if (!err) {
      if (user) {
        user.academyMembers = user.academyMembers.filter(function(data) {
          return data.username !== participantUsername;
        });

        user.save(function(err, user) {
          if (err) {
            res.status(500).json({message: 'Error removing participant!'});
          } else {
            res.status(200).json({message: 'Successfully removing participant!', academyMembers: user.academyMembers});
          }
        });
      }
    } else {
      res.status(500).json({message: 'Error finding users!'});
    }
  });
}

function updateUser(req, res) {
  req.body.lastModifiedDate = new Date();
  User.update({username: req.params.username}, req.body, function(err, result) {
    if (!err) {
      if (result && result.n === 1) {
        if (result.nModified === 1) {
          res.status(200).json({message: 'Successfully updated user'});
        } else {
          res.status(200).json({message: 'There\'re no changes to be saved.'});
        }
      }
    } else {
      res.status(500).json({message: 'Error updating user!'});
    }
  });
}

module.exports = {
  addAuthorization: addAuthorization,
  deleteMember: deleteMember,
  deleteRequestByUsername: deleteRequestByUsername,
  enableUser: enableUser,
  getMember: getMember,
  getMembersByZion: getMembersByZion,
  getMembersByZionWithShortDName: getMembersByZionWithShortDName,
  getRequestedUsers: getRequestedUsers,
  moveMember: moveMember,
  removeAuthorization: removeAuthorization,
  removeParticipant: removeParticipant,
  updateUser: updateUser
};
