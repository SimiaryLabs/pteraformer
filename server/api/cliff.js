angular.module('pteraformer').service('CLIFFService', function($http) {
  var cliffUrl = "http://localhost:8080/cliff-2.3.0/parse/text";
  this.getParse = function(text) {
    return $http({
      method: "POST",
      url: cliffUrl,
      data: {
        q: text
      }
    });
  };
});

