angular.module('pteraformer').controller('CorpusEditorController', function ($scope, $meteor, $stateParams, CLIFFDocumentService) {
  $scope.corpusId = $stateParams.corpusId;

  var testText = "In Syria, two airstrikes west of Al-Hasakah successfully struck multiple ISIL buildings, including an air observation building and staging areas. George Clinton lives near the Damascus hotel.";
  CLIFFDocumentService.fromText(testText).then(function(result) {
    console.log(result);
  });
  console.log(uuid.v4());
  //console.log(cliffDoc);
  var htmlOutput = '<p>' + testText.replace(/\n([ \t]*\n)+/g, '</p><p>')
                 .replace('\n', '<br />') + '</p>';
  console.log(htmlOutput);

});
