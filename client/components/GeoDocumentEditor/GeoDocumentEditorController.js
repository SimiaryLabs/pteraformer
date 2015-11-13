angular.module('pteraformer').controller('GeoDocumentEditorController', function ($scope, $meteor, $stateParams, CLIFFDocumentService) {
  $scope.documentId = $stateParams.documentId;

  var testText = "In Syria, two airstrikes west of Al-Hasakah successfully struck multiple ISIL buildings, including an air observation building and staging areas. George Clinton lives near the Damascus hotel.";
  CLIFFDocumentService.fromText(testText).then(function(result) {
    console.log(result);
  });
  console.log(uuid.v4());
  //console.log(cliffDoc);
});
