'use strict';

// Declare app level module which depends on views, and components
angular.module('sliki', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',
    'CornerCouch',
    'sliki.pageList',
    'sliki.pageView',
    'sliki.pageEdit'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]).
controller('HeaderController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
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
