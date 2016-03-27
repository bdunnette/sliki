'use strict';

angular.module('sliki.pageEdit', ['ngRoute', 'ngSanitize', 'textAngular'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/page/:pageId/edit', {
    templateUrl: 'page/edit/page_edit.html',
    controller: 'pageEditCtrl'
  });
}])

.controller('pageEditCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
  $scope.db = $rootScope.couch.getDB(config.db);
  if ($routeParams.pageId === 'new') {
    $scope.page = $scope.db.newDoc();
  }
  else {
    $scope.page = $scope.db.getDoc($routeParams.pageId);
  }
  console.log($scope.page);

  $scope.savePage = function() {
    $scope.page.save();
    console.log($scope.page);
  };
}]);
