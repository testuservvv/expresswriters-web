(function ($http, $scope, $location, $mdDialog, $filter)
{
    'use strict';
    angular
        .module('app.addclient')
        .controller('addclientController', addclientController);

    /** @ngInject */
    function addclientController(SampleData, $http, $scope, Documents, $location, $mdDialog, $filter) {

        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {
            var vm = this;
            var url = window.localStorage['APIURL'];

            vm.notes = [];
            vm.count = 0;

            $scope.cancel = function () {
                $location.path('Client');
            }
            //add notes to json
            $scope.addnote = function () {

                vm.count++;
                vm.notes.push({ "id": vm.count, "title": vm.note, "createby": window.localStorage['storageName'], "date": new Date(), "type": window.localStorage['type'] });
                vm.note = "";
            }
            $scope.removenotes = function (id) {

                for (var i = 0; i < vm.notes.length; i++) {
                    if (vm.notes[i].id == id) {


                        var index = vm.notes.map(function (e) { return e.id; }).indexOf(id);

                        vm.notes.splice(index, 1);
                        vm.count--;
                    }
                }
            }

            //saveclient
            $scope.createclient = function () {

                saveclient();
            }

            //save a client
            function saveclient() {
                var teammember = [];
                if (vm.teamfirstname != undefined) {
                    teammember.push(vm.teamfirstname);
                }
                if (vm.teamlastname != undefined) {
                    teammember.push(vm.teamlastname);
                }
                if (vm.teamemail != undefined) {
                    teammember.push(vm.teamemail);
                }
                if (vm.TeamPhone != undefined) {
                    teammember.push(vm.TeamPhone);
                }
                if (vm.teamext != undefined) {
                    teammember.push(vm.teamext);
                }
                var ip = document.getElementById('ipAddressID').value;
                $http.post(url + 'client/Admin',
                                          {
                                              "firstname": vm.firstname,
                                              "lastname": vm.lastname,
                                              "username": vm.email,
                                              "secondaryemail": vm.secondaryemail,
                                              "title": vm.roletitle,
                                              "phone": vm.Phone,
                                              "extphone": vm.ext,
                                              "companyname": vm.CompanyName,
                                              "street": vm.StreetAddress,
                                              "city": vm.City,
                                              "state": vm.StateRegion,
                                              "country": vm.Country,
                                              "zip": vm.postalCode,
                                              "teammember": teammember,
                                              "notes": vm.notes,
                                              "IPaddress": ip,

                                          }).success(function (data, status) {

                                              if (data.status == "Success") {
                                                  $location.path('Client');
                                              }

                                              else {
                                                  $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Error!')
                                     .textContent(data.message)
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                                              }
                                          }).error(function (data) {

                                              console.log(data);
                                              $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .parent(angular.element(document.body))
                                    .title('Error!')
                                    .textContent('Error')
                                    .ariaLabel('')
                                    .ok('Ok')
                                    .targetEvent()
                                );
                                          });
            }
        }
    }
})();
