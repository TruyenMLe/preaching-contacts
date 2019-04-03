/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var AttendanceMemberSchema = new Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  fullName: { type: String, text: true },
  baptism: Boolean,
  birthday: Date,
  messenger: String,
  nextPerson: String,
  uid: String,
  picture: String
}, { strict: false});

module.exports = mongoose.model('AttendanceMember', AttendanceMemberSchema);
