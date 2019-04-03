/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var MemberCodeSchema = new Schema({
  appId: String,
  birthday: Date,
  fullName: String,
  gender: Boolean
}, { strict: false});

module.exports = mongoose.model('MemberCode', MemberCodeSchema);
