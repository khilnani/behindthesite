#!/bin/sh -x

ng-annotate -ar app.js -o app.js --single_quotes
ng-annotate -ar main/main.js -o main/main.js --single_quotes

uglifyjs ../vendor/marked/marked.js \
  ../vendor/jquery/dist/jquery.min.js \
  ../vendor/bootstrap/dist/js/bootstrap.min.js \
  ../vendor/angular/angular.min.js \
  ../vendor/angular-resource/angular-resource.min.js \
  ../vendor/angular-route/angular-route.min.js \
  ../vendor/angular-animate/angular-animate.min.js \
  ../vendor/angular-sanitize/angular-sanitize.min.js \
  ../vendor/angular-loading-bar/build/loading-bar.min.js \
  ../vendor/ngInfiniteScroll/build/ng-infinite-scroll.min.js \
  app.js \
  main/main.js \
  -o ../_/js/min.js \
  -c 'drop_console=true,drop_debugger=true,keep_fargs=true' -m -r '$'
#  --source-map src/min.js.map \
#  -p relative \
