angular.module('pteraformer').controller('DocumentController', function ($scope, $meteor, $stateParams, CLIFFService) {
  $scope.documents = $meteor.collection(Documents);
  $scope.documentId = $stateParams.documentId;

  var testText = "In Syria, two airstrikes west of Al-Hasakah successfully struck multiple ISIL buildings, including an air observation building and staging areas. George Clinton lives near the west Damascus hotel.";
  CLIFFService.getParse(testText).then(
    function successCallback(response) {
      console.log("success");
      console.log(response.data);
      var cliffPlacesFocus = response.data.results.places.focus;
      var cliffPlacesMentions = response.data.results.places.mentions;
      var cliffOrganizations = response.data.results.organizations;
      var cliffPeople = response.data.results.people;
    },
    function errorCallback(response) {
      console.log("error");
      console.log(response);
    }
  );
});
