/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var UserSchema = new Schema({
  acceptedPolicy: String,
  acceptedPolicyDate: Date,
  disabled: { type: Boolean, default: true },
  firstName: { type: String, trim: true },
  groupId: String,
  language: String,
  lastMofidiedDate: Date,
  lastName: String,
  middleName: String,
  nickName: String,
  password: String,
  restricted: { type: Boolean, default: false },
  roles: [String],
  salt: String,
  username: { type: String, index: true, unique: true },
  zion: String,
  region: String,
  academyMembers: [{ displayName: String, username: String, inGroup: { type: Boolean, default: true } }],
  notificationId: String,
  appId: String
}, { strict: false});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
  } else {
    return password;
  }
};

UserSchema.methods.authenticate = function(password) {
  'use strict';

  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
  var _this = this;
  var possibleUsername = username.toLowerCase() + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
