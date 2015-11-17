angular.module('pteraformer').controller('CorpusEditorController', function ($scope, $meteor, $stateParams, CLIFFDocumentService) {
  $scope.corpusId = $stateParams.corpusId;
  $scope.corpus = $scope.$meteorObject(Corpora, $stateParams.corpusId);
  $scope.docs = $meteor.collection(function() {
    return Documents.find({ corpus: $stateParams.corpusId });
  });
  $scope.isParsed = function(doc) {
    if (!(doc.markedUpText) || 0 === doc.markedUpText.length)
      return false;
    else
      return true;
  };  

  $scope.geoParseAll = function() {
    $scope.docs.forEach(function(doc) {
      CLIFFDocumentService.fromDocument(doc).then(function(result) {
        //console.log(result);
      });
   });
  };
});
