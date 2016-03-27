'use strict';

// Declare app level module which depends on views, and components
angular.module('sliki', [
  'ngRoute',
  'sliki.pageList',
  'sliki.pageView',
  'sliki.pageEdit',
  'CornerCouch'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]).
run(function($rootScope, cornercouch) {
  $rootScope.couch = cornercouch();
  $rootScope.couch.session();
  $rootScope.dbName = '';
});

var Config = {
  'db': 'sliki'
};

angular.module('sliki').constant('config', Config);
