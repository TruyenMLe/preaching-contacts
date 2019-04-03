/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var ScheduleSchema = new Schema({
  scheduleId: { type: String, index: true, unique: true },
  time: Date,
  archived: { type: Boolean, default: false },
  zions: [{ zionId: String, zionName: String }],
  tasks: [String]
}, { strict: false});

module.exports = mongoose.model('Schedule', ScheduleSchema);
