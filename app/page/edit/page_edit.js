'use strict';

angular.module('sliki.pageEdit', ['ngRoute', 'ngSanitize', 'textAngular'])

.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/page/:pageId/edit', {
            templateUrl: 'page/edit/page_edit.html',
            controller: 'pageEditCtrl'
        });
    }])
    .config(function($provide) {
        // this demonstrates how to register a new tool and add it to the default toolbar
        $provide.decorator('taOptions', ['taRegisterTool', '$window', '$delegate', function(taRegisterTool, $window, taOptions) { // $delegate is the taOptions we are decorating
            // taRegisterTool('test', {
            //     buttontext: 'Test',
            //     action: function() {
            //         alert('Test Pressed')
            //     }
            // });
            // taOptions.toolbar[1].push('test');
            taRegisterTool('colourRed', {
                iconclass: "fa fa-file-text-o",
                action: function() {
                    var linkText = $window.getSelection().toString();
                    this.$editor().wrapSelection('createLink', '#/p/' + linkText);
                }
            });
            // add the button to the default toolbar definition
            taOptions.toolbar[3].push('colourRed');
            return taOptions;
        }]);
    })
    .controller('pageEditCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
        $scope.db = $rootScope.couch.getDB(config.db);
        if ($routeParams.pageId === 'new') {
            $scope.page = $scope.db.newDoc();
        } else {
            $scope.page = $scope.db.getDoc($routeParams.pageId);
        }
        console.log($scope.page);

        $scope.savePage = function() {
            $scope.page.save();
            console.log($scope.page);
        };
    }]);
