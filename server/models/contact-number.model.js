/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var ContactNumberSchema = new Schema({
  contactNumberId: { type: String, index: true, unique: true },
  username: String,
  zionId: String,
  numberOfPeoplePreached: Number,
  dateSubmitted: Date
}, { strict: false});

module.exports = mongoose.model('ContactNumber', ContactNumberSchema);
