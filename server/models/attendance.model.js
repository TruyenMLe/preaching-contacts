/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var AttendanceSchema = new Schema({
  appId: String,
  serviceAttended: [{ time: Date, serviceTime: String, isPartial: Boolean, uid: String }]
}, { strict: false});

module.exports = mongoose.model('Attendance', AttendanceSchema);
