(function ($http, $scope, $location) {
    'use strict';
    angular
        .module('app.createJob')
        .controller('createJobController', createJobController);

    /** @ngInject */
    function createJobController(SampleData, $http, $scope, Documents, $location) {
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
            vm.fileAdded = fileAdded;
            vm.upload = upload;
            vm.fileSuccess = fileSuccess;
            vm.path = Documents.data.path;
            vm.folders = Documents.data.folders;
            vm.files = Documents.data.files;
            vm.selected = vm.files[0];
            vm.ngFlowOptions = {
                // You can configure the ngFlow from here
                /*target                   : 'api/media/image',
                 chunkSize                : 15 * 1024 * 1024,
                 maxChunkRetries          : 1,
                 simultaneousUploads      : 1,
                 testChunks               : false,
                 progressCallbacksInterval: 1000*/
            };
            vm.ngFlow = {
                // ng-flow will be injected into here through its directive
                flow: {}
            };

            // Methods
            vm.fileAdded = fileAdded;
            vm.upload = upload;
            vm.fileSuccess = fileSuccess;

            vm.select = select;
            vm.toggleDetails = toggleDetails;
            vm.toggleSidenav = toggleSidenav;
            vm.toggleView = toggleView;
            var imagefile = null;
            vm.minmax = [];

            //Change dollar cent

            $scope.change = function (item) {

                if (item == 'Word') {
                    vm.minmax = [];
                    vm.dolcent = 'Cent';
                    for (var i = 1; i <= 100; i++) {
                        if (i < 10) {
                            vm.minmax.push(".0" + i);
                        }
                        else {
                            vm.minmax.push("." + i);
                        }

                    }
                }
                else {
                    vm.minmax = [];
                    vm.dolcent = '$';
                    for (var i = 1; i <= 100; i++) {
                        vm.minmax.push(i);

                    }
                }
            }


            //Cancel
            $scope.cancel = function () {

                $location.path('Jobs');
            }
            //Publish
            $scope.publishjob = function () {

                var fd = new FormData();
                if (imagefile != null) {
                    fd.append('userPhoto', imagefile.file);
                }
                $http.post(url + 'jobs',
                                {
                                    "jobname": vm.basicForm.Jobtitle,
                                    "availibility": vm.basicForm.availibility,
                                    "status": "open",
                                    "mincompensation": vm.basicForm.min,
                                    "maxcompensation": vm.basicForm.max,
                                    "compensationtype": vm.basicForm.Compensation,
                                    "enddate": $scope.myDate,
                                    "testid": vm.basicForm.test,
                                    "role": vm.basicForm.jobsrole,
                                    "description": vm.basicForm.Description

                                }).success(function (data, status) {

                                    if (imagefile != null) {
                                        //$location.path('Jobs');
                                        $http.post(url + 'userPhoto/' + data.results._id, fd,
                                    {
                                        //transformRequest: angular.identity,
                                        headers: { 'Content-Type': undefined }
                                    }).success(function (data, status) {

                                        $location.path('Jobs');



                                    }).error(function (data) {



                                    });
                                    }
                                    else { $location.path('Jobs'); }
                                }).error(function (data) {



                                });
            }
            //draft save
            $scope.Draftjob = function () {

                var fd = new FormData();
                if (imagefile != null) {
                    fd.append('userPhoto', imagefile.file);
                }
                $http.post(url + 'jobs',
                                {
                                    "jobname": vm.basicForm.Jobtitle,
                                    "availibility": vm.basicForm.availibility,
                                    "status": "Draft",
                                    "mincompensation": vm.basicForm.min,
                                    "maxcompensation": vm.basicForm.max,
                                    "compensationtype": vm.basicForm.Compensation,
                                    "enddate": $scope.myDate,
                                    "testid": vm.basicForm.test,
                                    "role": vm.basicForm.jobsrole,
                                    "description": vm.basicForm.Description

                                }).success(function (data, status) {
                                    // $location.path('jobs');
                                    if (imagefile != null) {
                                        //$location.path('Jobs');
                                        $http.post(url + 'userPhoto/' + data.results._id, fd,
                                    {
                                        //transformRequest: angular.identity,
                                        headers: { 'Content-Type': undefined }
                                    }).success(function (data, status) {

                                        $location.path('Jobs');



                                    }).error(function (data) {



                                    });
                                    }
                                    else { $location.path('Jobs'); }

                                }).error(function (data) {


                                    alert(data.status);
                                });
            }

            function fileAdded(file) {
                // Prepare the temp file data for file list
                var uploadingFile = {
                    id: file.uniqueIdentifier,
                    file: file,
                    type: '',
                    owner: 'Emily Bennett',
                    size: '',
                    modified: moment().format('MMMM D, YYYY'),
                    opened: '',
                    created: moment().format('MMMM D, YYYY'),
                    extention: '',
                    location: 'My Files > Documents',
                    offline: false,
                    preview: 'assets/images/etc/sample-file-preview.jpg'
                };

                // Append it to the file list
                vm.files.push(uploadingFile);
            }

            /**
             * Upload
             * Automatically triggers when files added to the uploader
             */
            function upload() {
                // Set headers
                vm.ngFlow.flow.opts.headers = {
                    'X-Requested-With': 'XMLHttpRequest',
                    //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
                };

                vm.ngFlow.flow.upload();
            }

            /**
             * File upload success callback
             * Triggers when single upload completed
             *
             * @param file
             * @param message
             */
            function fileSuccess(file, message) {
                // Iterate through the file list, find the one we
                // are added as a temp and replace its data
                // Normally you would parse the message and extract
                // the uploaded file data from it
                angular.forEach(vm.files, function (item, index) {
                    if (item.id && item.id === file.uniqueIdentifier) {
                        // Normally you would update the file from
                        // database but we are cheating here!

                        // Update the file info
                        item.name = file.file.name;
                        item.type = 'document';
                        imagefile = file;



                        // Figure out & upddate the size
                        if (file.file.size < 1024) {
                            item.size = parseFloat(file.file.size).toFixed(2) + ' B';
                        }
                        else if (file.file.size >= 1024 && file.file.size < 1048576) {
                            item.size = parseFloat(file.file.size / 1024).toFixed(2) + ' Kb';
                        }
                        else if (file.file.size >= 1048576 && file.file.size < 1073741824) {
                            item.size = parseFloat(file.file.size / (1024 * 1024)).toFixed(2) + ' Mb';
                        }
                        else {
                            item.size = parseFloat(file.file.size / (1024 * 1024 * 1024)).toFixed(2) + ' Gb';
                        }
                    }
                });
            }

            /**
             * Select an item
             *
             * @param item
             */
            function select(item) {
                vm.selected = item;
            }

            /**
             * Toggle details
             *
             * @param item
             */
            function toggleDetails(item) {
                vm.selected = item;
                toggleSidenav('details-sidenav');
            }

            /**
             * Toggle sidenav
             *
             * @param sidenavId
             */
            function toggleSidenav(sidenavId) {
                $mdSidenav(sidenavId).toggle();
            }

            /**
             * Toggle view
             */
            function toggleView() {
                vm.currentView = vm.currentView === 'list' ? 'grid' : 'list';
            }

            //////////
            //Get availibility
            $http.get(url + 'availibility').success(function (data, status) {

                vm.availibility = data.availibility;

            }).error(function () {

                console.log('error');
            });
            ///////////
            //Get jobsrole
            $http.get(url + 'jobsrole').success(function (data, status) {

                vm.jobsrole = data.jobsrole;

            }).error(function () {

                console.log('error');
            });

            ///////////
            //Get All test
            $http.get(url + 'tests/Open').success(function (data, status) {

                vm.tests = data.tests;

            }).error(function () {

                console.log('error');
            });
        }
    }
})();
