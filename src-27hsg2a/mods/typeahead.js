(function(angular) {
  'use strict';
  
  function typeaheadFocus() {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {
        
        var forceValue = ' ';
        
        //------------------------------------------------------
        
        //console.log('ngModel before focus:',ngModel);
        
        ngModel.$parsers.push(function (inputValue) {
            // dont put empty space to model
            //console.log("$parsers: '" + inputValue + "'");
            if(inputValue === forceValue){
              return '';
            }
            return inputValue;
          });
        

        //------------------------------------------------------
        
        function triggerPopup() {

          var viewValue = ngModel.$viewValue;
          var modelValue = ngModel.$modelValue;
          
          //console.log(ngModel);
          
          //restore to null value so that the typeahead can detect a change
          if (ngModel.$viewValue === forceValue) {
            ngModel.$setViewValue('');
          }
          //force trigger the popup
          ngModel.$setViewValue( forceValue );
          
          //set the actual value in case there was already a value in the input
          // COMMENTED OUT to show all on click so user can see all options vs. filtered list and have to clear out old selection
          //ngModel.$setViewValue(viewValue || forceValue);
        };
        //trigger the popup on 'click' because 'focus'
        //is also triggered after the item selection
        element.bind('click', triggerPopup);
        
        //------------------------------------------------------
        
        function focusFilter( viewValue ) {
          
          //var viewValue = ngModel.$viewValue;
          //var modelValue = ngModel.$modelValue;
          
          return function( item ) {
            //console.log("criteriaMatch: '" + JSON.stringify(item) + "' '" + JSON.stringify(viewValue) + "'");
            if(viewValue == forceValue) {
              return true;
            } else {
              return (item.name.toLowerCase().indexOf( viewValue.toLowerCase() ) == 0);
            }
          };
        };
        //compare function that treats the empty space as a match
        scope.focusFilter = focusFilter;
        
        //------------------------------------------------------
        
      }
    };
  };

  angular.module('bts')
  .directive('typeaheadFocus', typeaheadFocus);

  
})(window.angular);