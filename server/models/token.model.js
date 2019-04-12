/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TokenSchema = new Schema({
  username: { type: String, index: true, unique: true },
  sessionId: String,
  status: String
}, { strict: false});

module.exports = mongoose.model('Token', TokenSchema);
