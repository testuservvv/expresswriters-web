(function ($http, $scope, $state, $location, $mdDialog, $timeout)
{
    'use strict';
    angular
        .module('app.admintestlist')
        .controller('admintestlistController', admintestlistController);

    /** @ngInject */
    function admintestlistController(SampleData, $http, $scope, $state, $location, $mdDialog, $timeout) {
        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {
            var url = window.localStorage['APIURL'];
            var vm = this;
            vm.selectedId = '';
            vm.filteredTodos = []
          , vm.currentPage = 1
           , vm.numPerPage = 100
           , vm.maxSize = 2;
            vm.filteredTodoslength = 0;
            getdata("Open");

            $scope.hdndraft = true;
            $scope.hdntrash = true;
            $scope.hdnarchived = true;

            vm.activated = true;
            $scope.activeclasslis = "active";
            $scope.activeclassdra = "";
            $scope.activeclasstra = "";
            $scope.activeclassarch = "";



            //////////////
            ////create job button
            $scope.createtest = function () {
                $location.path('createtest');
            }


            //datatable data
            vm.widget7 = {

                title: "Tests",
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
                            width: '',
                            targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
                                    return data + ' ';
                                }
                                else {
                                    return data;
                                }
                            }
                        },
                       {},
                        {}
                    ]
                }
            };
            //Archived test
            $scope.Archived = function () {
                $scope.hdndraft = true;
                $scope.hdntrash = true;
                $scope.hdnarchived = false;
                $scope.activeclasslis = "";
                $scope.activeclassdra = "";
                $scope.activeclasstra = "";
                $scope.activeclassarch = "active";
                $scope.selectedjob = "";
                getdata("Archived");
            }
            //Listed Show
            $scope.listed = function () {
                $scope.selectedjob = "";
                $scope.hdndraft = true;
                $scope.hdntrash = true;
                $scope.hdnarchived = true;
                $scope.activeclasslis = "active";
                $scope.activeclassdra = "";
                $scope.activeclasstra = "";
                $scope.activeclassarch = "";
                getdata("Open");
            }
            //DRAFT SHOW
            $scope.Draft = function () {

                $scope.selectedjob = "";
                $scope.hdndraft = false;
                $scope.hdntrash = true;
                $scope.hdnarchived = true;
                $scope.activeclasslis = "";
                $scope.activeclassdra = "active";
                $scope.activeclasstra = "";
                $scope.activeclassarch = "";
                getdata("Draft");
            }
            //TRASH SHOW
            $scope.Trash = function () {

                $scope.selectedjob = "";
                $scope.hdndraft = true;
                $scope.hdntrash = false;
                $scope.hdnarchived = true;
                $scope.activeclasslis = "";
                $scope.activeclassdra = "";
                $scope.activeclasstra = "active";
                $scope.activeclassarch = "";
                getdata("Trash");
            }

            //Archive show
            $scope.archivedtest = function () {

                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                if (selidarr.length < 1) {
                    $scope.selectedjob = "";
                    $mdDialog.show(
                               $mdDialog.alert()
                                 .parent(angular.element(document.querySelector('#popupContainer')))
                                 .clickOutsideToClose(true)
                                 .parent(angular.element(document.body))
                                 .title('Error!')
                                 .textContent('Please select a test first!')
                                 .ariaLabel('')
                                 .ok('Ok')
                                 .targetEvent()
                             );

                }
                else {
                    $scope.selectedjob = "";
                    $scope.hdndraft = true;
                    $scope.hdntrash = true;
                    $scope.hdnarchived = true;
                    $scope.activeclasslis = "active";
                    $scope.activeclassdra = "";
                    $scope.activeclasstra = "";
                    $scope.activeclassarch = "";
                    changestatus("Archived", selidarr);
                }


            }
            //TRASH JOB BY ID
            $scope.trashtest = function () {


                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                if (selidarr.length < 1) {
                    $scope.selectedjob = "";
                    //alert('Please select a job first!');
                    $mdDialog.show(
                               $mdDialog.alert()
                                 .parent(angular.element(document.querySelector('#popupContainer')))
                                 .clickOutsideToClose(true)
                                 .parent(angular.element(document.body))
                                 .title('Error!')
                                 .textContent('Please select a test first!')
                                 .ariaLabel('')
                                 .ok('Ok')
                                 .targetEvent()
                             );

                }
                else {
                    $scope.selectedjob = "";

                    $scope.hdndraft = true;
                    $scope.hdntrash = true;
                    $scope.hdnarchived = true;
                    $scope.activeclasslis = "active";
                    $scope.activeclassdra = "";
                    $scope.activeclasstra = "";
                    $scope.activeclassarch = "";
                    changestatus("Trash", selidarr);
                }
            }
            //DRAFT JOB BY ID
            $scope.draftest = function () {

                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                if (selidarr.length < 1) {
                    $scope.selectedjob = "";
                    $mdDialog.show(
                               $mdDialog.alert()
                                 .parent(angular.element(document.querySelector('#popupContainer')))
                                 .clickOutsideToClose(true)
                                 .parent(angular.element(document.body))
                                 .title('Error!')
                                 .textContent('Please select a test first!')
                                 .ariaLabel('')
                                 .ok('Ok')
                                 .targetEvent()
                             );

                }
                else {
                    $scope.selectedjob = "";
                    $scope.hdndraft = true;
                    $scope.hdntrash = true;
                    $scope.hdnarchived = true;
                    $scope.activeclasslis = "active";
                    $scope.activeclassdra = "";
                    $scope.activeclasstra = "";
                    $scope.activeclassarch = "";
                    changestatus("Draft", selidarr);
                }
            }

            //Get data for table
            function getdata(statusreq) {

                $http.get(url + 'tests/' + statusreq).success(function (data, status) {
                    vm.filteredTodos = data.tests;
                    vm.filteredTodoslength = vm.filteredTodos.length;


                    $scope.$watch('currentPage + numPerPage', function () {

                        var begin = ((vm.currentPage - 1) * vm.numPerPage)
                        , end = begin + vm.numPerPage;

                        vm.filteredTodos = vm.filteredTodos.slice(begin, end);

                        vm.activated = false;
                    });



                }).error(function () {

                    console.log('error');
                });
            }

            //Change the status of selected item
            function changestatus(staval, jobid) {

                for (var i = 0; i < jobid.length; i++) {
                    var id = jobid[i];
                    if (id != "") {
                        $http.put(url + 'tests/status/' + id,
                                      {

                                          "status": staval,


                                      }).success(function (data, status) {
                                          // vm.selectedId = "";


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
                    getdata("Open");
                }, 2000);
            }
            //Edit Test
            $scope.editjob = function (id) {
                $scope.$root.admintestid = id;
                $location.path('edittest');
            }
        }
    }
})();
