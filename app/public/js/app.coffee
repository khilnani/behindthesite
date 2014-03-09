###global mainJade ###

$ ->
  console.log '$'
  locale = false

  console.log 'Setting up locale'
  $.getJSON 'api/locale', (data) -> 
    locale = data

    data = {name: locale.global.title, description: locale.global.description}

    console.log 'Replacing #main with jade main template'
    $('#main').html mainJade(data)

    util= require 'util'
    console.log 'app: ' + util.test()

    core = require 'core'
    core.alert locale.global.title

