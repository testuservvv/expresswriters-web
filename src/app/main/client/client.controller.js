(function ($http, $scope, $state, $location, $mdDialog, $timeout) {
    'use strict';
    angular
        .module('app.client')
        .controller('clientController', clientController);

    /** @ngInject */
    function clientController(SampleData, $http, $scope, $state, $location, $mdDialog, $timeout) {


        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {
            //API Url
            var url = window.localStorage['APIURL'];
            var vm = this;
            //active class
            $scope.activeclassact = 'active';
            //action menu option
            $scope.activeshow = false;
            $scope.suspendedshow = true;
            $scope.removeshow = true;
            getdata('Active');
            //Get active user listing
            $scope.activelist = function () {
                $scope.activeclassact = 'active';
                $scope.activeclasssus = '';
                $scope.activeclassrem = '';
                $scope.activeshow = false;
                $scope.suspendedshow = true;
                $scope.removeshow = true;
                getdata('Active');
            }
            //get suspended user list
            $scope.suspendedlist = function () {
                $scope.activeshow = true;
                $scope.suspendedshow = false;
                $scope.removeshow = true;
                $scope.activeclassact = '';
                $scope.activeclasssus = 'active';
                $scope.activeclassrem = '';
                getdata('Suspend');
            }
            //get removed user list
            $scope.Inactivelist = function () {
                $scope.activeshow = true;
                $scope.suspendedshow = true;
                $scope.removeshow = false;
                $scope.activeclassact = '';
                $scope.activeclasssus = '';
                $scope.activeclassrem = 'active';
                getdata('Inactive');
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
                    autoWidth: true,
                    responsive: false,
                    bFilter: false,
                    columnDefs: [
                        {
                           
                            visible: true,
                            targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
                        {}
                    ]
                }
            };

            //Update user Activeuser
            $scope.Activeclient = function () {

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
                    updateuser(selidarr, 'Active');
                }
                else {
                    $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('Please select a client first!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                            );
                }

            }
            //Update user suspended
            $scope.Suspendedclient = function () {

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
                    updateuser(selidarr, 'Suspend');
                } else {
                    $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('Please select a client first!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                            );
                }

            }
            //Update user Removeduser
            $scope.Inactiveclient = function () {

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
                    updateuser(selidarr, 'Inactive');
                } else {
                    $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('Please select a client first!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                            );
                }

            }


            // go to create user
            $scope.createClient = function () {
                $location.path('AddClient');
            }

            //Get data for table
            function getdata(statusreq) {

                $http.get(url + 'client/' + statusreq).success(function (data, status) {

                    if (data.status == 'Success') {
                        vm.filteredTodos = data.client;
                    }
                    else {
                        $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
          .title('Error!')
          .textContent(data.status)
          .ariaLabel('')
          .ok('Ok')
          .targetEvent()
      );
                    }


                }).error(function () {

                    console.log('error');
                });
            }

            //update user status or isdeleted or not
            function updateuser(userid, status) {

                for (var i = 0; i < userid.length; i++) {
                    var id = userid[i];
                    if (id != "") {
                        $http.post(url + 'client/update/' + id,
                                      {

                                          "status": status

                                      }).success(function (data, status) {

                                          if (data.status == 'Success') {
                                              // vm.selectedId = "";

                                          }
                                          else {

                                              $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent(data.status)
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
                    getdata('Active');
                }, 2000);
            }

            //Edit Client
            $scope.editclient = function (clientid) {
                $scope.$root.cltid = clientid;
                $location.path('EditClient');
            }
        }
    }
})();
