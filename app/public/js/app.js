
/*global mainJade */
$(function() {
  var locale;
  console.log('$');
  locale = false;
  console.log('Setting up locale');
  return $.getJSON('api/locale', function(data) {
    var core, util;
    locale = data;
    data = {
      name: locale.global.title,
      description: locale.global.description
    };
    console.log('Replacing #main with jade main template');
    $('#main').html(mainJade(data));
    util = require('util');
    console.log('app: ' + util.test());
    core = require('core');
    return core.alert(locale.global.title);
  });
});
