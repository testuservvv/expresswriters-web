(function ($http, $scope, $state, $location, $mdDialog, $timeout)
{
    'use strict';
    angular
        .module('app.users')
        .controller('usersController', usersController);

    /** @ngInject */
    function usersController(SampleData, $http, $scope, $state, $location, $mdDialog, $timeout) {

        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {
            /////DATA
            //API Url
            var url = window.localStorage['APIURL'];
            var vm = this;
            vm.socialshow = false;
            //active class
            $scope.activeclassact = 'active';
            //action menu option
            $scope.activeshow = false;
            $scope.suspendedshow = true;
            $scope.removeshow = true;
            //buttons
            $scope.Admin = false;
            $scope.Manager = false;
            $scope.Assistant = false;
            $scope.Editor = false;
            $scope.Writer = false;
            $scope.Applicant = true;
            $scope.Custom = false;
            $scope.Sales = false;
            $scope.SMM = false;
            $scope.SMMshow = false;
            var role = 'User';

            getdata('Active', role);


            /////METHODS
            //Get active user listing
            $scope.activelist = function () {
                $scope.activeclassact = 'active';
                $scope.activeclasssus = '';
                $scope.activeclassrem = '';
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                getdata('Active', role);
            }
            //get suspended user list
            $scope.suspendedlist = function () {
                $scope.activeshow = true;
                $scope.suspendedshow = false;
                $scope.removeshow = true;
                $scope.activeclassact = '';
                $scope.activeclasssus = 'active';
                $scope.activeclassrem = '';
                getdata('Suspend', role);
            }
            //get removed user list
            $scope.removedlist = function () {
                $scope.activeshow = true;
                $scope.suspendedshow = true;
                $scope.removeshow = false;
                $scope.activeclassact = '';
                $scope.activeclasssus = '';
                $scope.activeclassrem = 'active';
                getdata('Removed', role);
            }

            //datatable data
            vm.widget7 = {

                title: "Users",
                table: vm.filteredTodos,
                dtOptions: {
                    dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                    pagingType: 'simple',
                    pageLength: 10,
                    lengthMenu: [10, 20, 50, 100],
                    autoWidth: false,
                    responsive: true,
                    bFilter: false,
                    columnDefs: [
                        {
                            
                            targets: [0, 1, 2, 3, 4, 5, 6, 7,8]
                        }
                    ],
                    columns: [
                        {},

                        {
                            render: function (data, type) {
                                if (type === 'display') {
                                    return data + ' ';
                                }
                                else {
                                    return data;
                                }
                            }
                        },
                        {
                            render: function (data, type) {
                                if (type === 'display') {
                                    return data + '';
                                }
                                else {
                                    return data;
                                }
                            }
                        },
                        {
                            render: function (data, type) {
                                if (type === 'display') {
                                    var el = angular.element(data);
                                    el.html(el.text() + ' ');
                                    return el[0].outerHTML;
                                }
                                else {
                                    return data;
                                }
                            }
                        }, {
                            render: function (data, type) {
                                if (type === 'display') {
                                    return data + '';
                                }
                                else {
                                    return data;
                                }
                            }
                        },
                        {
                            render: function (data, type) {
                                if (type === 'display') {
                                    return data + '';
                                }
                                else {
                                    return data;
                                }
                            }
                        },
                        {
                            render: function (data, type) {
                                if (type === 'display') {
                                    return data + '';
                                }
                                else {
                                    return data;
                                }
                            }
                        },
                        {
                            render: function (data, type) {
                                if (type === 'display') {
                                    return data + '';
                                }
                                else {
                                    return data;
                                }
                            }
                        }, {}
                    ]
                }
            };

            //Update user Activeuser
            $scope.Activeuser = function () {

                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                //var selid = vm.selectedId;
                if (selidarr.length > 0) {
                    $scope.activeclassact = 'active';
                    $scope.activeclasssus = '';
                    $scope.activeclassrem = '';
                    $scope.activeshow = false;
                    $scope.suspendedshow = true;
                    $scope.removeshow = true;
                    updateuser(selidarr, 'Active', 'N');
                }
                else {
                    $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('Please select a User first!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                            );
                }

            }
            //Update user suspended
            $scope.Suspendeduser = function () {

                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                //var selid = vm.selectedId;
                if (selidarr.length > 0) {
                    $scope.activeclassact = 'active';
                    $scope.activeclasssus = '';
                    $scope.activeclassrem = '';
                    $scope.activeshow = false;
                    $scope.suspendedshow = true;
                    $scope.removeshow = true;
                    updateuser(selidarr, 'Suspend', 'Y');
                } else {
                    $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('Please select a User first!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                            );
                }

            }
            //Update user Removeduser
            $scope.Removeduser = function () {

                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                //var selid = vm.selectedId;
                if (selidarr.length > 0) {
                    $scope.activeclassact = 'active';
                    $scope.activeclasssus = '';
                    $scope.activeclassrem = '';
                    $scope.activeshow = false;
                    $scope.suspendedshow = true;
                    $scope.removeshow = true;
                    updateuser(selidarr, 'Removed', 'Y');
                }
                else {
                    $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('Please select a User first!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                            );
                }
            }

            //admin users show
            $scope.adminusers = function () {
                //action menu option
                vm.socialshow = false;
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                //buttons
                $scope.Admin = true;
                $scope.SMMshow = false;
                $scope.SMM = false;
                $scope.Manager = false;
                $scope.Assistant = false;
                $scope.Editor = false;
                $scope.Writer = false;
                $scope.Applicant = false;
                $scope.Custom = false;
                $scope.Sales = false;
                role = 'Admin';
                getdata('Active', role);
            }

            //Applicant users show
            $scope.applicantusers = function () {
                //action menu option
                vm.socialshow = false;
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                //buttons
                $scope.Admin = false;
                $scope.SMMshow = false;
                $scope.SMM = false;
                $scope.Manager = false;
                $scope.Assistant = false;
                $scope.Editor = false;
                $scope.Writer = false;
                $scope.Applicant = true;
                $scope.Custom = false;
                $scope.Sales = false;
                role = 'User';
                getdata('Active', role);
            }
            //Manager users show
            $scope.managerusers = function () {
                //action menu option
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                //buttons
                vm.socialshow = false;
                $scope.Admin = false;
                $scope.SMM = false;
                $scope.SMMshow = false;
                $scope.Manager = true;
                $scope.Assistant = false;
                $scope.Editor = false;
                $scope.Writer = false;
                $scope.Applicant = false;
                $scope.Custom = false;
                $scope.Sales = false;
                role = 'Manager';
                getdata('Active', role);
            }
            //Assistant users show
            $scope.assistantusers = function () {
                //action menu option
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                //buttons
                vm.socialshow = false;
                $scope.Admin = false;
                $scope.SMM = false;
                $scope.Manager = false;
                $scope.Assistant = true;
                $scope.SMMshow = false;
                $scope.Editor = false;
                $scope.Writer = false;
                $scope.Applicant = false;
                $scope.Custom = false;
                $scope.Sales = false;
                role = 'Assistant';
                getdata('Active', role);
            }

            //Editor users show
            $scope.editorusers = function () {
                //action menu option
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                //buttons
                vm.socialshow = false;
                $scope.Admin = false;
                $scope.SMM = false;
                $scope.SMMshow = false;
                $scope.Manager = false;
                $scope.Assistant = false;
                $scope.Editor = true;
                $scope.Writer = false;
                $scope.Applicant = false;
                $scope.Custom = false;
                $scope.Sales = false;
                role = 'Editor';
                getdata('Active', role);
            }
            //Writer users show
            $scope.writerusers = function () {
                //action menu option
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                //buttons
                vm.socialshow = false;
                $scope.Admin = false;
                $scope.SMM = false;
                $scope.SMMshow = false;
                $scope.Manager = false;
                $scope.Assistant = false;
                $scope.Editor = false;
                $scope.Writer = true;
                $scope.Applicant = false;
                $scope.Custom = false;
                $scope.Sales = false;
                role = 'Writer';
                getdata('Active', role);
            }

            //Custom users show
            $scope.customusers = function () {
                //action menu option
                vm.socialshow = true;
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                //buttons

                $scope.Admin = false;
                $scope.SMM = false;
                $scope.Manager = false;
                $scope.Assistant = false;
                $scope.Editor = false;
                $scope.Writer = false;
                $scope.Applicant = false;
                $scope.Custom = true;
                $scope.SMMshow = true;
                $scope.Sales = false;
                role = 'Custom';
                getdata('Active', role);
            }

            //Sales users show
            $scope.salesusers = function () {
                //action menu option
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                //buttons
                vm.socialshow = false;
                $scope.Admin = false;
                $scope.SMM = false;
                $scope.Manager = false;
                $scope.Assistant = false;
                $scope.Editor = false;
                $scope.Writer = false;
                $scope.Applicant = false;
                $scope.Custom = false;
                $scope.SMMshow = false;
                $scope.Sales = true;
                role = 'Sales';
                getdata('Active', role);
            }

            //Sales users show
            $scope.smm = function () {
                //action menu option
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                //buttons
                
                $scope.Admin = false;
                $scope.Manager = false;
                $scope.Assistant = false;
                $scope.SMMshow = true;
                $scope.Custom = true;
                $scope.Editor = false;
                $scope.Writer = false;
                $scope.Applicant = false;
              
                $scope.Sales = false;
                $scope.SMM = true;
                role = 'Social Media Manager';
                getdata('Active', role);
            }

            // go to create user
            $scope.createUser = function () {
                $location.path('AddUser');
            }

            //Get data for table
            function getdata(statusreq, userrole) {

                $http.get(url + 'users/' + statusreq + '/' + userrole).success(function (data, status) {
                    vm.filteredTodos = data.Users;
                    vm.filteredTodoslength = vm.filteredTodos.length;


                }).error(function () {

                    console.log('error');
                });
            }

            //update user status or isdeleted or not
            function updateuser(userid, status, isDeleted) {

                for (var i = 0; i < userid.length; i++) {
                    var id = userid[i];
                    if (id != "") {
                        $http.post(url + 'users/update/' + id,
                                      {

                                          "status": status,
                                          "isdeleted": isDeleted

                                      }).success(function (data, status) {
                                          if (data.status == 'Success') {

                                          }
                                          else {
                                              $mdDialog.show(
                             $mdDialog.alert()
                               .parent(angular.element(document.querySelector('#popupContainer')))
                               .clickOutsideToClose(true)
                               .parent(angular.element(document.body))
                               .title('Error!')
                               .textContent('error!')
                               .ariaLabel('')
                               .ok('Ok')
                               .targetEvent()
                           );
                                          }

                                      }).error(function (data) {

                                          $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('error!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                            );
                                      });
                    }
                }
                $timeout(function () {
                    getdata('Active', role);
                }, 2000);
            }

            //Edit User
            vm.EditUser = function (uid) {
                $scope.$root.uidw = uid;
                $location.path('EditUser');

            }

        }
    }
})();
