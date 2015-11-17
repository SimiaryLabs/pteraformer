// This factory creates a new Document from CLIFF geoparsed results
angular.module('pteraformer').service("CLIFFDocumentService", function (DocumentFactory, CLIFFService) {
  var cliffVersion = "cliff-2_3_0";

  // return a new Document from a raw text string
  this.fromText = function(rawText) { 
    return CLIFFService.getParse(rawText).then(
      function success(response) {
        var doc = new DocumentFactory(rawText, "", {});
        doc.addParsingResult(cliffVersion, response.data.results);
        var cliffPlacesFocus = response.data.results.places.focus;
        var cliffPlacesMentions = response.data.results.places.mentions;
        var cliffOrganizations = response.data.results.organizations;
        var cliffPeople = response.data.results.people;

        var markedUpText = rawText;
        // insert the mentions as markup going from last to first
        cliffPlacesMentions.sort(function(a,b) { return (a.source.charIndex > b.source.charIndex) ? 1 : ((b.source.charIndex > a.source.charIndex) ? -1 : 0); });
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
        doc.properties.modifyDate = Date.now();
        return doc;
      },
      function error(response) {
        var doc = new DocumentFactory(rawText, "", [], []);
        return doc;
        // handle error from cliff
      }
    );
  };

  // add a parsing result from an existing mongodb Document
  this.fromDocument = function(doc, updateMarkedUpText) {
    updateMarkedUpText = typeof updateMarkedUpText !== 'undefined' ? updateMarkedUpText : true;
    return CLIFFService.getParse(doc.rawText).then(
      function success(response) {
        doc.parsingResults[cliffVersion] = response.data.results;
        var cliffPlacesFocus = response.data.results.places.focus;
        var cliffPlacesMentions = response.data.results.places.mentions;
        var cliffOrganizations = response.data.results.organizations;
        var cliffPeople = response.data.results.people;

        if (updateMarkedUpText) {
          var markedUpText = doc.rawText;
          // insert the mentions as markup going from last to first
          cliffPlacesMentions.sort(function(a,b) { return (a.source.charIndex > b.source.charIndex) ? 1 : ((b.source.charIndex > a.source.charIndex) ? -1 : 0); });
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
          doc.properties.modifyDate = Date.now();
        }
        return doc;
      },
      function error(response) {
        return doc;
      }
    );
  };
});
