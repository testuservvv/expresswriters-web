(function ($http, $mdDialog, $location, $scope)
{
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);
    
    /** @ngInject */
    function LoginController($http, $mdDialog, $location, $scope)
    {
        // Data
        var url = window.localStorage['APIURL'];
        var vm = this;
        // Methods
        //Login Method
        vm.login = function (ev)
        {
            $http.post(url+'users/login',
               {

                   "username": vm.form.email,
                   "password": vm.form.password                  

               }).success(function (data, status) {
                   if (data.status == "Succes") {
                       
                       $scope.$root.Token = data.result.token;
                      
                       window.localStorage['storageName'] = data.result.firstname + " " + data.result.lastname;
                       if (data.result.roles.role == "Admin")
                       {                           
                           window.localStorage['type'] = data.result.roles.role;
                           window.localStorage['userid'] = data.result._id;
                           window.localStorage['email'] = data.result.username;
                           $scope.$root.adminuser = window.localStorage['type'];
                           $scope.$root.UserType = true;
                           window.localStorage['manager'] = false;
                           $location.path('/Jobs');
                       }
                       else if (data.result.roles.role == "Manager")
                       {
                           window.localStorage['type'] = data.result.roles.role;
                           window.localStorage['userid'] = data.result._id;
                           window.localStorage['email'] = data.result.username;
                           $scope.$root.adminuser = window.localStorage['type'];
                           $scope.$root.UserType = true;
                           window.localStorage['manager'] = true;
                           $location.path('/Jobs');
                       }
                       else
                       {
                           //$location.path('/jobs');
                           window.localStorage['userid'] = data.result._id;
                           window.localStorage['type'] = data.result.roles.role;
                           window.localStorage['email'] = data.result.username;
                           $scope.$root.adminuser = window.localStorage['type'];
                           $scope.$root.manager = false;
                           window.localStorage['manager'] = false;
                           $location.path('Careers');
                       }
                   }
                   else {
                       $mdDialog.show(
                               $mdDialog.alert()
                                 .parent(angular.element(document.querySelector('#popupContainer')))
                                 .clickOutsideToClose(true)
                                 .parent(angular.element(document.body))
                                 .title('Error!')
                                 .textContent('Invalid user and password!')
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
        vm.gohome = function () {
            $location.path('Careers');
        }
        //////////
    }
})();