angular.module('pteraformer').controller('UserDataDashboardController', function ($scope, $meteor, $location) {
  $location.search({ "q": "cow", "lat": 0.3, "lng": 40.5, "l": 5 });
});
