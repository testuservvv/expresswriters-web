(function ($scope, $http, $mdDialog, $location) {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($scope, $http, $mdDialog, $location) {
        
        // Data
        var url = window.localStorage['APIURL'];
        var vm = this;
        vm.strength = 'Weak';
        vm.percentage=0;
        //ng-pattern="/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/"
        // Methods
        //register user
        $scope.register = function (ev) {
            
            var ip = document.getElementById('ipAddressID').value;
            var country = document.getElementById('country').value;
            $http.post(url+'users',
                {
                    "firstname": vm.form.fname,
                    "lastname": vm.form.lname,
                    "username": vm.form.email,
                    "password": vm.form.password,
                    "isdeleted": "N",
                    "ipAddress": ip,
                    "country": country,
                    "roles": {
                        "role": "User"                        
                    }

                }).success(function (data, status) {
                   
                    if (data.status == "Success") {
                        
                      
                        if (data.results.roles.role == "Admin") {
                            $scope.$root.Token = data.results.token;
                            window.localStorage['storageName'] = data.results.firstname + " " + data.results.lastname;
                            window.localStorage['userid'] = data.results._id;
                            window.localStorage['type'] = data.results.roles.role;
                            window.localStorage['email'] = data.results.username;
                            $scope.$root.UserType = true;
                            $location.path('/Jobs');
                            
                        }
                        else if (data.results.roles.role == "Manager") {
                            window.localStorage['type'] = data.results.roles.role;
                            window.localStorage['userid'] = data.results._id;
                            window.localStorage['email'] = data.results.username;
                            $scope.$root.adminuser = window.localStorage['type'];
                            $scope.$root.UserType = true;
                            $location.path('/Jobs');
                        }
                        else {
                            $scope.$root.Token = data.results.token;
                            window.localStorage['storageName'] = data.results.firstname + " " + data.results.lastname;
                            window.localStorage['userid'] = data.results._id;
                            window.localStorage['type'] = data.results.roles.role;
                            window.localStorage['email'] = data.results.username;
                            $scope.$root.UserType = false;
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
       .textContent('User Already exist')
       .ariaLabel('')
       .ok('Got it!')
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
       .ok('Got it!')
       .targetEvent(ev)
   );
                });
        }
        //////////
        vm.gohome = function () {
            $location.path('Careers');
        }


        $scope.showNameChanged = function (password) {
            if (password.length > 8) {
                scope.strength = 'strong';
            } else if (password.length > 3) {
                scope.strength = 'medium';
            } else {
                scope.strength = 'weak';
            }
        }

        vm.strengthCheck = function (password) {
            if (password.length == 10) {
                vm.strength = 'Strong';
                vm.percentage = 100;
            }
            else if (password.length == 9) {
                vm.strength = 'Strong';
                vm.percentage = 90;
            }
            else if (password.length == 8) {
                vm.strength = 'Strong';
                vm.percentage = 80;
            }
            else if (password.length == 7) {
                vm.strength = 'Medium';
                vm.percentage = 70;
            }
            else if (password.length == 6) {
                vm.strength = 'Medium';
                vm.percentage = 60;
            }
            else if (password.length == 5) {
                vm.strength = 'Medium';
                vm.percentage = 50;
            }
            else if (password.length ==4 ) {
                vm.strength = 'Weak';
                vm.percentage = 40;
            }
            else if (password.length == 3) {
                vm.strength = 'Weak';
                vm.percentage = 30;
            }
            else if (password.length == 2) {
                vm.strength = 'Weak';
                vm.percentage = 20;
            }
            else if (password.length == 1) {
                vm.strength = 'Weak';
                vm.percentage = 0;
            }
            else if (password.length >10) {
                vm.strength = 'Strong';
                vm.percentage = 100;
            }
            else {
                vm.strength = 'Weak';
                vm.percentage = 0;
            }
        }
    }
})();