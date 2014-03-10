var locale = require('./../locale').default();
var models = require('./../models');

exports.index = function (req, res) {
  res.render('index', { name: locale.global.title, description: locale.global.description });
};

exports.locale = function (req, res) {
  res.json(locale);
};

exports.companies = function (req, res) {
  models.Company.find({}).
  sort('Name').
  exec(function (err, docs) {
    if(err) {
      console.log('ERROR with Company: ' + err);
    } else {
      res.json(docs);
    }
  });
}
