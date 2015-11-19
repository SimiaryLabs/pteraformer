angular.module('pteraformer').directive('placeReference', function(leafletData) {
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
        if (!(geoObj === undefined || geoObj === null)) {
          leafletData.getMap("docMap").then(function(map) {
            var lGeoJson = L.geoJson(geoObj);
            map.setView(lGeoJson.getBounds().getCenter(), 6);
          });
        }
        //console.log(geoObj);
      });

      $scope.menuOptions = [
        ['Edit', function ($itemScope) {
          console.log("edit");
          console.log($itemScope.id);
        }],
        ['Remove', function($itemScope) {
          console.log("remove");
          console.log($itemScope.id);
        }]
      ];
    }
  };
});
