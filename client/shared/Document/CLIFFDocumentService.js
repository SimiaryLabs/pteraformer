// This factory creates a new Document from CLIFF geoparsed results
angular.module('pteraformer').service("CLIFFDocumentService", function (DocumentFactory, CLIFFService) {
  this.fromText = function(rawText) { 
    return CLIFFService.getParse(rawText).then(
      function success(response) {
        var doc = new DocumentFactory(rawText, "", {});
        doc.addParsingResult("cliff-2.3.0", response.data.results);
        var cliffPlacesFocus = response.data.results.places.focus;
        var cliffPlacesMentions = response.data.results.places.mentions;
        var cliffOrganizations = response.data.results.organizations;
        var cliffPeople = response.data.results.people;

        var markedUpText = rawText;
        // insert the mentions as markup going from last to first
        for (var i = cliffPlacesMentions.length-1; i >=0; i--) {
          var charIndex = cliffPlacesMentions[i].source.charIndex;
          var sourceString = cliffPlacesMentions[i].source.string;
          var id = cliffPlacesMentions[i].id;
          var markUpStart = "<placeref id=\""+id+"\">";
          var markUpEnd = "</placeref>"; 
          markedUpText = [markedUpText.slice(0, charIndex+sourceString.length), markUpEnd, markedUpText.slice(charIndex+sourceString.length)].join('');
          markedUpText = [markedUpText.slice(0, charIndex), markUpStart, markedUpText.slice(charIndex)].join('');
        }
        doc.markedUpText = markedUpText;
        return doc;
      },
      function error(response) {
        var doc = new DocumentFactory(rawText, "", [], []);
        return doc;
        // handle error from cliff
      }
    );
  };
});
