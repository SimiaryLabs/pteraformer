// This factory creates a new Document from CLIFF geoparsed results
angular.module('pteraformer').service("CLIFFDocumentService", function (DocumentFactory, CLIFFService, $sanitize) {
  var cliffVersion = "cliff-2_3_0";

  function addParsingResults(doc, results, updateMarkedUpText) {
    doc.parsingResults[cliffVersion] = results;
    var cliffPlacesFocus = results.places.focus;
    var cliffPlacesMentions = results.places.mentions;
    var cliffOrganizations = results.organizations;
    var cliffPeople = results.people;

    if (updateMarkedUpText) {
      var markedUpText = doc.rawText;
      // insert the mentions as markup going from last to first
      cliffPlacesMentions.sort(function(a,b) { return (a.source.charIndex > b.source.charIndex) ? 1 : ((b.source.charIndex > a.source.charIndex) ? -1 : 0); });
      for (var i = cliffPlacesMentions.length-1; i >=0; i--) {
        var charIndex = cliffPlacesMentions[i].source.charIndex;
        var sourceString = cliffPlacesMentions[i].source.string;
        var id = cliffPlacesMentions[i].id;
        var lat = cliffPlacesMentions[i].lat;
        var lon = cliffPlacesMentions[i].lon;
        //var geoJson = '{"type":"Feature","geometry":{"type":"Point","coordinates":['+lon+','+lat+']}}'.replace(/"/g, "&quot;");
        var geoJson = '{&quot;type&quot;:&quot;Feature&quot;,&quot;geometry&quot;:{&quot;type&quot;:&quot;Point&quot;,&quot;coordinates&quot;:['+lon+','+lat+']}}';
        var markUpStart = '<place-reference id="'+id+'" geo="'+geoJson+'">';
        var markUpEnd = "</place-reference>";
        markedUpText = [markedUpText.slice(0, charIndex+sourceString.length), markUpEnd, markedUpText.slice(charIndex+sourceString.length)].join('');
        markedUpText = [markedUpText.slice(0, charIndex), markUpStart, markedUpText.slice(charIndex)].join('');
      }
      doc.markedUpText = markedUpText;
      doc.properties.modifyDate = Date.now();
    }    
    return doc;
  }

  // return a new Document from a raw text string
  this.fromText = function(rawText) { 
    // sanitize it first so that we can trust to render later on
    // rawText = $sanitize(rawText);
    return CLIFFService.getParse(rawText).then(
      function success(response) {
        var doc = new DocumentFactory(rawText);
        doc = addParsingResults(doc, response.data.results, true);
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
        doc = addParsingResults(doc, response.data.results, updateMarkedUpText);
        return doc;
      },
      function error(response) {
        return doc;
      }
    );
  };
});
