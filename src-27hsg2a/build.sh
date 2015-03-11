#!/bin/sh -x

ng-annotate -ar app.js -o app.js --single_quotes
ng-annotate -ar main/main.js -o main/main.js --single_quotes

uglifyjs ../vendor/marked/marked.js \
  ../vendor/jquery/dist/jquery.js \
  ../vendor/bootstrap/dist/js/bootstrap.js \
  ../vendor/angular/angular.js \
  ../vendor/angular-resource/angular-resource.js \
  ../vendor/angular-route/angular-route.js \
  ../vendor/angular-sanitize/angular-sanitize.js \
  ../vendor/angular-loading-bar/build/loading-bar.js \
  ../vendor/ngInfiniteScroll/build/ng-infinite-scroll.js \
  common/base64.enc.js \
  common/logger.js \
  common/localstore.js \
  common/utils.js \
  app.js \
  main/main.enc.js \
  -o ../js/min.js \
  --preamble "/* ####### $(date +"%Y-%m-%d %T %Z") ####### */" \
  -c 'drop_console=true,drop_debugger=true,keep_fargs=true' -m -r '$'
#  --source-map src/min.js.map \
#  -p relative \
