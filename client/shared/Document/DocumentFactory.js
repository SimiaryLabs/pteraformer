// This factory creates a new Document object
angular.module('pteraformer').factory("DocumentFactory", function() {
  function Document(rawText) {
    this.rawText = rawText;
    this.markedUpText = "";
    this.parsingResults = {};
    this.placeReferences = [];
    this.matchedPlaces = {};
    this.properties: {
      '@context': 'http://schema.org/',
      '@type': 'CreativeWork',
      'name': 'Document',
      'modifyDate': Date.now()
    };
    // add in corpus, properties, 
  };

  return Document;
});
