

//*****************************************************************************
// Services
// https://docs.angularjs.org/api/ngResource/service/$resource

var btsServices = angular.module('bts.services', ['ngResource']);

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

var btsDirectives = angular.module('bts.directives', []);

btsDirectives.directive('affix', ['$templateCache', affix]);

function affix ($templateCache) {
  console.log('affix')
  return function(scope, element, attrs) {
    var ele = angular.element(element);

    scope.affix_widths = [];

    ele.affix({
      offset: {
        top: function() { 
          return  $('#main').offset().top;
        }
      }
    })

    ele.on('affix.bs.affix', function (e) {
      console.log('affix.prior');

      var ths = ele.find('th');
      ths.each(function(i) { 
        scope.affix_widths[i] = $(this).width();
      })

    });

    ele.on('affixed.bs.affix', function (e) {
      console.log('affix.post');
      var ths = ele.find('th');
      ths.each(function(i) {
        $(this).width(scope.affix_widths[i]);
        //console.log(scope.affix_widths[i])
      })
    });
  };
}

btsDirectives.directive('collapse', collapse);

function collapse () {
  console.log('collapse')
  return function(scope, element, attrs) {
    var ele = angular.element(element);

    ele.on('shown.bs.collapse', function (e) {
      console.log('shown.bs.collapse');
      $('html, body').animate({
        scrollTop: ele.offset().top
      }, 500);
    });
  };
}

btsDirectives.directive('popover', ['$templateCache', '$compile', popover]);

function popover ($templateCache, $compile) {
  console.log('popover')
  return function(scope, element, attrs) {
    //console.log(attrs);
    var ele = angular.element(element);
    var span = ele.find('span');

    var tmpl = $templateCache.get('hoverTmpl.html')

    var popupConfig = {
      html: true,
      title: attrs.title,
      content: attrs.content,
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
}

btsDirectives.directive('product', ['$templateCache', '$compile', product]);

function product ($templateCache, $compile) {
  console.log('product')
  return function(scope, element, attrs) {
//    console.log(attrs);
    var ele = angular.element(element);
    var span = ele.find('span');

    var tmpl = $templateCache.get('hoverTmpl.html')
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
}

//*****************************************************************************
// filters
// https://docs.angularjs.org/guide/filter

var btsFilters = angular.module('bts.filters', []);

btsFilters.filter('ws', function () {
  return function (input) {
    if (input) {
      return input.toLowerCase().replace(/[^a-z_]/g, '_');
    }
  };
});

//*****************************************************************************
// Controllers
// https://docs.angularjs.org/api/ng/directive/ngController

var btsControllers = angular.module('bts.controllers', []);

btsControllers.controller('MainCtrl', ['$scope', '$timeout', 'Common', 'TaxonomySvc', 'StackSvc', MainCtrl]);

function MainCtrl($scope, $timeout, Common, TaxonomySvc, StackSvc) {

  var vm = this;
  vm.isMobile = Common.isMobile;
  vm.busy = true;
  vm.headers = [];
  vm.products = [];
  vm.size = 5;
  vm.end = 0;
  vm.hasMore = true;
  
  vm.total = function () {
    return vm.products.length;
  }
  
  vm.increment = function () {
    vm.end = vm.end + vm.size;
    if(vm.end >= vm.products.length) {
      vm.end = vm.products.length;
      vm.hasMore = false;
    }
    console.log('MainCtrl.increment: ' + vm.end);
  }
  
  vm.backToTop = function (id) {
    console.log('MainCtrl.backToTop: ' + id);
    $('html, body').animate({
      scrollTop: $('#' + id + '-panel').offset().top
    }, 500);
  }
  
  vm.updateBusy = function () {
    vm.busy = false;
    console.log('MainCtrl.updateBusy: ' + vm.busy);
  }

  vm.getTaxonomyIds = function (taxonomy) {
    var ids = [];
    ids.push( taxonomy.id );
    for( var i in taxonomy.children ) {
      var c = taxonomy.children[i];
      ids = ids.concat( vm.getTaxonomyIds(c) );
    }
    return ids;
  }

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
  }
  
  vm.getProducts = function () {
    console.log('MainCtrl.getProducts: end: ' + vm.end);
    return vm.products.slice(0, vm.end);
  }
  
  vm.delayedGetAdditionalData = function () {
    console.log('MainCtrl.delayedGetAdditionalData');
    // allow the busy icon to display before rendering (freezes otherwise and busy indicator doesnt show)
    vm.busy = true;
    $timeout(function () {
      console.log('MainCtrl.delayedGetAdditionalData: Timeout');
      vm.getAdditionalData();
    }, 500);
  }
  
  vm.getAdditionalData = function () {
    vm.busy = true;
    vm.increment();
    console.log('MainCtrl.getAdditionalData: ' + vm.end);
    $timeout(function () {
      console.log('MainCtrl.getAdditionalData: Timeout');
      vm.updateBusy();
    }, 2000);
  }
  
  vm.getProductData = function () {
    console.log('MainCtrl.getProductData');
    vm.busy = true;
    StackSvc.get(function(res) {
      var products = res.products;
      console.log('MainCtrl.Products: ' + products.length  );
      for(var index in products) {
        var product = products[index];
        var model = { 
          name: product.name,
          website: product.website,
          description: product.description,
          twitter: product.twitter,
          facebook: product.facebook,
          irc: product.irc,
          blogs: product.blogs,
          repo: product.repo,
          issues: product.issues,
          docs: product.docs,
          updated: product.stack.updated,
          insight: marked( product.stack.insight ),
          notes: marked( product.stack.notes ),
          references: marked( product.stack.references )
        };
        model.company = product.company;
        model.tiers = [];
        for(var header in vm.headers) {
          model.tiers[header] = [];
          model.tiers[header].name = vm.headers[header].name;
        }
        var tiers = product.stack.tiers;
        for(var tier in tiers) {
          var index = vm.findHeaderIndex( tiers[tier] )
//          console.log('index: ' + index);
//          console.log(tiers[tier].product);
          model.tiers[index].push( tiers[tier] )
        }
//        console.log( i.name );
//        console.log( i.tiers );
        vm.products.push( model )
      } 
      
      vm.increment();
      vm.updateBusy();
    });
      // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$broadcast downward
      // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#emit upward
      //  $scope.$emit('MainCtrl.completed');    
      //  $scope.$broadcast('MainCtrl.completed');
  }
  
  vm.getData = function () {
    console.log('MainCtrl.getData()');
    vm.busy = true;
    TaxonomySvc.get(function(res) {
      var taxonomy = res.taxonomy;
      console.log('MainCtrl.Taxonomy: ' + taxonomy.length  );
      for(var index in taxonomy) {
        var t = taxonomy[index];
        var h = { name: t.name }
        h.ids = vm.getTaxonomyIds( t );
//        console.log( h.name + ', ' + h.ids);
        vm.headers.push( h )
      }
      vm.updateBusy();
      vm.getProductData();
    });
  }
  
  vm.getData();

}
