angular.module('pteraformer').directive('placeReference', function() {
  return {
    restrict: 'E',
    transclude: 'true',
    scope: { 
      id: '@',
      geo: '@'
    },
    template: '<span class="place-ref"><ng-transclude></ng-transclude></span>',
    link: function ($scope, element, attrs) {
      element.bind('click', function () {
        //element.html('<span class="place-ref">You clicked me!</span>');
        var geoObj = JSON.parse($scope.geo);
        console.log(geoObj);
      });
    }
  };
});
