(function ($http, $scope, $location, $mdDialog, $filter) {
    'use strict';
    angular
        .module('app.editclient')
        .controller('editclientController', editclientController);

    /** @ngInject */
    function editclientController(SampleData, $http, $scope, Documents, $location, $mdDialog, $filter) {
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

            var clientid = $scope.$root.cltid;
            if (clientid == undefined) {
                $location.path('Client');
            }
            else {
                getclientbyid(clientid);
                function getclientbyid(id) {

                    $http.get(url + 'client/get/' + id).success(function (data, status) {

                        if (data.status == 'Success') {
                            vm.firstname = data.client.firstname;
                            vm.lastname = data.client.lastname;
                            vm.email = data.client.username;
                            vm.secondaryemail = data.client.secondaryemail;
                            vm.roletitle = data.client.title;
                            vm.Phone = data.client.phone;
                            vm.ext = data.client.extphone;
                            vm.CompanyName = data.client.companyname;
                            vm.StreetAddress = data.client.street;
                            vm.City = data.client.city;
                            vm.StateRegion = data.client.state;
                            vm.postalCode = data.client.zip;
                            vm.Country = data.client.country;
                            vm.teamfirstname = data.client.teammember[0];
                            vm.teamlastname = data.client.teammember[1];
                            vm.teamemail = data.client.teammember[2];
                            vm.TeamPhone = data.client.teammember[3];
                            vm.teamext = data.client.teammember[4];
                            vm.notes = data.client.notes;
                            vm.count = data.client.notes.length;
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


                    }).error(function () {

                        console.log('error');
                    });
                }
                //add notes to json
                $scope.addnote = function () {

                    vm.count++;
                    vm.notes.push({ "id": vm.count, "title": vm.note, "createby": window.localStorage['storageName'], "date": new Date(), "type": window.localStorage['type'] });
                    vm.note = "";
                }
                //Remove notes from json
                $scope.removenotes = function (id) {

                    for (var i = 0; i < vm.notes.length; i++) {
                        if (vm.notes[i].id == id) {


                            var index = vm.notes.map(function (e) { return e.id; }).indexOf(id);

                            vm.notes.splice(index, 1);
                            vm.count--;
                        }
                    }
                }

                $scope.cancel = function () {
                    $location.path('Client');
                }


                //saveclient
                $scope.createclient = function () {

                    upadteclient();
                }

                //save a client
                function upadteclient() {

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
                    $http.post(url + 'client/updateclient/' + clientid,
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
    }
})();
