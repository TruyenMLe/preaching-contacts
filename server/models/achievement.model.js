/* tslint:disable */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');
/* tslint:disable */

var AchievementSchema = new Schema({
  username: String,
  displayName: String,
  zionId: String,
  achievements: [{
    month: Date,
    sermonBooks: [{
      bookId: Number
    }],
    fruits: [{
      fruitId: String,
      hasKeptService: Boolean,
      hasTithed: Boolean
    }]
  }],
  fruits: [{
    fruitId: String,
    fruitName: String,
    numOfServiceKept: Number
  }]
}, { strict: false});

module.exports = mongoose.model('Achievement', AchievementSchema);
