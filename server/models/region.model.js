/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var RegionSchema = new Schema({
  regionId: { type: String, index: true, unique: true },
  regionName: String
}, { strict: false});

module.exports = mongoose.model('Region', RegionSchema);
