/* tslint:disable */
var path = require('path');
var express = require('express');
var httpError = require('http-errors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var cors = require('cors');
var helmet = require('helmet');
var routes = require('../routes/index.route');
var config = require('./config');

var app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
app.use(bodyParser.json({limit: '2mb'}));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// API router
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
