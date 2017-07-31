(function ($http, $scope, $state, $location, $mdDialog, $timeout)
{
    'use strict';
    angular
        .module('app.adminlist')
        .controller('adminlistController', SampleController);

    /** @ngInject */
    function SampleController(SampleData, $http, $scope, $state, $location, $mdDialog, $timeout) {


        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if(usertype == "")
        {
            $location.path('login');
        }
        else {
            //API Url
            var url = window.localStorage['APIURL'];
            var vm = this;
            vm.selectedId = '';
            vm.filteredTodos = []
          , vm.currentPage = 1
           , vm.numPerPage = 100
           , vm.maxSize = 2;
            vm.filteredTodoslength = 0;
            getdata("open");
            $scope.hdnlist = true;
            $scope.hdndraft = true;
            $scope.hdntrash = true;
            $scope.hdnrestore = false;
            $scope.hdnrestoredraft = false;
            $scope.hdndelete = false;
            vm.activated = true;
            $scope.activeclasslis = "active";
            $scope.activeclassdra = "";
            $scope.activeclasstra = "";

            //////////
            ////Get availibility method
            $http.get(url + 'availibility').success(function (data, status) {

                vm.availibility = data.availibility;

            }).error(function () {

                console.log('error');
            });
            ///////////
            ////Get jobsrole method
            $http.get(url + 'jobsrole').success(function (data, status) {

                vm.jobsrole = data.jobsrole;

            }).error(function () {

                console.log('error');
            });

            //////////////
            ////create job button
            $scope.createjob = function () {
                $location.path('createJob');
            }


            //datatable data
            vm.widget7 = {

                title: "Jobs",
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
                           
                            targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                           
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
            //EDITJOB
            $scope.editjob = function editjob(id) {

                $scope.$root.adminjobid = id;
                $location.path('editjob');
            }

            //LISTED SHOW
            $scope.listed = function () {
                getdata("open");
                $scope.selectedjob = "";
                $scope.hdnlist = true;
                $scope.hdndraft = true;
                $scope.hdntrash = true;
                $scope.hdnrestore = false;
                $scope.hdnrestoredraft = false;
                $scope.hdndelete = false;
                $scope.activeclasslis = "active";
                $scope.activeclassdra = "";
                $scope.activeclasstra = "";

            }
            //DRAFT SHOW
            $scope.Draft = function () {

                $scope.selectedjob = "";
                $scope.hdnlist = true;
                $scope.hdndraft = false;
                $scope.hdntrash = true;
                $scope.hdnrestore = true;
                $scope.hdnrestoredraft = false;
                $scope.hdndelete = false;
                $scope.activeclasslis = "";
                $scope.activeclassdra = "active";
                $scope.activeclasstra = "";
                getdata("Draft");
            }
            //TRASH SHOW
            $scope.Trash = function () {
                getdata("Trash");
                $scope.selectedjob = "";
                $scope.hdnlist = false;
                $scope.hdndraft = false;
                $scope.hdntrash = false;
                $scope.hdnrestore = false;
                $scope.hdnrestoredraft = true;
                $scope.hdndelete = true;
                $scope.activeclasslis = "";
                $scope.activeclassdra = "";
                $scope.activeclasstra = "active";
            }
            //TRASH JOB BY ID
            $scope.trashjob = function () {


                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                //var selid = vm.selectedId;
                if (selidarr.length < 1) {

                    //alert('Please select a job first!');
                    $mdDialog.show(
                               $mdDialog.alert()
                                 .parent(angular.element(document.querySelector('#popupContainer')))
                                 .clickOutsideToClose(true)
                                 .parent(angular.element(document.body))
                                 .title('Error!')
                                 .textContent('Please select a job first!')
                                 .ariaLabel('')
                                 .ok('Ok')
                                 .targetEvent()
                             );

                }
                else {
                    $scope.selectedjob = "";
                    $scope.hdnlist = true;
                    $scope.hdndraft = true;
                    $scope.hdntrash = true;
                    $scope.hdnrestore = false;
                    $scope.hdnrestoredraft = false;
                    $scope.hdndelete = false;
                    $scope.activeclasslis = "active";
                    $scope.activeclassdra = "";
                    $scope.activeclasstra = "";
                    changestatus("Trash", selidarr);
                }
            }
            //DRAFT JOB BY ID
            $scope.draftjob = function () {



                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                //var selid = vm.selectedId;
                if (selidarr.length < 1) {

                    $mdDialog.show(
                               $mdDialog.alert()
                                 .parent(angular.element(document.querySelector('#popupContainer')))
                                 .clickOutsideToClose(true)
                                 .parent(angular.element(document.body))
                                 .title('Error!')
                                 .textContent('Please select a job first!')
                                 .ariaLabel('')
                                 .ok('Ok')
                                 .targetEvent()
                             );

                }
                else {
                    $scope.selectedjob = "";
                    $scope.hdnlist = true;
                    $scope.hdndraft = true;
                    $scope.hdntrash = true;
                    $scope.hdnrestore = false;
                    $scope.hdnrestoredraft = false;
                    $scope.hdndelete = false;
                    $scope.activeclasslis = "active";
                    $scope.activeclassdra = "";
                    $scope.activeclasstra = "";
                    changestatus("Draft", selidarr);
                }
            }

            //RESTORE JOB BY ID
            $scope.restorejob = function () {



                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                if (selidarr.length < 1) {

                    $mdDialog.show(
                               $mdDialog.alert()
                                 .parent(angular.element(document.querySelector('#popupContainer')))
                                 .clickOutsideToClose(true)
                                 .parent(angular.element(document.body))
                                 .title('Error!')
                                 .textContent('Please select a job first!')
                                 .ariaLabel('')
                                 .ok('Ok')
                                 .targetEvent()
                             );

                }
                else {
                    $scope.selectedjob = "";
                    $scope.hdnlist = true;
                    $scope.hdndraft = true;
                    $scope.hdntrash = true;
                    $scope.hdnrestore = false;
                    $scope.hdnrestoredraft = false;
                    $scope.hdndelete = false;
                    $scope.activeclasslis = "active";
                    $scope.activeclassdra = "";
                    $scope.activeclasstra = "";
                    changestatus("open", selidarr);
                }
            }
            //DELETE JOB BY ID
            $scope.deletejob = function () {



                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                if (selidarr.length < 1) {

                    $mdDialog.show(
                               $mdDialog.alert()
                                 .parent(angular.element(document.querySelector('#popupContainer')))
                                 .clickOutsideToClose(true)
                                 .parent(angular.element(document.body))
                                 .title('Error!')
                                 .textContent('Please select a job first!')
                                 .ariaLabel('')
                                 .ok('Ok')
                                 .targetEvent()
                             );

                }
                else {
                    $scope.selectedjob = "";
                    $scope.hdnlist = true;
                    $scope.hdndraft = true;
                    $scope.hdntrash = true;
                    $scope.hdnrestore = false;
                    $scope.hdnrestoredraft = false;
                    $scope.hdndelete = false;
                    $scope.activeclasslis = "active";
                    $scope.activeclassdra = "";
                    $scope.activeclasstra = "";
                    changestatus("Delete", selidarr);
                }
            }
            //DUPLICATE JOB AS DRAFT
            $scope.duplicatejob = function () {



                var selids = $('#selectedids').val();
                selids = selids.substring(1);
                var selidarr = selids.split(',');
                $('#selectedids').val("");
                if (selidarr.length < 1) {

                    $mdDialog.show(
                              $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent('Please select a job first!')
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                            );

                }
                else {
                    $scope.selectedjob = "";
                    $scope.hdnlist = true;
                    $scope.hdndraft = true;
                    $scope.hdntrash = true;
                    $scope.hdnrestore = false;
                    $scope.hdnrestoredraft = false;
                    $scope.hdndelete = false;
                    $scope.activeclasslis = "active";
                    $scope.activeclassdra = "";
                    $scope.activeclasstra = "";
                    for (var i = 0; i < selidarr.length; i++) {
                        if (id != "") {
                            $http.post(url + 'jobs/duplicate/' + selidarr[i],
                                              {}).success(function (data, status) {
                                                  // vm.selectedId = "";


                                              }).error(function (data) {
                                                  alert();
                                              });
                        }
                    }
                    $timeout(function () {
                        getdata("open");
                    }, 2000);

                }
            }
            //Get data for table
            function getdata(status) {

                $http.get(url + 'jobs/' + status).success(function (data, status) {

                    vm.filteredTodos = data.jobs;
                    vm.filteredTodoslength = vm.filteredTodos.length;
                    console.log(vm.filteredTodos.length);

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
                        $http.put(url + 'jobs/status/' + id,
                                              {

                                                  "status": staval,


                                              }).success(function (data, status) {
                                                  //vm.selectedId = "";

                                                  if (data.status == 'Success') {

                                                  }



                                              }).error(function (data) {



                                              });
                    }
                }
                $timeout(function () {
                    getdata("open");
                }, 2000);

            }


        }
    }
})();
