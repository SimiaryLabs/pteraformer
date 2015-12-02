// This factory creates a new Document from CLIFF geoparsed results
angular.module('pteraformer').service("CLIFFDocumentService", function (DocumentFactory, CLIFFService, $sanitize) {
  var cliffVersion = "cliff-2_3_0";

  function clearCliffResults(doc) {
    // remove parsing results
    doc.parsingResults[cliffVersion] = {};

    // get all cliff features in matched places
    var cliffFeatureIdxSet = {};

    // check if entities and place fields have been created
    if (!doc.entities) {
      doc.entities = { "place": { "type": "FeatureCollection", "features": [] } };
    } else if (!doc.entities.place) {
      doc.entities.place = { "type": "FeatureCollection", "features": [] };
    }

    for (var i = 0; i < doc.entities.place.features.length; i++) {
      if (doc.entities.place.features[i].properties.source == cliffVersion) {
        cliffFeatureIdxSet[i] = true;
      }
    }
    
    // remove cliff place references
    var newEntityReferences = [];
    for (var i = 0; i < doc.entityReferences.length; i++) {
      if (doc.entityReferences.type.valueOf() !== "place") { //check if it is a place entity, if not then keep
        newEntityReferences.push(doc.entityReferences[i]);
        continue;
      }
      var featureIdx = doc.entityReferences[i].featureIdx;
      var newFeatureIdx = [];
      for (var j = 0; j < featureIdx.length; j++) {
        if (!(featureIdx[j] in cliffFeatureIdxSet)) { 
          // if the feature index matched to this place reference is not cliff,
          //  then keep it.
          newFeatureIdx.push(featureIdx[j]);
        }
      }
      // if not all matched places have been removed then push into new place references
      if (newFeatureIdx.length > 0) {
        newEntityReferences.push({
          "charBegin": doc.placeReferences[i].charBegin,
          "charEnd": doc.placeReferences[i].charEnd,
          "featureIdx": newFeatureIdx
        });
      }
    }
    doc.entityReferences = newEntityReferences;

    // remove cliff features from matched places
    var newPlaceFeatures = [];
    for (var i = 0; i < doc.entites.place.features.length; i++) {
      if (doc.entities.place.features[i].properties.source.valueOf() !== cliffVersion) {
        newPlaceFeatures.push(doc.entities.place.features[i]);
      }
    }
    doc.matchedPlaces = {
      "type": "FeatureCollection",
      "features": newPlaceFeatures
    };

    return doc;
  };

  function addParsingResults(doc, results, updateMarkedUpText) {
    doc.parsingResults[cliffVersion] = results;
    var cliffPlacesFocus = results.places.focus;
    var cliffPlacesMentions = results.places.mentions;
    var cliffOrganizations = results.organizations;
    var cliffPeople = results.people;

    for (var i = 0; i < cliffPlacesMentions.length; i++) {
      var charIndex = cliffPlacesMentions[i].source.charIndex;
      var sourceString = cliffPlacesMentions[i].source.string;
      var charEnd = charIndex + sourceString.length;

      // update the matchedPlaces object to include new feature
      var feature = {
        "type": "Feature",
        "properties": {
          "source": cliffVersion
        },
        "geometry": {
          "type": "Point",
          "coordinates": [cliffPlacesMentions[i].lon, cliffPlacesMentions[i].lat]
        }
      };
      feature.properties.id = cliffPlacesMentions[i].id;
      feature.properties.name = cliffPlacesMentions[i].name;
      feature.properties.countryGeonameId = cliffPlacesMentions[i].countryGeonameId;
      feature.properties.countryCode = cliffPlacesMentions[i].countryCode;
      feature.properties.featureCode = cliffPlacesMentions[i].featureCode;
      feature.properties.featureClass = cliffPlacesMentions[i].featureClass;
      feature.properties.stateCode = cliffPlacesMentions[i].stateCode;
      feature.properties.confidence = cliffPlacesMentions[i].confidence;
      feature.properties.stateGeonameId = cliffPlacesMentions[i].stateGeonameId;
      feature.properties.population = cliffPlacesMentions[i].population;

      var featureIdx = doc.entites.place.features.length;

      // check if the feature is already in the list (by source + id)
      for (var i = 0; i < doc.entities.place.features.length; i++) {
        if (doc.entities.place.features[i].properties.source == cliffVersion && doc.entities.place.features[i].id == feature.properties.id) {
          featureIdx = i;
          break;
        }
      }

      // push the new feature if it was not found
      if (featureIdx == doc.entities.place.features.length)
        doc.entities.place.features.push(feature);

      // now update place references
      // check if there is already a place reference for the charBegin and charEnd
      var newPlaceReference = true;
      for (var i = 0; i < doc.entityReferences.length; i++) {
        if (doc.entityReferences[i].type.valueOf() !== "place")
          continue;
        if (doc.entityReferences[i].charBegin == charIndex && doc.entityReferences[i].charEnd == charEnd) {
          doc.entityReferences[i].featureIdx.push(featureIdx);
          newPlaceReference = false;
          break;
        }
      }
      if (newPlaceReference) {
        doc.entityReferences.push({
          "charBegin": charIndex,
          "charEnd": charEnd,
          "type": "place",
          "featureIdx": [featureIdx]
        });
      }
    }

    // TODO update to use placeReferences field
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
        doc = clearCliffResults(doc);
        doc = addParsingResults(doc, response.data.results, updateMarkedUpText);
        return doc;
      },
      function error(response) {
        return doc;
      }
    );
  };
});
