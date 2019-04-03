/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var NotificationGroupSchema = new Schema({
  notificationGroupId: String,
  name: String,
  members: [{
    username: String,
    displayName: String
  }]
}, { strict: false});

module.exports = mongoose.model('NotificationGroup', NotificationGroupSchema);
