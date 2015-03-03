/*

http://api.jquery.com/
https://docs.angularjs.org/api/ng/function/angular.element
http://jsfiddle.net/hajpoj/JJQS9/15/
https://thinkster.io/angulartutorial/a-better-way-to-learn-angularjs/
https://docs.angularjs.org/

*/

//*****************************************************************************
// Utilities

var window.Utils = {};

Utils.trackEvent = function (product, technology) {
    console.log('trackEvent: ' + product + ', ' + technology);
    var title_pre = "BehindTheSite | "
    
    if( product != '' && technology == '') {
      // only product  
      document.title = title_pre + product;
      _gaq.push(['_trackEvent', 'Product', product]);
    } else if( product == '' && technology != '') {
      // only tech
      document.title = title_pre + technology;
      _gaq.push(['_trackEvent', 'Technology', technology]);
    } else if( product != '' && technology != '') {
      // both
      document.title = title_pre + product + " " + technology;
      _gaq.push(['_trackEvent', 'Product', product]);
      _gaq.push(['_trackEvent', 'Technology', technology]);
    } else if( product == '' && technology == '') {
      // none
      document.title = title_pre + "A log of technology stacks";
    }
    
}

//*****************************************************************************
// App

//var bts = angular.module('bts', ['ngRoute', 'bts.controllers', 'bts.directives', 'bts.filters', 'bts.services','angular-loading-bar', 'ngAnimate', 'ngSanitize' ,'infinite-scroll']);
var bts = angular.module('bts', ['ngRoute', 'bts.controllers', 'bts.directives', 'bts.filters', 'bts.services','angular-loading-bar', 'ngSanitize' ,'infinite-scroll']);

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 700);

// http://odetocode.com/blogs/scott/archive/2014/09/10/a-journey-with-trusted-html-in-angularjs.aspx
/*
bts.config(function($provide){
    $provide.decorator("$sanitize", function($delegate, $log){
        return function(text, target){
 
            var result = $delegate(text, target);
            $log.info("$sanitize input: " + text);
            $log.info("$sanitize output: " + result);
 
            return result;
        };
    });
});
*/

// https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
// https://docs.angularjs.org/api/ng/service/$location
bts.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
  $routeProvider.when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/stack/:selectedProduct?', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/tech/:selectedTech?', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/highlight/:selectedProduct?/:selectedTech?', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);

bts.factory('Common', ['$location', '$http', function ($location, $http) {
  console.log("bts.Common");
  
  var c = this;
  
  // http://detectmobilebrowsers.com/
  var isMobileCheck = function () {
    var check = false;
    (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    console.log('bts.Common.isMobileCheck: ' + check);
    return check;
  }
  var isMobileOverride = ($location.search()).mobile;
  console.log('bts.Common.isMobileOverride: ' + isMobileOverride);
  c.isMobile = isMobileCheck();
  if (isMobileOverride == 'true') {
    c.isMobile = true;
  }
  if (isMobileOverride == 'false') {
    c.isMobile = false;
  }
  console.log('bts.Common.isMobile: ' + c.isMobile + ' type: ' + typeof(c.isMobile));
  
  // Environment
  function setupEnvironment (env) {
    if (env) {
      c.env = env;
    } else {
      c.env = "production";
    }
    console.log('bts.Common.setupEnvironment ENV: ' + c.env);
    if(c.env == "production") {
      console.log('bts.run: ga');
      ga('create', 'UA-24322958-20', 'auto');
      ga('send', 'pageview');
    }
  }
  
  $http.get('env.json')
  .success(function(data, status, headers, config){
    setupEnvironment(data.env);
  })
  .error(function (data, status, headers, config) {
    setupEnvironment();
  });
  
  return c;
}]);

bts.run(function() {
    console.log('run()');
    _gaq.push(['_trackEvent', 'Home', 'Default']);
});

/**
 * HACK Do not reload the current template if it is not needed.
 *
 * See AngularJS: Change hash and route without completely reloading controller http://stackoverflow.com/questions/12115259/angularjs-change-hash-and-route-without-completely-reloading-controller
 */
bts.factory('DoNotReloadCurrentTemplate', ['$route', function($route) {
  return function(scope) {
    console.log('DoNotReloadCurrentTemplate');
    var lastRoute = $route.current;
    scope.$on('$locationChangeSuccess', function() {
      if (lastRoute.$$route.templateUrl === $route.current.$$route.templateUrl) {
        console.log('DoNotReloadCurrentTemplate not reloading template: ' + $route.current.$$route.templateUrl);
        $route.current = lastRoute;
      }
    });
  };
}]);
