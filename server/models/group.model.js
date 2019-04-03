/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var GroupSchema = new Schema({
  groupId: { type: String, index: true, unique: true },
  groupName: String,
  members: [String],
  totalMember: Number,
  totalContact: Number,
  zion: String,
  region: String
}, { strict: false});

module.exports = mongoose.model('Group', GroupSchema);
