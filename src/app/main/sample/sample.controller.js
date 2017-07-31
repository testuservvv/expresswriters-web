(function ($http, $scope, $state, $location) {
    'use strict';
    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController(SampleData, $http, $scope, $state, $location) {
        const asyncLocalStorage = {
            setItem: function (key, value) {
                return Promise.resolve().then(function () {
                    localStorage.setItem(key, value);
                });
            },
            getItem: function (key) {
                return Promise.resolve().then(function () {
                    return localStorage.getItem(key);
                });
            }
        };
        var vm = this;

        asyncLocalStorage.getItem('APIURL').then(function (url) {

            vm.filteredTodos = []
                , vm.currentPage = 1
                , vm.numPerPage = 100
                , vm.maxSize = 2;
            vm.filteredTodoslength = 0;
            //Get all Jobs staus open
            $http.get(url + 'jobs/open').success(function (data, status) {

                vm.filteredTodos = data.jobs;
                vm.filteredTodoslength = vm.filteredTodos.length;
                console.log(vm.filteredTodos.length);

                $scope.$watch('currentPage + numPerPage', function () {

                    var begin = ((vm.currentPage - 1) * vm.numPerPage)
                        , end = begin + vm.numPerPage;
                    console.log(vm.filteredTodos);
                    vm.filteredTodos = vm.filteredTodos.slice(begin, end);
                    console.log(begin);
                    console.log(end);
                    console.log(vm.filteredTodos);
                });


            }).error(function () {

                console.log('error');
            });


            //////////
            //Get all availibility
            $http.get(url + 'availibility').success(function (data, status) {

                vm.availibility = data.availibility;

            }).error(function () {

                console.log('error');
            });
            ///////////
            //Get all jobsrole
            $http.get(url + 'jobsrole').success(function (data, status) {

                vm.jobsrole = data.jobsrole;

            }).error(function () {

                console.log('error');
            });

            //////////////
            //Show the selected job detail on next page
            $scope.view = function (id) {

                console.log(id);

                $scope.$root.id = id;
                $location.path('jobdetail');
            }
            $scope.apply = function (jobid, testid, testtitle) {

                var chk = window.localStorage['storageName'];
                if (chk != undefined && chk != "") {

                    console.log(testid);
                    testtitle = testtitle.replace(" ", "-");
                    $scope.$root.applyid = testid;
                    $scope.$root.applyjobid = jobid;
                    $location.path('Jobs/' + testtitle + "-test");

                }
                else {

                    $location.path('register');
                }
            }


            //Table data
            vm.widget7 = {

                title: "Job Listings",
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
                            width: '20%',
                            targets: [0, 1, 2, 3, 4, 5, 6, 7]
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
                                    var el = angular.element(data);
                                    el.html(el.text() + ' ');
                                    return el[0].outerHTML;
                                }
                                else {
                                    return data;
                                }
                            }
                        }
                    ]
                }
            };
        });
    }

})();
