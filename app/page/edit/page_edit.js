angular.module('sliki.pageEdit', ['ngRoute', 'ngSanitize', 'textAngular'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/page/:pageId/edit', {
            templateUrl: 'page/edit/page_edit.html',
            controller: 'pageEditCtrl'
        });
    }])
    .config(function($provide) {
        // this demonstrates how to register a new tool and add it to the default toolbar
        $provide.decorator('taOptions', ['taRegisterTool', '$window', '$rootScope', 'config', '$delegate', function(taRegisterTool, $window, $rootScope, config, taOptions) { // $delegate is the taOptions we are decorating
            // taRegisterTool('test', {
            //     buttontext: 'Test',
            //     action: function() {
            //         alert('Test Pressed')
            //     }
            // });
            // taOptions.toolbar[1].push('test');

            // Add a "wikilink" tool that will take selected text & link to the local page with that name
            taRegisterTool('wikiLink', {
                iconclass: "fa fa-file-text-o",
                action: function() {
                    var parent = this;
                    var linkText = $window.getSelection().toString();
                    if (linkText) {
                        var db = $rootScope.couch.getDB(config.db);
                        db.query("sliki", "pages", {
                                key: linkText,
                                limit: 1
                            })
                            .success(function(data) {
                                if (data.rows.length) {
                                    parent.$editor().wrapSelection('createLink', '#/page/' + data.rows[0].id);
                                } else {
                                    parent.$parent.$parent.alerts.push({
                                        type: 'danger',
                                        msg: 'Unable to create link - no page with title: <strong>' + linkText + '</strong>'
                                    });
                                }
                            });
                    }

                }
            });
            // add the button to the default toolbar definition
            taOptions.toolbar[3].push('wikiLink');
            return taOptions;
        }]);
    })
    .controller('pageEditCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
        $scope.alerts = [];
        $scope.dbName = config.db;
        $scope.db = $rootScope.couch.getDB(config.db);
        console.log($scope.db);

        if ($routeParams.pageId === 'new') {
            $scope.page = $scope.db.newDoc();
        } else {
            $scope.page = $scope.db.getDoc($routeParams.pageId);
        }

        console.log($scope.page);

        $scope.savePage = function() {
            $scope.page.save();
            console.log($scope.page);
            $scope.alerts.push({
                type: 'success',
                msg: 'Saved version ' + $scope.page._rev
            });
        };

        $scope.attachFiles = function() {
            var fileInput = document.getElementById("upload");
            console.log(fileInput);
            $scope.page.attachMulti(fileInput.files, function() {
                fileInput.value = "";
            });
        };

        $scope.detachFile = function(fileName) {
            console.log(fileName);
            $scope.page.detach(fileName).success(function(data) {
                $scope.alerts.push({
                    msg: 'Detached file ' + fileName + '; page is now at version ' + data.rev
                });
            });
        };

        $scope.isImage = function(fileType) {
            return fileType.includes('image');
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }]);
