angular.module('pteraformer').factory("UserDataFactory", function() {
  function UserData(layers, gazetteers) {
    this.layers = layers;
    this.gazetteers = gazetteers;
  };

  UserData.prototype.addCorpus = function (corpus) {
    this.layers.push(corpus);
  }

  UserData.prototype.addGazetteer = function (gazetteer) {
    this.layers.push(gazetteer);
  }

  return UserData;
});
