(function () {
    'use strict';

    angular
        .module('fuse')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope) {
        // Data
        //////////
        // Remove the splash screen
        const asyncLocalStorage = {
            setItem: function (key, value) {
                return Promise.resolve().then(function () {
                    localStorage.setItem(key, value);
                });
            },
            getItem: function (key) {
                return Promise.resolve().then(function () {
                    return localStorage.getItem(key);
                });
            }
        };
        // window.localStorage['APIURL'] = "http://devteamroom.expresswriters.com:7000/api/v1/";
        asyncLocalStorage.setItem('APIURL', "http://devteamroom.expresswriters.com:7000/api/v1/").then(function () {
            $scope.$on('$viewContentAnimationEnded', function (event) {
                if (event.targetScope.$id === $scope.$id) {
                    $rootScope.$broadcast('msSplashScreen::remove');
                }


                var user = window.localStorage['type'];
                if (user == 'User' || user == "" || user == undefined) {
                    $scope.$root.userlogin = true;
                }
                else {
                    $scope.$root.userlogin = false;
                }
            });
        });

    }
})();