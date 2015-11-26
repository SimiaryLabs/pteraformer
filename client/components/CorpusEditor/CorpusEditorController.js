angular.module('pteraformer').controller('CorpusEditorController', function ($scope, $rootScope, $meteor, $stateParams, CLIFFDocumentService, leafletData) {
  $scope.corpusId = $stateParams.corpusId;
  $rootScope.currentCorpusId = $stateParams.corpusId;
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

  leafletData.getMap("docMap").then(function(map) {
    console.log(map);
  });
});
