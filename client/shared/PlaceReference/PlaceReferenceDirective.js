angular.module('pteraformer').directive('placeReference', function() {
  return {
    restrict: 'E',
    transclude: 'true',
    scope: { 
      id: '@',
      geo: '@'
    },
    templateUrl: 'client/shared/PlaceReference/place-reference.html',
    link: function ($scope, element, attrs) {
      element.bind('click', function () {
        //element.html('<span class="place-ref">You clicked me!</span>');
        var geoObj = JSON.parse($scope.geo);
        console.log(geoObj);
      });
    }
  };
});
