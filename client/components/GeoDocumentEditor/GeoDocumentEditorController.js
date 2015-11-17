angular.module('pteraformer').controller('GeoDocumentEditorController', function ($scope, $meteor, $stateParams, CLIFFDocumentService) {
  $scope.documents = $meteor.collection(Documents);
  $scope.documentId = $stateParams.documentId;
  $scope.doc = $meteor.object(Documents, $stateParams.documentId);

  //var testText = "In Syria, two airstrikes west of Al-Hasakah successfully struck multiple ISIL buildings, including an air observation building and staging areas. George Clinton lives near the Damascus hotel.";
  //CLIFFDocumentService.fromText(testText).then(function(result) {
  //  console.log(result);
  //});

  CLIFFDocumentService.fromDocument($scope.doc).then(function(result) {
    console.log(result);
  });
  console.log(uuid.v4());

  $scope.prettyPrintParsingResults = function(doc) {
    return JSON.stringify(doc.parsingResults, undefined, 2);
  };

  $scope.getSelectionText = function() {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  };

  //console.log(cliffDoc);
  //var htmlOutput = '<p>' + testText.replace(/\n([ \t]*\n)+/g, '</p><p>')
  //               .replace('\n', '<br />') + '</p>';
  //console.log(htmlOutput);

});
