// This factory creates a new Document from CLIFF geoparsed results
angular.module('pteraformer').service("HeideltimeDocumentService", function (DocumentFactory, HeideltimeService, $sanitize) {
  var heideltimeVersion = "heideltime-1_8";

  function clearHeideltimeResults(doc) {
    // remove parsing results
    doc.parsingResults[heideltimeVersion] = {};
/**
    // get all cliff features in matched places
    var cliffFeatureIdxSet = {};
    for (var i = 0; i < doc.matchedPlaces.features.length; i++) {
      if (doc.matchedPlaces.features[i].properties.source == cliffVersion) {
        cliffFeatureIdxSet[i] = true;
      }
    }
    
    // remove cliff place references
    var newPlaceReferences = [];
    for (var i = 0; i < doc.placeReferences.length; i++) {
      var featureIdx = doc.placeReferences[i].matchedPlacesFeatureIdx;
      var newMatchedPlacesFeatureIdx = [];
      for (var j = 0; j < featureIdx.length; j++) {
        if (!(featureIdx[j] in cliffFeatureIdxSet)) { 
          // if the feature index matched to this place reference is not cliff,
          //  then keep it.
          newMatchedPlacesFeatureIdx.push(featureIdx[j]);
        }
      }
      // if not all matched places have been removed then push into new place references
      if (newMatchedPlacesFeatureIdx.length > 0) {
        newPlaceReferences.push({
          "charIndex": doc.placeReferences[i].charIndex,
          "string": doc.placeReferences[i].string,
          "matchedPlacesFeatureIdx": newMatchedPlacesFeatureIdx
        });
      }
    }
    doc.placeReferences = newPlaceReferences;

    // remove cliff features from matched places
    var newMatchedPlacesFeatures = [];
    for (var i = 0; i < doc.matchedPlaces.features[i]; i++) {
      if (!(i in cliffFeatureIdxSet)) {
        newMatchedPlacesFeatures.push(doc.matchedFeatures.features[i]);
      }
    }
    doc.matchedPlaces = {
      "type": "FeatureCollection",
      "features": newMatchedPlacesFeatures
    };
**/
    return doc;

  };

  function addParsingResults(doc, results, updateMarkedUpText) {
    doc.parsingResults[heideltimeVersion] = results;
    //var xmlDoc = $.parseXML(results);

/**
    var cliffPlacesFocus = results.places.focus;
    var cliffPlacesMentions = results.places.mentions;
    var cliffOrganizations = results.organizations;
    var cliffPeople = results.people;

    for (var i = 0; i < cliffPlacesMentions.length; i++) {
      var charIndex = cliffPlacesMentions[i].source.charIndex;
      var sourceString = cliffPlacesMentions[i].source.string;

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

      var featureIdx = doc.matchedPlaces.features.length;

      // check if the feature is already in the list (by source + id)
      for (var i = 0; i < doc.matchedPlaces.features; i++) {
        if (doc.matchedPlaces.features[i].properties.source == cliffVersion && doc.matchedPlaces.features[i].id == feature.properties.id) {
          featureIdx = i;
          break;
        }
      }

      // push the new feature if it was not found
      if (featureIdx == doc.matchedPlaces.features.length)
        doc.matchedPlaces.features.push(feature);

      // now update place references
      // check if there is already a place reference for the charIndex and string
      var newPlaceReference = true;
      for (var i = 0; i < doc.placeReferences.length; i++) {
        if (doc.placeReferences.charIndex == charIndex && doc.placeReferences.string == sourceString) {
          doc.placeReferences.matchedPlacesFeatureIdx.push(featureIdx);
          newPlaceReference = false;
          break;
        }
      }
      if (newPlaceReference) {
        doc.placeReferences.push({
          "charIndex": charIndex,
          "string": sourceString,
          "matchedPlacesFeatureIdx": [featureIdx]
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
**/
    return doc;
  }

  // return a new Document from a raw text string
  this.fromText = function(rawText) { 
    var doc = new DocumentFactory(rawText);

    return HeideltimeService.getParse(rawText).then(
      function success(response) {
        doc = clearHeideltimeResults(doc);
        doc = addParsingResults(doc, response);
        return doc;
      },
      function error(response) {
        return doc;
      }
    );
  };

  // add a parsing result from an existing mongodb Document
  this.fromDocument = function(doc, updateMarkedUpText) {
    updateMarkedUpText = typeof updateMarkedUpText !== 'undefined' ? updateMarkedUpText : true;
    return HeideltimeService.getParse(doc.rawText).then(
      function success(response) {
        doc = clearHeideltimeResults(doc);
        doc = addParsingResults(doc, response, updateMarkedUpText);
        return doc;
      },
      function error(response) {
        return doc;
      }
    );
  };
});
