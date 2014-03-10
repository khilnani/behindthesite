#!/usr/bin/env node

// vars ========================

var log = require('dysf.utils').logger;
var express = require('express');
var http = require('http');
var path = require('path');
var less = require('less-middleware');
var mongoose = require('mongoose');

var models = require('./app/models');
var routes = require('./app/routes');

var app = express();
var config = require('./config/env.json')[app.get('env')];

// setup ========================

app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(less({ src: path.join(__dirname, 'app/public') }));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'app/public')));
app.use('/libs/jade', express.static(__dirname + '/node_modules/jade'));

// configuration =================

log.setLogLevel( config.logLevel );
app.set('port', config.port);
app.use(express.logger('dev'));

app.use(express.errorHandler({
  dumpExceptions: config.dumpExceptions,
  showStack: config.showStack
}));

// Routes =================

app.get('/', routes.index);
app.get('/api/locale', routes.locale);
app.get('/api/companies', routes.companies);

// Start server =================

mongoose.connect( config.mongodb, function (err, res) {
  if (err) {
    log.error('ERROR connecting to mongodb');
  } else {
    log.event('Connected to mongodb.');
    models.init();
    http.createServer(app).listen(app.get('port'), function () {
      log.event('Express server listening on port ' + app.get('port'));
      log.info('Environment: ' + app.get('env'));
    });
  }
});
