angular.module('pteraformer',['angular-meteor','ui.router']);
angular.module('pteraformer').config(function($urlRouterProvider, $stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('layers', {
      url: '/layers',
      templateUrl: 'client/views/layers-dashboard.html',
      controller: 'LayersController'
    })
    .state('corpus', {
      url: '/corpus/:corpusId',
      templateUrl: 'client/views/corpus-dashboard.html',
      controller: 'CorpusController'
    })
    .state('document', {
      url: '/document/:documentId',
      templateUrl: 'client/views/document-dashboard.html',
      controller: 'DocumentController'
    });
  $urlRouterProvider.otherwise("/layers");
});
angular.module('pteraformer').controller('LayersController', function ($scope, $meteor) {
});
angular.module('pteraformer').controller('CorpusController', function ($scope, $meteor, $stateParams) {
  $scope.corpusId = $stateParams.corpusId;
});
angular.module('pteraformer').controller('DocumentController', function ($scope, $meteor, $stateParams) {
  $scope.documentId = $stateParams.documentId;
});
