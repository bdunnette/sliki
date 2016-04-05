'use strict';

angular.module('sliki.pageView', ['ngRoute', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/page/:pageId', {
        templateUrl: 'page/view/page_view.html',
        controller: 'pageViewCtrl'
    });
}])

.controller('pageViewCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
    $scope.dbName = config.db;
    $scope.db = $rootScope.couch.getDB(config.db);
    $scope.page = $scope.db.getDoc($routeParams.pageId);
    console.log($scope.page);
    $scope.isImage = function(fileType) {
        return fileType.includes('image');
    }
}]);