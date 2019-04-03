/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var ZionSchema = new Schema({
  zionId: { type: String, index: true, unique: true },
  zionName: String,
  region: String,
  disabled: { type: Boolean, default: false }
}, { strict: false});

module.exports = mongoose.model('Zion', ZionSchema);
