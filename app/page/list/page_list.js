'use strict';

angular.module('sliki.pageList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        name: 'pageList',
        templateUrl: 'page/list/page_list.html',
        controller: 'pageListCtrl'
    });
}])

.controller('pageListCtrl', ['$rootScope', '$scope', 'cornercouch', 'config', function($rootScope, $scope, cornercouch, config) {
    $scope.db = $rootScope.couch.getDB(config.db);

    $scope.db.query("sliki", "pages", {
        include_docs: true,
        descending: true,
        limit: 10
    });
}]);