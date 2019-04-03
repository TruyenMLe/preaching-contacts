/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var AcademySchema = new Schema({
  username: String,
  sermonBookOne: [Date],
  sermonBookTwo: [Date],
  sermonBookThree: [Date],
  sermonBookFour: [Date],
  sermonBookFive: [Date]
}, { strict: false});

module.exports = mongoose.model('Academy', AcademySchema);
