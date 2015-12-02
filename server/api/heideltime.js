angular.module('pteraformer').service('HeideltimeService', function($http) {
  var heideltimeUrl = "http://localhost:8080/TemporalTagger/";
  this.getParse = function(text, date) {
    if (!date) {
      var datenow = new Date();
      var year = datenow.getUTCFullYear();
      var month = datenow.getUTCMonth()+1;
      var day = datenow.getUTCDate();
      date = year + "-" + month + "-" + day;
      //console.log(date);
    }
    return $http({
      method: "POST",
      url: heideltimeUrl + "TaggerEnglishNarratives",
      data: {
        "q": text,
        "date": date
      }
    });
  };

  this.getParseNarratives = function(text, date) {
    return getParse(text, date);
  };

  this.getParseNews = function(text, date) {
    if (!date) {
      var datenow = Date.now();
      var year = datenow.getUTCFullYear();
      var month = datenow.getUTCMonth()+1;
      var day = datenow.getUTCDate();
      date = year + "-" + month + "-" + day;
      //console.log(date);
    }
    return $http({
      method: "POST",
      url: heideltimeUrl + "TaggerEnglishNews",
      data: {
        "q": text,
        "date": date
      }
    });
  };

  this.getParseScientific = function(text, date) {
    if (!date) {
      var datenow = new Date();
      var year = datenow.getUTCFullYear();
      var month = datenow.getUTCMonth()+1;
      var day = datenow.getUTCDate();
      date = year + "-" + month + "-" + day;
      //console.log(date);
    }
    return $http({
      method: "POST",
      url: heideltimeUrl + "TaggerEnglishScientific",
      data: {
        "q": text,
        "date": date
      }
    });
  };

  this.getParseColloquial = function(text, date) {
    if (!date) {
      var datenow = new Date();
      var year = datenow.getUTCFullYear();
      var month = datenow.getUTCMonth()+1;
      var day = datenow.getUTCDate();
      date = year + "-" + month + "-" + day;
      //console.log(date);
    }
    return $http({
      method: "POST",
      url: heideltimeUrl + "TaggerEnglishColloquial",
      data: {
        "q": text,
        "date": date
      }
    });
  };
});
