/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var NotificationSchema = new Schema({
  notificationId: String,
  notificationGroupId: String,
  header: String,
  body: String,
  users: [{
    username: String,
    hasRead: { type: Boolean, default: false }
  }],
  responseRequired: { type: Boolean, default: false },
  completedList: [{
    username: String,
    displayName: String
  }],
  createdDate: Date
}, { strict: false});

module.exports = mongoose.model('Notification', NotificationSchema);
