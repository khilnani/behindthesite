var btsApp = angular.module('btsApp', [
    'btsControllers',
    'btsDirectives',
    'btsFilters',
    'btsServices',
    'chieffancypants.loadingBar',
    'ngAnimate'
  ]);
btsApp.config([
  'cfpLoadingBarProvider',
  function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }
]);
btsApp.config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope) {
      return {
        'request': function (config) {
          console.log('Request');
          $rootScope.$broadcast('loading-started');
          return config || $q.when(config);
        },
        'response': function (response) {
          console.log('Response');
          $rootScope.$broadcast('loading-complete');
          return response || $q.when(response);
        }
      };
    });
  }
]);
var btsServices = angular.module('btsServices', ['ngResource']);
btsServices.factory('TaxonomySvc', [
  '$resource',
  function ($resource) {
    return $resource('http://api.behindthesite.com/v1/taxonomy/');
  }
]);
btsServices.factory('StackSvc', [
  '$resource',
  function ($resource) {
    return $resource('http://api.behindthesite.com/v1/stacks/');
  }
]);
var btsDirectives = angular.module('btsDirectives', []);
btsDirectives.directive('loadingIndicator', function () {
  console.log('loadingIndicator');
  return {
    restrict: 'A',
    template: '<div>Loading...</div>',
    link: function (scope, element, attrs) {
      scope.$on('loading-started', function (e) {
        element.css({ 'display': '' });
      });
      scope.$on('loading-complete', function (e) {
        element.css({ 'display': 'none' });
      });
    }
  };
});
btsDirectives.directive('affix', [
  '$templateCache',
  function ($templateCache) {
    console.log('affix');
    return function (scope, element, attrs) {
      var ele = angular.element(element);
      scope.affix_widths = [];
      ele.affix({
        offset: {
          top: function () {
            return $('#main').offset().top;
          }
        }
      });
      ele.on('affix.bs.affix', function (e) {
        console.log('affix.prior');
        var ths = ele.find('th');
        ths.each(function (i) {
          scope.affix_widths[i] = $(this).width();
        });
      });
      ele.on('affixed.bs.affix', function (e) {
        console.log('affix.post');
        var ths = ele.find('th');
        ths.each(function (i) {
          $(this).width(scope.affix_widths[i]);
        });
      });
    };
  }
]);
btsDirectives.directive('itemDisplayed2', [
  '$templateCache',
  '$compile',
  itemDisplayed2
]);
function itemDisplayed2($templateCache, $compile) {
  console.log('itemDisplayed2');
  return function (scope, element, attrs) {
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
    var contentHtml = $compile($templateCache.get('productHoverContentTmpl.html'))(scope);
    var popupConfig = {
        html: true,
        title: attrs.title,
        content: contentHtml,
        placement: 'top',
        template: tmpl,
        trigger: 'manual'
      };
    span.on('click', function (e) {
      console.log('click: ' + span.val());
      span.popover(popupConfig);
      span.popover('show');
    });
    ele.on('shown.bs.popover', function () {
      ele.find('.close-btn').click(function () {
        span.popover('hide');
      });
    });
  };
}
btsDirectives.directive('itemDisplayed', [
  '$templateCache',
  '$compile',
  itemDisplayed
]);
function itemDisplayed($templateCache, $compile) {
  console.log('itemDisplayed');
  return function (scope, element, attrs) {
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
      ele.find('.close-btn').click(function () {
        span.data('state', 'hover');
        span.popover('hide');
      });
    });
  };
}
var btsFilters = angular.module('btsFilters', []);
btsFilters.filter('ws', function () {
  return function (input) {
    if (input) {
      return input.toLowerCase().replace(/[^a-z_]/g, '_');
    }
  };
});
btsFilters.filter('nocraigslist', function () {
  return function (input) {
    var output = [];
    if (input) {
      for (var i in input) {
        if (input[i].name != 'Craigslist Website') {
          output.push(input[i]);
        }
      }
    }
    return output;
  };
});
var btsControllers = angular.module('btsControllers', []);
btsControllers.controller('TableCtrl', [
  '$scope',
  'TaxonomySvc',
  'StackSvc',
  TableCtrl
]);
function TableCtrl($scope, TaxonomySvc, StackSvc) {
  var vm = this;
  vm.headers = [];
  vm.products = [];
  vm.getTaxonomyIds = function (taxonomy) {
    var ids = [];
    ids.push(taxonomy.id);
    for (var i in taxonomy.children) {
      var c = taxonomy.children[i];
      ids = ids.concat(vm.getTaxonomyIds(c));
    }
    return ids;
  };
  vm.findHeaderIndex = function (tier) {
    var id = tier.category.id;
    for (var i in vm.headers) {
      var index = $.inArray(id, vm.headers[i].ids);
      if (index > -1) {
        return i;
      }
    }
    return -1;
  };
  TaxonomySvc.get(function (res) {
    var taxonomy = res.taxonomy;
    console.log('Taxonomy: ' + taxonomy.length);
    for (var index in taxonomy) {
      var t = taxonomy[index];
      var h = { name: t.name };
      h.ids = vm.getTaxonomyIds(t);
      vm.headers.push(h);
    }
  });
  StackSvc.get(function (res) {
    var products = res.products;
    console.log('Products: ' + products.length);
    for (var index in products) {
      var product = products[index];
      var model = { name: product.name };
      model.company = product.company;
      model.tiers = [];
      for (var header in vm.headers) {
        model.tiers[header] = [];
        model.tiers[header].name = vm.headers[header].name;
      }
      var tiers = product.stack.tiers;
      for (var tier in tiers) {
        var i = vm.findHeaderIndex(tiers[tier]);
        model.tiers[i].push(tiers[tier]);
      }
      vm.products.push(model);
    }
  });
}
(function () {
  'use strict';
  angular.module('angular-loading-bar', ['cfp.loadingBarInterceptor']);
  angular.module('chieffancypants.loadingBar', ['cfp.loadingBarInterceptor']);
  angular.module('cfp.loadingBarInterceptor', ['cfp.loadingBar']).config([
    '$httpProvider',
    function ($httpProvider) {
      var interceptor = [
          '$q',
          '$cacheFactory',
          '$timeout',
          '$rootScope',
          'cfpLoadingBar',
          function ($q, $cacheFactory, $timeout, $rootScope, cfpLoadingBar) {
            var reqsTotal = 0;
            var reqsCompleted = 0;
            var latencyThreshold = cfpLoadingBar.latencyThreshold;
            var startTimeout;
            function setComplete() {
              $timeout.cancel(startTimeout);
              cfpLoadingBar.complete();
              reqsCompleted = 0;
              reqsTotal = 0;
            }
            function isCached(config) {
              var cache;
              var defaultCache = $cacheFactory.get('$http');
              var defaults = $httpProvider.defaults;
              if ((config.cache || defaults.cache) && config.cache !== false && (config.method === 'GET' || config.method === 'JSONP')) {
                cache = angular.isObject(config.cache) ? config.cache : angular.isObject(defaults.cache) ? defaults.cache : defaultCache;
              }
              var cached = cache !== undefined ? cache.get(config.url) !== undefined : false;
              if (config.cached !== undefined && cached !== config.cached) {
                return config.cached;
              }
              config.cached = cached;
              return cached;
            }
            return {
              'request': function (config) {
                if (!config.ignoreLoadingBar && !isCached(config)) {
                  $rootScope.$broadcast('cfpLoadingBar:loading', { url: config.url });
                  if (reqsTotal === 0) {
                    startTimeout = $timeout(function () {
                      cfpLoadingBar.start();
                    }, latencyThreshold);
                  }
                  reqsTotal++;
                  cfpLoadingBar.set(reqsCompleted / reqsTotal);
                }
                return config;
              },
              'response': function (response) {
                if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
                  reqsCompleted++;
                  $rootScope.$broadcast('cfpLoadingBar:loaded', {
                    url: response.config.url,
                    result: response
                  });
                  if (reqsCompleted >= reqsTotal) {
                    setComplete();
                  } else {
                    cfpLoadingBar.set(reqsCompleted / reqsTotal);
                  }
                }
                return response;
              },
              'responseError': function (rejection) {
                if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
                  reqsCompleted++;
                  $rootScope.$broadcast('cfpLoadingBar:loaded', {
                    url: rejection.config.url,
                    result: rejection
                  });
                  if (reqsCompleted >= reqsTotal) {
                    setComplete();
                  } else {
                    cfpLoadingBar.set(reqsCompleted / reqsTotal);
                  }
                }
                return $q.reject(rejection);
              }
            };
          }
        ];
      $httpProvider.interceptors.push(interceptor);
    }
  ]);
  angular.module('cfp.loadingBar', []).provider('cfpLoadingBar', function () {
    this.includeSpinner = true;
    this.includeBar = true;
    this.latencyThreshold = 100;
    this.startSize = 0.02;
    this.parentSelector = 'body';
    this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
    this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';
    this.$get = [
      '$injector',
      '$document',
      '$timeout',
      '$rootScope',
      function ($injector, $document, $timeout, $rootScope) {
        var $animate;
        var $parentSelector = this.parentSelector, loadingBarContainer = angular.element(this.loadingBarTemplate), loadingBar = loadingBarContainer.find('div').eq(0), spinner = angular.element(this.spinnerTemplate);
        var incTimeout, completeTimeout, started = false, status = 0;
        var includeSpinner = this.includeSpinner;
        var includeBar = this.includeBar;
        var startSize = this.startSize;
        function _start() {
          if (!$animate) {
            $animate = $injector.get('$animate');
          }
          var $parent = $document.find($parentSelector).eq(0);
          $timeout.cancel(completeTimeout);
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
        function _set(n) {
          if (!started) {
            return;
          }
          var pct = n * 100 + '%';
          loadingBar.css('width', pct);
          status = n;
          $timeout.cancel(incTimeout);
          incTimeout = $timeout(function () {
            _inc();
          }, 250);
        }
        function _inc() {
          if (_status() >= 1) {
            return;
          }
          var rnd = 0;
          var stat = _status();
          if (stat >= 0 && stat < 0.25) {
            rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
          } else if (stat >= 0.25 && stat < 0.65) {
            rnd = Math.random() * 3 / 100;
          } else if (stat >= 0.65 && stat < 0.9) {
            rnd = Math.random() * 2 / 100;
          } else if (stat >= 0.9 && stat < 0.99) {
            rnd = 0.005;
          } else {
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
          completeTimeout = $timeout(function () {
            var promise = $animate.leave(loadingBarContainer, _completeAnimation);
            if (promise && promise.then) {
              promise.then(_completeAnimation);
            }
            $animate.leave(spinner);
          }, 500);
        }
        return {
          start: _start,
          set: _set,
          status: _status,
          inc: _inc,
          complete: _complete,
          includeSpinner: this.includeSpinner,
          latencyThreshold: this.latencyThreshold,
          parentSelector: this.parentSelector,
          startSize: this.startSize
        };
      }
    ];
  });
}());
console.log('2');