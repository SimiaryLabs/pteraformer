//angular.module('pteraformer',['angular-meteor','ui.router','pteraformer-place-reference-directive']);
//var app = angular.module('pteraformer',['angular-meteor','ui.router',
//                                        'pteraformer-cliff-service',
//                                        'pteraformer-place-reference-directive']);
angular.module('pteraformer').config(function($urlRouterProvider, $stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('corpusEditor', {
      url: '/corpus/:corpusId',
      templateUrl: 'client/components/CorpusEditor/CorpusEditorView.html',
      controller: 'CorpusEditorController'
    })
    .state('docEditor', {
      url: '/doc/:documentId',
      templateUrl: 'client/components/GeoDocumentEditor/GeoDocumentEditorView.html',
      controller: 'GeoDocumentEditorController'
    })
    .state('userDataDashboard', {
      url: '/',
      templateUrl: 'client/components/UserDataDashboard/UserDataDashboardView.html',
      controller: 'UserDataDashboardController'
    });
  $urlRouterProvider.otherwise("/");
});
