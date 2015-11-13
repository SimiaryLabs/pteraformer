//angular.module('pteraformer',['angular-meteor','ui.router','pteraformer-place-reference-directive']);
//var app = angular.module('pteraformer',['angular-meteor','ui.router',
//                                        'pteraformer-cliff-service',
//                                        'pteraformer-place-reference-directive']);
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
    .state('docViewer', {
      url: '/doc/:documentId',
      templateUrl: 'client/components/GeoDocumentEditor/GeoDocumentEditorView.html',
      controller: 'GeoDocumentEditorController'
    })
    .state('userDataDashboard', {
      url: '/user-data',
      templateUrl: 'client/components/UserDataDashboard/UserDataDashboardView.html',
      controller: 'UserDataDashboardController'
    });
  $urlRouterProvider.otherwise("/user-data");
});
angular.module('pteraformer').controller('LayersController', function ($scope, $meteor, CLIFFService) {
});
angular.module('pteraformer').controller('CorpusController', function ($scope, $meteor, $stateParams) {
  $scope.corpusId = $stateParams.corpusId;
});
