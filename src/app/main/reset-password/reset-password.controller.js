(function ($scope, $http, $mdDialog, $location)
{
    'use strict';

    angular
        .module('app.reset-password')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    function ResetPasswordController($scope, $http, $mdDialog, $location)
    {
        // Data
        var vm = this;
        var url = window.localStorage['APIURL'];
        // Methods
        //Reset password method
        $scope.reset = function (ev) {
            
            $http.post(url+'reset',
                  {

                      "username": vm.form.email,
                      "password": vm.form.password


                  }).success(function (data, status) {
                      if (data.status == "Succes") {
                          $scope.$root.Token = data.result.token;
                          window.localStorage['storageName'] = data.result.firstname + " " + data.result.lastname;
                          $location.path('/jobs');
                      }
                      else {
                          $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('Invalid Email!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent(ev)
                            );
                      }


                  }).error(function (data) {

                      $mdDialog.show(
                                                   $mdDialog.alert()
                                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                                     .clickOutsideToClose(true)
                                                     .parent(angular.element(document.body))
                                                     .title('Error!')
                                                     .textContent('Error')
                                                     .ariaLabel('')
                                                     .ok('Ok')
                                                     .targetEvent(ev)
                                                 );

                  });
        }
        //////////
    }
})();