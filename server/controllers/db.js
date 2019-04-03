/* tslint:disable */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/survey');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');
});

module.exports = db;
