angular.module('pteraformer').factory("UserDataFactory", function() {
  function UserData(layers, gazetteers) {
    this.layers = layers;
    this.gazetteers = gazetteers;
  };

  UserData.prototype.addLayer = function (layer) {
    this.layers.push(layer);
  }

  UserData.prototype.addGazetteer = function (gazetteer) {
    this.layers.push(gazetteer);
  }

  return UserData;
});
