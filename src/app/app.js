/*

http://api.jquery.com/
https://docs.angularjs.org/api/ng/function/angular.element
http://jsfiddle.net/hajpoj/JJQS9/15/
https://thinkster.io/angulartutorial/a-better-way-to-learn-angularjs/
https://docs.angularjs.org/

*/

//***************************************************************************** 
// App

var btsApp = angular.module('btsApp', ['btsControllers', 'btsDirectives', 'btsFilters', 'btsServices','chieffancypants.loadingBar', 'ngAnimate']);

btsApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true; 
    cfpLoadingBarProvider.includeBar = true;
  }]);

btsApp.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($q, $rootScope) {
    return {
      'request': function(config) {
        console.log('Request');
        $rootScope.$broadcast('loading-started');
        return config || $q.when(config);
      },
      'response': function(response) {
        console.log('Response');
        $rootScope.$broadcast('loading-complete');
        return response || $q.when(response);
      }
    };
  });
});

//*****************************************************************************
// Services
// https://docs.angularjs.org/api/ngResource/service/$resource

var btsServices = angular.module('btsServices', ['ngResource']);

btsServices.factory('TaxonomySvc', ['$resource',
  function($resource){
    return $resource('http://api.behindthesite.com/v1/taxonomy/');
  }]);

btsServices.factory('StackSvc', ['$resource',
  function($resource){
    return $resource('http://api.behindthesite.com/v1/stacks/');
  }]);

//*****************************************************************************
// Directives
// https://docs.angularjs.org/guide/directive

var btsDirectives = angular.module('btsDirectives', []);

btsDirectives.directive('loadingIndicator', function() {
  console.log('loadingIndicator');
  return {
    restrict : "A",
    template: "<div>Loading...</div>",
    link : function(scope, element, attrs) {
      scope.$on("loading-started", function(e) {element.css({"display" : ""});
      });

      scope.$on("loading-complete", function(e) {
        element.css({"display" : "none"});
      });

    }
  };
  });

btsDirectives.directive('affix', function($templateCache) {
  console.log('affix');
    return function(scope, element, attrs) {
      var ele = angular.element(element);

      scope.affix_widths = [];

      ele.affix({
        offset: {
          top: function() { 
            return  $('#main').offset().top;
          }
        }
      });

      ele.on('affix.bs.affix', function (e) {
        console.log('affix.prior');

        var ths = ele.find('th');
        ths.each(function(i) { 
          scope.affix_widths[i] = $(this).width();
        });

      });

      ele.on('affixed.bs.affix', function (e) {
        console.log('affix.post');
        var ths = ele.find('th');
        ths.each(function(i) {
          $(this).width(scope.affix_widths[i]);
          //console.log(scope.affix_widths[i])
        });
      });

    };
  });

btsDirectives.directive('itemDisplayed', function($templateCache, $compile) {
  console.log('itemDisplayed');
    return function(scope, element, attrs) {
      var ele = angular.element(element);
      var span = ele.find('span');

      var tmpl = $templateCache.get('productHoverTmpl.html');
      scope.website = attrs.website;
      scope.twitter = attrs.twitter;
      scope.irc = attrs.irc;
      scope.blogs = attrs.blogs;
      scope.description = attrs.description;
      scope.repo = attrs.repo;
      scope.issues = attrs.issues;
      scope.docs = attrs.docs;
      scope.category = attrs.category;
      scope.categorypath = attrs.categorypath;
      scope.notes = attrs.notes;
      // https://docs.angularjs.org/api/ng/service/$compile
      var contentHtml = $compile($templateCache.get('productHoverContentTmpl.html'))(scope);

      var popupConfig = {
        html: true,
        title: attrs.title,
        content: contentHtml,
        placement: 'top',
        template: tmpl,
        trigger: 'manual'
      };

      span.data('state', 'hover');
      span.popover(popupConfig);
      span.on('mouseenter', function (e) { 
        if (span.data('state') === 'hover') {
          span.popover('show');
        }
      });
      span.on('mouseleave', function (e) { 
        if (span.data('state') === 'hover') {
          span.popover('hide');
        }
      });
      span.on('click', function (e) { 
        if (span.data('state') === 'hover') {
            span.data('state', 'pinned');
        } else {
            span.data('state', 'hover');
            span.popover('hide');
        }
      });

      ele.on('shown.bs.popover', function () {
        ele.find('.close-btn').click( function () {
          span.data('state', 'hover');
          span.popover('hide');
        });        
      });

    };
  });

//*****************************************************************************
// filters
// https://docs.angularjs.org/guide/filter

var btsFilters = angular.module('btsFilters', []);

btsFilters.filter('ws', function () {
    return function (input) {
      if (input) {
        return input.toLowerCase().replace(/[^a-z_]/g, '_');
      }
    };
  });

