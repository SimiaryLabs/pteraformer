angular.module('pteraformer').directive('placeReference', function() {
  return {
    restrict: 'E',
    transclude: 'true',
    scope: { 
      id: '@',
      geo: '@'
    },
    template: '<span class="place-ref"> {{geo}} <ng-transclude></ng-transclude></span>',
    link: function ($scope, element, attrs) {
      element.bind('click', function () {
        element.html('<span class="place-ref">You clicked me!</span>');
      });
    }
  };
});
