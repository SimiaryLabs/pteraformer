angular.module('pteraformer').controller('UserDataDashboardController', function ($scope, $meteor, $stateParams, $location, CLIFFDocumentService) {
  if (!$stateParams.userId || 0 === $stateParams.userId.length) {
    $stateParams.userId = "public";
  }
  $scope.userId = $stateParams.userId;
  $scope.userData = $scope.$meteorObject(UserData, $stateParams.userId);
  $scope.corpora = $meteor.collection(function() {
    return Corpora.find({ owner: $stateParams.userId });
  });

});