btsFilters.filter('nocraigslist', function() {
  return function(input) {
    var output = [];
    if(input) {
      for(var i in input) {
        if(input[i].name != 'Craigslist Website' ) {
          output.push(input[i]);
        }
      }
    }
    return output;
  };
});

//*****************************************************************************
// Controllers
// https://docs.angularjs.org/api/ng/directive/ngController

var btsControllers = angular.module('btsControllers', []);

btsControllers.controller('TableCtrl', TableCtrl);

function TableCtrl($scope, TaxonomySvc, StackSvc) {

  var vm = this;
  vm.headers = [];
  vm.products = [];

  vm.getTaxonomyIds = function (taxonomy) {
    var ids = [];
    ids.push( taxonomy.id );
    for( var i in taxonomy.children ) {
      var c = taxonomy.children[i];
      ids = ids.concat( vm.getTaxonomyIds(c) );
    }
    return ids;
  };

  vm.findHeaderIndex = function (tier) {
    var id = tier.category.id;
//    console.log('Searching for: ' + id + ' ' + typeof(id) );
    for(var i in vm.headers) {
//      console.log('In: ' + vm.headers[i].ids);
      var index = $.inArray(id, vm.headers[i].ids);
      if(index > -1) {
        return i;
      }
    }
    return -1;
  };

  TaxonomySvc.get(function(res) {
      var taxonomy = res.taxonomy;
      console.log('Taxonomy: ' + taxonomy.length  );
      for(var index in taxonomy) {
        var t = taxonomy[index];
        var h = { name: t.name };
        h.ids = vm.getTaxonomyIds( t );
//        console.log( h.name + ', ' + h.ids);
        vm.headers.push( h );
      }

    });

  StackSvc.get(function(res) {
      var products = res.products;
      console.log('Products: ' + products.length  );
      for(var index in products) {
        var product = products[index];
        var model = { name: product.name };
        model.company = product.company;
        model.tiers = [];
        for(var header in vm.headers) {
          model.tiers[header] = [];
          model.tiers[header].name = vm.headers[header].name;
        }
        var tiers = product.stack.tiers;
        for(var tier in tiers) {
          var i = vm.findHeaderIndex( tiers[tier] );
//          console.log('index: ' + index);
//          console.log(tiers[tier].product);
          model.tiers[i].push( tiers[tier] );
        }
//        console.log( i.name );
//        console.log( i.tiers );
        vm.products.push( model );
      } 

    // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$broadcast downward
    // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#emit upward
    // $scope.$emit('TableCtrl.completed');    
    // $scope.$broadcast('TableCtrl.completed');

    });

}

/*! 
 * angular-loading-bar v0.6.0
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2014 Wes Cruver
 * License: MIT
 */
/*
 * angular-loading-bar
 *
 * intercepts XHR requests and creates a loading bar.
 * Based on the excellent nprogress work by rstacruz (more info in readme)
 *
 * (c) 2013 Wes Cruver
 * License: MIT
 */

(function() {

'use strict';

// Alias the loading bar for various backwards compatibilities since the project has matured:
angular.module('angular-loading-bar', ['cfp.loadingBarInterceptor']);
angular.module('chieffancypants.loadingBar', ['cfp.loadingBarInterceptor']);

/**
 * loadingBarInterceptor service
 *
 * Registers itself as an Angular interceptor and listens for XHR requests.
 */
angular.module('cfp.loadingBarInterceptor', ['cfp.loadingBar'])
  .config(['$httpProvider', function ($httpProvider) {

    var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, cfpLoadingBar) {

      /**
       * The total number of requests made
       */
      var reqsTotal = 0;

      /**
       * The number of requests completed (either successfully or not)
       */
      var reqsCompleted = 0;

      /**
       * The amount of time spent fetching before showing the loading bar
       */
      var latencyThreshold = cfpLoadingBar.latencyThreshold;

      /**
       * $timeout handle for latencyThreshold
       */
      var startTimeout;

      /**
       * calls cfpLoadingBar.complete() which removes the
       * loading bar from the DOM.
       */
      function setComplete() {
        $timeout.cancel(startTimeout);
        cfpLoadingBar.complete();
        reqsCompleted = 0;
        reqsTotal = 0;
      }

      /**
       * Determine if the response has already been cached
       * @param  {Object}  config the config option from the request
       * @return {Boolean} retrns true if cached, otherwise false
       */
      function isCached(config) {
        var cache;
        var defaultCache = $cacheFactory.get('$http');
        var defaults = $httpProvider.defaults;

        // Choose the proper cache source. Borrowed from angular: $http service
        if ((config.cache || defaults.cache) && config.cache !== false &&
          (config.method === 'GET' || config.method === 'JSONP')) {
            cache = angular.isObject(config.cache) ? config.cache
              : angular.isObject(defaults.cache) ? defaults.cache
              : defaultCache;
        }

        var cached = cache !== undefined ?
          cache.get(config.url) !== undefined : false;

        if (config.cached !== undefined && cached !== config.cached) {
          return config.cached;
        }
        config.cached = cached;
        return cached;
      }

      return {
        'request': function(config) {
          // Check to make sure this request hasn't already been cached and that
          // the requester didn't explicitly ask us to ignore this request:
          if (!config.ignoreLoadingBar && !isCached(config)) {
            $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
            if (reqsTotal === 0) {
              startTimeout = $timeout(function() {
                cfpLoadingBar.start();
              }, latencyThreshold);
            }
            reqsTotal++;
            cfpLoadingBar.set(reqsCompleted / reqsTotal);
          }
          return config;
        },

        'response': function(response) {
          if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return response;
        },

        'responseError': function(rejection) {
          if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return $q.reject(rejection);
        }
      };
    }];

    $httpProvider.interceptors.push(interceptor);
  }]);

