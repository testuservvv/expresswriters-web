(function ($http, $scope, $state, $location, $mdDialog, $timeout)
{
    'use strict';
    angular
        .module('app.adminapplicant')
        .controller('adminapplicantController', adminapplicantController);

    /** @ngInject */
    function adminapplicantController(SampleData, $http, $scope, $state, $location, $mdDialog, $timeout) {
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
            //getapplicanttests data
            $scope.activeclassarch = "";
            $scope.activeclassdra = "";
            $scope.activeclasstra = "";
            $scope.activeclassban = "";
            $scope.activeclasslis = "active";
            getapplicanttests();
            function getapplicanttests(status) {
                $http.get(url + 'applicanttests/' + status).success(function (data, status) {

                    vm.filteredTodos = data.tests;

                }).error(function () {

                    console.log('error');
                });
            }
            // review
            $scope.review = function () {
                $scope.activeclassarch = "active";
                $scope.activeclassdra = "";
                $scope.activeclasstra = "";
                $scope.activeclasslis = "";
                $scope.activeclassban = "";
                getapplicanttests('Review');

            }
            // allaplicants
            $scope.allaplicants = function () {
                $scope.activeclassarch = "";
                $scope.activeclassdra = "";
                $scope.activeclasstra = "";
                $scope.activeclasslis = "active";
                $scope.activeclassban = "";
                getapplicanttests();

            }
            // passed
            $scope.passed = function () {
                $scope.activeclassarch = "";
                $scope.activeclassdra = "active";
                $scope.activeclasstra = "";
                $scope.activeclasslis = "";
                $scope.activeclassban = "";
                getapplicanttests('Passed');


            }
            // failed
            $scope.failed = function () {
                $scope.activeclassarch = "";
                $scope.activeclassdra = "";
                $scope.activeclasstra = "active";
                $scope.activeclasslis = "";
                $scope.activeclassban = "";
                getapplicanttests('Failed');

            }

            // ban
            $scope.ban = function () {
                $scope.activeclassarch = "";
                $scope.activeclassdra = "";
                $scope.activeclasstra = "";
                $scope.activeclasslis = "";
                $scope.activeclassban = "active";
                getapplicanttests('Banned');

            }
            //Passed the test
            $scope.Banned = function () {

                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                //var selid = vm.selectedId;
                if (selidarr.length > 0) {
                    changestatusgrade('Banned', '80', selidarr);
                }
                else {
                    $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('Please select a Applicant first!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                            );
                }
            }
            //Failedtest the test
            $scope.Failedtest = function () {

                changestatusgrade('Failed', '0', vm.selectedId);
            }
            //Reviewtest the test
            $scope.Reviewtest = function () {

                changestatusgrade('Review', '0', vm.selectedId);
            }

            //datatable data
            vm.widget7 = {

                title: "Applicant Tests",
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
                           
                            targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                        }
                    ],
                    columns: [
                        {},
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
                                    return data + '';
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
                        }, {
                            render: function (data, type) {
                                if (type === 'display') {
                                    return data + '';
                                }
                                else {
                                    return data;
                                }
                            }
                        }
                    ]
                }
            };

            //update status method and set grade into the database
            function changestatusgrade(status, grade, testid) {

                for (var i = 0; i < testid.length; i++) {
                    var id = testid[i];
                    if (id != "") {
                        $http.post(url + 'applicanttests/update/' + id,
                                      {

                                          "status": status,
                                          "grade": grade,

                                      }).success(function (data, status) {

                                          $scope.activeclasslis = "active";
                                          //vm.selectedId = "";

                                      }).error(function (data) {

                                          $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .parent(angular.element(document.body))
                                    .title('Error!')
                                    .textContent("Not Possible now!")
                                    .ariaLabel('')
                                    .ok('Ok')
                                    .targetEvent()
                                );

                                      });
                    }
                }
                $timeout(function () {
                    getapplicanttests();
                }, 2000);
            }
            //Show detail of test
            $scope.showdetails = function (selectedid) {

                $scope.$root.adminapplicanttestID = selectedid;
                $location.path('Test/Writer-Test');
            }
        }
    }
})();
