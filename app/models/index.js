var log = require('dysf.utils').logger;
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
//var ObjectId = Schema.ObjectId;

var models = module.exports;

var companySchema = models.companySchema = new Schema({
  Name: String,
  Description: String,
  Wisdom: String,
  Team: String,
  PM: String,
  DevOps: String,
  Infrastructure: String,
  OS: String,
  Storage: String,
  CDN: String,
  FEServers: String,
  FETechnologies: String,
  FEFrameworks: String,
  FECaching: String,
  BEServers: String,
  BETechnologies: String,
  BEFrameworks: String,
  BECaching: String,
  DB: String,
  DBNotes: String,
  Queues: String,
  Search: String,
  Graph: String,
  Analytics: String,
  References: String
}, { collection: 'Companies'});

models.init = function () {
  log.debug('models.init()');
  models.Company = mongoose.model( 'Company', companySchema );
};

