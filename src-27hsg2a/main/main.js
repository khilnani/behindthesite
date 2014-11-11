

//*****************************************************************************
// Services
// https://docs.angularjs.org/api/ngResource/service/$resource

angular.module('bts.services', ['ngResource'])

.factory('TaxonomySvc', ['$resource', function($resource){
  return $resource('http://api.behindthesite.com/v1/taxonomy/', {}, {
    get: {
      method: 'GET',
        cache : true,
        transformResponse: function (data, headers) {
            if(data) {
              data = w.__(w.__(y.__(data), 5), 9);
              data = JSON.parse(data);
            }
            return data;
          }
        }
    });
  }])

.factory('StackSvc', ['$resource', function($resource){
  return $resource('http://api.behindthesite.com/v1/stacks/', {}, {
    get: {
      method: 'GET',
        cache : true,
        transformResponse: function (data, headers) {
            if(data) {
              data = w.__(w.__(y.__(data), 5), 9);
              data = JSON.parse(data);
            }
            return data;
          }
        }
    });
  }])
  
.factory('ProductSvc', ['$resource', function($resource){
  return $resource('http://api.behindthesite.com/v1/products/', {}, {
    get: {
      method: 'GET',
        cache : true,
        transformResponse: function (data, headers) {
            if(data) {
              data = w.__(w.__(y.__(data), 5), 9);
              data = JSON.parse(data);
            }
            return data;
          }
        }
    });
  }])
  
.factory('UsedProductSvc', ['$resource', function($resource){
  return $resource('http://api.behindthesite.com/v1/products/used/', {}, {
    get: {
      method: 'GET',
        cache : true,
        transformResponse: function (data, headers) {
            if(data) {
              data = w.__(w.__(y.__(data), 5), 9);
              data = JSON.parse(data);
            }
            return data;
          }
        }
    });
  }])
  
.factory('SubmitSvc', ['$resource', function($resource){
  return $resource('http://api.behindthesite.com/v1/submit/', {}, {
    post: {
      method: 'POST',
        transformResponse: function (data, headers) {
            if(data) {
              data = JSON.parse(data);
            }
            return data;
          }
        }
    });
  }]);

//*****************************************************************************
// Directives
// https://docs.angularjs.org/guide/directive

angular.module('bts.directives', [])

.directive('affix', ['$templateCache', function ($templateCache) {
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
}])

.directive('collapse', function () {
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
})

.directive('popover', ['$templateCache', '$compile', function ($templateCache, $compile) {
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
      $("a[href^='http']").attr("target","_blank");
      ele.find('.close-btn').click( function () {
        span.data('state', 'hover');
        span.popover('hide');
      });        
    });
  };
}])

.directive('product', ['$templateCache', '$compile', function ($templateCache, $compile) {
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
      $("a[href^='http']").attr("target","_blank");
      ele.find('.close-btn').click( function () {
        span.data('state', 'hover');
        span.popover('hide');
      });        
    });
  };
}]);

//*****************************************************************************
// filters
// https://docs.angularjs.org/guide/filter

angular.module('bts.filters', [])

.filter('ws', function () {
  return function (input) {
    if (input) {
      return input.toLowerCase().replace(/[^a-z_]/g, '_');
    }
  };
})

.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

//*****************************************************************************
// Controllers
// https://docs.angularjs.org/api/ng/directive/ngController

angular.module('bts.controllers', [])

.controller('SubmissionForm', ['$scope', 'SubmitSvc', 'ProductSvc', function($scope, SubmitSvc, ProductSvc) {
  
  $scope.products = [];
  
  $scope.init = function () {
    console.log('SubmissionForm.init');
    $scope.clear();
    $scope.reset();
    $scope.add();
    $scope.update($scope.submission);
  }
  
  ProductSvc.get(function(res) {
    //alert('get');
    console.log('ProductSvc.get');
    //console.log(res);
    for(var i=0; i < res.products.length; i++) {
      $scope.products.push({
        'value': res.products[i].id,
        'key': res.products[i].name
      });
    }
    $scope.init();
    //alert('done');
  });
  
  $scope.clear = function () {
    $scope.master = {};
    $scope.master.tiers = [];
  }
    
  $scope.add = function() {
    var newItemNo = $scope.submission.tiers.length+1;
    console.log('SubmissionForm.add: ' + newItemNo)
    $scope.submission.tiers.push({
      'id': newItemNo,
      'product': '-1'
    });
  };

  $scope.delete = function(id) {
    console.log('SubmissionForm.delete: ' + id);
    var tiers = $scope.submission.tiers;
    var newArr = [];
    for(var i=0; i < tiers.length; i++) {
      if( tiers[i].id != id ) {
        newArr.push( tiers[i] );
      }
    }
    for(var i=0; i < newArr.length; i++) {
      newArr[i].id = i+1;
    }
    $scope.submission.tiers = newArr;
  };
  
  $scope.update = function(submission) {
    $scope.master = angular.copy(submission);
  }

  $scope.save = function(submission) {
    $scope.master = angular.copy(submission);
    console.log('SubmissionForm.save');
    console.log($scope.master);
    
    SubmitSvc.post( $scope.master, function (res) {
      console.log('SubmissionForm.saved');
      console.log(res);
      $scope.init();
      $('#SubmissionModal').modal('hide');
    });
  };

  $scope.reset = function() {
    $scope.submission = angular.copy($scope.master);
  };

  $scope.isUnchanged = function(submission) {
    return angular.equals(submission, $scope.master);
  };

}])

