var app = angular.module('pteraformer-place-reference-directive', []);
app.directive('place', function() {
  return {
    restrict: 'AE',
    replace: 'true',
    templateUrl: 'client/shared/placeReference/placeReferenceView.html'
  };
});
