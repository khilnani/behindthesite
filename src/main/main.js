

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

btsDirectives.directive('itemDisplayed', ['$templateCache', '$compile', itemDisplayed]);

function itemDisplayed ($templateCache, $compile) {
  console.log('item-displayed')
  return function(scope, element, attrs) {
//    console.log(attrs);
    var ele = angular.element(element);
    var span = ele.find('span');

    var tmpl = $templateCache.get('productHoverTmpl.html')
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

var btsControllers = angular.module('bts.controllers', []);

btsControllers.controller('MainCtrl', ['$scope', 'TaxonomySvc', 'StackSvc', MainCtrl]);

function isMobile() {
  var check = false;
  (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  console.log('MainCtrl.isMobile: ' + check);
  return check;
}

function MainCtrl($scope, TaxonomySvc, StackSvc) {

  var vm = this;
  vm.isMobile = isMobile();
  vm.busy = true;
  vm.headers = [];
  vm.products = [];
  vm.size = 5;
  vm.end = vm.size;

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
  
  vm.getAdditionalData = function () {
    vm.busy = true;
    vm.end = vm.end + vm.size;
    console.log('MainCtrl.getAdditionalData: ' + vm.end);
    window.setTimeout(function () {
      console.log('MainCtrl.getAdditionalData: Timeout');
      vm.updateBusy();
    }, 2000);
  }
  
  vm.updateBusy = function () {
    console.log('MainCtrl.updateBusy');
    vm.busy = false;
  }
  
  vm.getProductData = function () {
    console.log('MainCtrl.getProductData');
    vm.busy = true;
    StackSvc.get(function(res) {
      var products = res.products;
      console.log('MainCtrl.Products: ' + products.length  );
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
          var index = vm.findHeaderIndex( tiers[tier] )
//          console.log('index: ' + index);
//          console.log(tiers[tier].product);
          model.tiers[index].push( tiers[tier] )
        }
//        console.log( i.name );
//        console.log( i.tiers );
        vm.products.push( model )
      } 
      vm.busy = false;
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
      vm.busy = false;
      vm.getProductData();
    });
  }
  
  vm.getData();

}