.controller('MainCtrl', ['$scope', '$routeParams', '$timeout', '$sce', '$filter', 'Common', 'TaxonomySvc', 'StackSvc', 'UsedProductSvc', function ($scope, $routeParams, $timeout, $sce, $filter, Common, TaxonomySvc, StackSvc, UsedProductSvc) {

  var vm = this;
  vm.isMobile = Common.isMobile;
  vm.busy = true;
  vm.query_tech = '';
  vm.query_product = '';
  vm.headers = [];
  vm.products = [];
  vm.tech_select_list = [];
  vm.products_select_list = [];
  
  vm.currentPage = 0;
  // pagination, page size loaded limited by infinitePageSize if greater, see pageLimit. use pageLimit in html ng-repeat
  vm.pageSize = 10;  
  
  vm.infiniteCount = 0;
  vm.infinitePageSize = 5; 
  
  vm.hasMore = true;
  
  console.log('$routeParams.selectedProduct:' + $routeParams.selectedProduct );
  console.log('$routeParams.selectedTech:' + $routeParams.selectedTech );
  
  if($routeParams.selectedProduct != undefined) {
    vm.query_product = $routeParams.selectedProduct;
  }
  
  if($routeParams.selectedTech != undefined) {
    vm.query_tech = $routeParams.selectedTech;
  }
  
  vm.total = function () {
    return vm.products.length;
  }
  
  // pagination, page size loaded limited by infinitePageSize if greater, see pageLimit. use pageLimit in html ng-repeat
  vm.pageLimit = function () {
    var ret = vm.pageSize;
    console.log('vm.pageLimit: PRE vm.infinitePageSize: ' + vm.infiniteCount + " < " + vm.pageSize);
    if( vm.infiniteCount < vm.pageSize ) {
      ret = vm.infiniteCount;
    }
    console.log('vm.pageLimit: POST: ' + ret);
    return ret;
  }
  
  // respect page size
  // was return (vm.infiniteCount + vm.infinitePageSize < vm.pageSize);
  vm.shouldIncrementInfiniteCount = function () {
    if (vm.pageLimit() < vm.pageSize) {
      return true;
    }
    return false;
  }
  
  // assumes called called vm.shouldIncrementInfiniteCount() already
  vm.incrementInfiniteCount = function () {
    vm.infiniteCount = vm.infiniteCount + vm.infinitePageSize;
    if(vm.infiniteCount >= vm.products.length) {
      vm.infiniteCount = vm.products.length;
      vm.hasMore = false;
    }
    console.log('MainCtrl.incrementInfiniteCount: ' + vm.infiniteCount);
  }
  
  vm.getFilteredProducts = function () {
    // https://docs.angularjs.org/api/ng/filter/filter
    return $filter('filter')(vm.products, vm.filter);
  }
  
  vm.numberOfPages = function () {
    var n = Math.ceil( vm.getFilteredProducts().length / vm.pageSize);
    if(n == 0) n = 1;
    return n;
  }

  vm._escapeRegExp = function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  vm._matchProduct = function (element) {
    //console.log('_matchProduct');
    var match = false;
    //var re = new RegExp( vm._escapeRegExp( vm.query_product ), 'i' );
    //match = (element.name.match(re) ) ? true : false;
    if(element && element.name) {
      match = (element.name.toLowerCase() == vm.query_product.toLowerCase());
    }
    return match;
  }

  vm._matchTech = function (element, q) {
    console.log('_matchMatch: ' + q);
    var match = false;
    var m = false;
    var t, p;
    //var re = new RegExp( vm._escapeRegExp( q ), 'i' );
    for(var i=0; i < element.tiers.length; i++) {
      t = element.tiers[i];
      for(var j=0; j < t.length; j++) {
        p = t[j].product
        //m = p.name.match(re);
        m = (p.name.toLowerCase() == q.toLowerCase());
        //console.log( p.name + ',' + m);
        if(m) {
          match = true;
          break;
        }
      }
    }
    return match;
  }
  
  vm.highlight = function (text) {
    if (!vm.query_tech) {
        return $sce.trustAsHtml(text);
    }
    return $sce.trustAsHtml(text.replace(vm.query_tech, '<span class="highlight">$&</span>','gi'));
  }

  vm.filter = function (element) {
    //console.log('MainCtrl.filter');
    //console.log(element);
    
    if(vm.query_product == undefined) vm.query_product = '';
    //console.log('vm.query_tech: ' + vm.query_tech);
    //console.log('vm.query_product: ' + vm.query_product);

    var match = false;

    if( vm.query_product == '' && vm.query_tech == '') {
      //console.log('No filter');
      match = true;
    } else if( vm.query_product != '' && vm.query_tech == '') {
      //console.log('Only product');
      match = vm._matchProduct(element);
    } else if( vm.query_product == '' && vm.query_tech != '') {
      //console.log('Only text');
      match = vm._matchTech(element, vm.query_tech);
    } else if( vm.query_product != '' && vm.query_tech != '') {
      console.log('Both product and text');
      match = vm._matchProduct(element) && vm._matchTech(element, vm.query_tech);
    } else  {
      //console.log('Invalid case.');
      match = true;
    }
    return match;
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
  
  // will get additional data regardless of pagination
  vm.getAdditionalData = function () {
    console.log('MainCtrl.mobileGetAdditionalData');
    // allow the busy icon to display before rendering (freezes otherwise and busy indicator doesnt show)
    vm.busy = true;
    $timeout(function () {
      console.log('MainCtrl.mobileGetAdditionalData: Timeout');
      vm._getAdditionalData();
    }, 500);
  }
  
  // inifite loading within pagination
  vm.infiniteGetAdditionalData = function () {
    console.log('MainCtrl.infiniteGetAdditionalData');
    if( vm.shouldIncrementInfiniteCount() ) {
      vm._getAdditionalData();
    }
  }
  
  // internal keep busy to prevent too many re-triggers
  vm._getAdditionalData = function () {
    vm.busy = true;
    vm.incrementInfiniteCount();
    console.log('MainCtrl._getAdditionalData: ' + vm.infiniteCount);
    $timeout(function () {
      console.log('MainCtrl._getAdditionalData: Timeout');
      vm.updateBusy();
    }, 2000);
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
          var index = vm.findHeaderIndex( tiers[tier] );
          if(tiers[tier].notes) {
            tiers[tier].notes = marked( tiers[tier].notes );
          }
//          console.log('index: ' + index);
//          console.log(tiers[tier].product);
          model.tiers[index].push( tiers[tier] )
        }
//        console.log( i.name );
//        console.log( i.tiers );
        vm.products.push( model )
      } 
      
      vm.incrementInfiniteCount();
      vm.updateBusy();
      vm.getSelectListData();
    });
      // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$broadcast downward
      // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#emit upward
      //  $scope.$emit('MainCtrl.completed');    
      //  $scope.$broadcast('MainCtrl.completed');
  }

  vm.getFilteredSelectListData = function () {
    ProductSvc.get(function(res) {
      console.log('MainCtrl.getSelectListData: ProductSvc.get');
      // List of All Products
      var list = [ {id:'', name:''}]
      var found = false;
      var n;
      for(var i=0; i < res.products.length; i++) {
        n = res.products[i].name;
        //console.log( n )
        for(var ea in vm.products) {
          if( vm._matchTech( vm.products[ea], n ) ) {
            list.push({
              'id': n,
              'name': n
            });
            break;
          }
        }
      }
      vm.tech_select_list = list;
      vm.updateSelectLists();
    });
  }

  vm.getSelectListData = function () {
    UsedProductSvc.get(function(res) {
      console.log('MainCtrl.getSelectListData: UsedProductSvc.get');
      // List of All Products
      var list = [ {id:'', name:''}]
      for(var i=0; i < res.products.length; i++) {
        //console.log(res.products[i].name)
        list.push({
          'id': res.products[i].name,
          'name': res.products[i].name
        });
      }
      vm.tech_select_list = list;
      vm.updateSelectLists();
    });
  }

  vm.updateSelectLists = function () {
    console.log('MainCtrl.updateSelectLists');
    // List of Products/Stacks
    var list = [ {id:'', name:''}]
    var name;
    for(var i=0; i < vm.products.length; i++) {
      list.push( {
        id: vm.products[i].name, 
        name: vm.products[i].name
      });
    }
    vm.products_select_list = list;
  }

  vm.getData();

}]);