/**
 * Loading Bar
 *
 * This service handles adding and removing the actual element in the DOM.
 * Generally, best practices for DOM manipulation is to take place in a
 * directive, but because the element itself is injected in the DOM only upon
 * XHR requests, and it's likely needed on every view, the best option is to
 * use a service.
 */
angular.module('cfp.loadingBar', [])
  .provider('cfpLoadingBar', function() {

    this.includeSpinner = true;
    this.includeBar = true;
    this.latencyThreshold = 100;
    this.startSize = 0.02;
    this.parentSelector = 'body';
    this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
    this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

    this.$get = ['$injector', '$document', '$timeout', '$rootScope', function ($injector, $document, $timeout, $rootScope) {
      var $animate;
      var $parentSelector = this.parentSelector,
        loadingBarContainer = angular.element(this.loadingBarTemplate),
        loadingBar = loadingBarContainer.find('div').eq(0),
        spinner = angular.element(this.spinnerTemplate);

      var incTimeout,
        completeTimeout,
        started = false,
        status = 0;

      var includeSpinner = this.includeSpinner;
      var includeBar = this.includeBar;
      var startSize = this.startSize;

      /**
       * Inserts the loading bar element into the dom, and sets it to 2%
       */
      function _start() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        var $parent = $document.find($parentSelector).eq(0);
        $timeout.cancel(completeTimeout);

        // do not continually broadcast the started event:
        if (started) {
          return;
        }

        $rootScope.$broadcast('cfpLoadingBar:started');
        started = true;

        if (includeBar) {
          $animate.enter(loadingBarContainer, $parent);
        }

        if (includeSpinner) {
          $animate.enter(spinner, $parent);
        }

        _set(startSize);
      }

      /**
       * Set the loading bar's width to a certain percent.
       *
       * @param n any value between 0 and 1
       */
      function _set(n) {
        if (!started) {
          return;
        }
        var pct = (n * 100) + '%';
        loadingBar.css('width', pct);
        status = n;

        // increment loadingbar to give the illusion that there is always
        // progress but make sure to cancel the previous timeouts so we don't
        // have multiple incs running at the same time.
        $timeout.cancel(incTimeout);
        incTimeout = $timeout(function() {
          _inc();
        }, 250);
      }

      /**
       * Increments the loading bar by a random amount
       * but slows down as it progresses
       */
      function _inc() {
        if (_status() >= 1) {
          return;
        }

        var rnd = 0;

        // TODO: do this mathmatically instead of through conditions

        var stat = _status();
        if (stat >= 0 && stat < 0.25) {
          // Start out between 3 - 6% increments
          rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        } else if (stat >= 0.25 && stat < 0.65) {
          // increment between 0 - 3%
          rnd = (Math.random() * 3) / 100;
        } else if (stat >= 0.65 && stat < 0.9) {
          // increment between 0 - 2%
          rnd = (Math.random() * 2) / 100;
        } else if (stat >= 0.9 && stat < 0.99) {
          // finally, increment it .5 %
          rnd = 0.005;
        } else {
          // after 99%, don't increment:
          rnd = 0;
        }

        var pct = _status() + rnd;
        _set(pct);
      }

      function _status() {
        return status;
      }

      function _completeAnimation() {
        status = 0;
        started = false;
      }

      function _complete() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        $rootScope.$broadcast('cfpLoadingBar:completed');
        _set(1);

        $timeout.cancel(completeTimeout);

        // Attempt to aggregate any start/complete calls within 500ms:
        completeTimeout = $timeout(function() {
          var promise = $animate.leave(loadingBarContainer, _completeAnimation);
          if (promise && promise.then) {
            promise.then(_completeAnimation);
          }
          $animate.leave(spinner);
        }, 500);
      }

      return {
        start            : _start,
        set              : _set,
        status           : _status,
        inc              : _inc,
        complete         : _complete,
        includeSpinner   : this.includeSpinner,
        latencyThreshold : this.latencyThreshold,
        parentSelector   : this.parentSelector,
        startSize        : this.startSize
      };

    }];     //
  });       // wtf javascript. srsly
})();       //
