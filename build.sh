#!/bin/sh -x

ng-annotate -ar src/app.js -o src/app.js --single_quotes
ng-annotate -ar src/main/main.js -o src/main/main.js --single_quotes

uglifyjs src/vendor/marked/marked.js \
  src/vendor/jquery/dist/jquery.min.js \
  src/vendor/bootstrap/dist/js/bootstrap.min.js \
  src/vendor/angular/angular.min.js \
  src/vendor/angular-resource/angular-resource.min.js \
  src/vendor/angular-route/angular-route.min.js \
  src/vendor/angular-animate/angular-animate.min.js \
  src/vendor/angular-sanitize/angular-sanitize.min.js \
  src/vendor/angular-loading-bar/build/loading-bar.min.js \
  src/vendor/ngInfiniteScroll/build/ng-infinite-scroll.min.js \
  src/app.js \
  src/main/main.js \
  -o _/js/min.js \
  -c 'drop_console=true,drop_debugger=true,keep_fargs=true' -m -r '$'
#  --source-map src/min.js.map \
#  -p relative \
