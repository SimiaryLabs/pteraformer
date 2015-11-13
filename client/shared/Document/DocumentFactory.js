// This factory creates a new Document object
angular.module('pteraformer').factory("DocumentFactory", function() {
  function Document(rawText, markedUpText, parsingResults) {
    this.rawText = rawText;
    this.markedUpText = markedUpText;
    this.parsingResults = parsingResults;
  };

  Document.prototype.addParsingResult = function(parsingTechnique, parsingResult) {
    this.parsingResults[parsingTechnique] = parsingResult;
  };

  return Document;
});
