/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var LanguageSchema = new Schema({
  languageId: { type: String, index: true, unique: true },
  languageName: String
}, { strict: false});

module.exports = mongoose.model('Language', LanguageSchema);
