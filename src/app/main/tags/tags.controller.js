(function ($http, $scope, $location, $mdDialog, $sce, $mdToast, $timeout, $q, $log) {
    'use strict';
    angular
        .module('app.tags')
        .controller('tagsController', tagsController);

    /** @ngInject */
    function tagsController($stateParams, SampleData, $http, $scope, Documents, $location, $mdDialog, $sce, $mdToast, $timeout, $q, $log) {
        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {
            var vm = this;
            vm.$stateParams = $stateParams;
            vm.tagfiltertext = "";

            var url = window.localStorage['APIURL'];

            var last = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };
            var users = "";
            vm.shclass = "";
            vm.reclass = "";
            var usersnew = {};
            vm.manager = window.localStorage['manager'];
            $scope.toastPosition = angular.extend({}, last);

            //Alphabatically sort
            vm.filtertag = function (choose) {
                vm.tagfiltertext = choose;
            }
            //show all
            vm.showall = function () {
                vm.tagfiltertext = "";
                vm.shclass = "activetag";
                vm.reclass = "";
                getAlltags();
            }
            //Recent added
            vm.recadded = function () {
                vm.tagfiltertext = "";
                vm.shclass = "";
                vm.reclass = "activetag";
                getAlltagsRecentadded();
            }

            if ($stateParams.tag == 'recently') {
                vm.recadded();
            }
            else if ($stateParams.tag && $stateParams.tag.length > 0) {
                getAlltags();
                vm.filtertag($stateParams.tag)

            } else {
                getAlltags();
            }

            $scope.getToastPosition = function () {
                sanitizePosition();

                return Object.keys($scope.toastPosition)
                  .filter(function (pos) { return $scope.toastPosition[pos]; })
                  .join(' ');
            };

            function sanitizePosition() {
                var current = $scope.toastPosition;

                if (current.bottom && last.top) current.top = false;
                if (current.top && last.bottom) current.bottom = false;
                if (current.right && last.left) current.left = false;
                if (current.left && last.right) current.right = false;

                last = angular.extend({}, current);
            }
            var pinTo = $scope.getToastPosition();

            vm.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
            //getAlltags();
            getAllWriters();
            //Get all tags details
            function getAlltags() {

                $http.get(url + 'tagsshhowall/' + 'Active', {}).success(function (data, status) {

                    if (data.status == 'Success') {
                        vm.alltags = data.tags;
                        //$(".btn-class-tags").removeClass("activetag");
                        //$("#main-tag").addClass('activetag');
                    }
                    else {
                        $mdDialog.show(
         $mdDialog.alert()
           .parent(angular.element(document.querySelector('#popupContainer')))
           .clickOutsideToClose(true)
           .parent(angular.element(document.body))
           .title('Error')
           .textContent(data.status)
           .ariaLabel('Error')
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
           .title('Error')
           .textContent('Error')
           .ariaLabel('Error')
           .ok('Ok')
           .targetEvent()
       );

                });
            }
            //Get all Writers details
            function getAllWriters() {

                $http.get(url + 'users/Active/Writer', {}).success(function (data, status) {

                    if (data.status == 'Success') {
                        vm.allusers = data.Users;
                        $scope.userData = [];
                        if (vm.allusers.length == 0) {
                            // users = "";
                            $scope.userData = [];
                        }
                        else {
                            for (var i = 0; i < vm.allusers.length; i++) {
                                $scope.userData.push({
                                    "id": vm.allusers[i]._id,
                                    "name": vm.allusers[i].firstname + " " + vm.allusers[i].lastname,
                                    "place": vm.allusers[i].firstname + " " + vm.allusers[i].lastname,
                                    "pic": vm.allusers[i].firstname + " " + vm.allusers[i].lastname
                                });
                            }
                        }
                    }
                    else {
                        $mdDialog.show(
         $mdDialog.alert()
           .parent(angular.element(document.querySelector('#popupContainer')))
           .clickOutsideToClose(true)
           .parent(angular.element(document.body))
           .title('Error')
           .textContent(data.status)
           .ariaLabel('Error')
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
           .title('Error')
           .textContent('Error')
           .ariaLabel('Error')
           .ok('Ok')
           .targetEvent()
       );

                });
            }
            function getAlltagsRecentadded() {

                $http.get(url + 'tagsall/' + 'Active', {}).success(function (data, status) {

                    if (data.status == 'Success') {
                        vm.alltags = data.tags;
                    }
                    else {
                        $mdDialog.show(
         $mdDialog.alert()
           .parent(angular.element(document.querySelector('#popupContainer')))
           .clickOutsideToClose(true)
           .parent(angular.element(document.body))
           .title('Error')
           .textContent(data.status)
           .ariaLabel('Error')
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
           .title('Error')
           .textContent('Error')
           .ariaLabel('Error')
           .ok('Ok')
           .targetEvent()
       );

                });
            }


            /**
            * Build `states` list of key/value pairs
            */
            function loadAll() {

                //var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                // Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                // Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                // Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                // North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                // South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                // Wisconsin, Wyoming';
                var allStates = users;
                return allStates.split(/, +/g).map(function (state) {
                    var wt = state.split('-');
                    return {
                        value: wt[1],
                        display: wt[0]
                    };
                });
            }

            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
                //var lowercaseQuery = angular.lowercase(query);

                return function filterFn(state) {
                    return (state.display.indexOf(query) === 0);
                };

            }

            vm.simulateQuery = false;
            vm.isDisabled = false;

            // list of `state` value/display objects

            vm.searchTextChange = searchTextChange;
            function newState(state) {
                alert("Sorry! You'll need to create a Constitution for " + state + " first!");
            }

            // ******************************
            // Internal methods
            // ******************************

            /**
             * Search for states... use $timeout to simulate
             * remote dataservice call.
             */
            function querySearch(query) {
                var results = query ? vm.states.filter(createFilterFor(query)) : vm.states,
                    deferred;
                if (vm.simulateQuery) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                    return deferred.promise;
                } else {
                    return results;
                }
            }

            function searchTextChange(text) {
                $log.info('Text changed to ' + text);
            }

            function selectedItemChange(item) {

                $log.info('Item changed to ' + JSON.stringify(item));

            }

            $scope.addwr = function (wid, wname, id, allusers, catid, tagname) {

                if (catid == "") {
                    $mdDialog.show(
                           $mdDialog.alert()
                             .parent(angular.element(document.querySelector('#popupContainer')))
                             .clickOutsideToClose(true)
                             .parent(angular.element(document.body))
                             .title('Information')
                             .textContent('Please assign this tag to any category first')
                             .ariaLabel('Error')
                             .ok('Ok')
                             .targetEvent()
                          );
                    getAlltags();
                }
                else {

                    var found = false;
                    for (var i = 0; i < allusers.length; i++) {
                        if (allusers[i].name == wname) {
                            found = true;
                        }
                    }
                    if (found == true) {
                        $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
          .title('Writer exist')
          .textContent('Writer already exist in list!')
          .ariaLabel('Error')
          .ok('Ok')
          .targetEvent()
       );
                        getAlltags();
                    }
                    else {
                        usersnew = ({ 'id': wid, 'name': wname });
                        vm.selectedItem = "";
                        addWriter(id, usersnew, catid, tagname);
                    }

                }
            }

            //add writers to style
            function addWriter(stid, userdata, ctid, tgnm) {
                $http.post(url + 'tags/adduser/' + stid, {
                    "users": userdata
                }).success(function (data, status) {

                    if (data.status == 'Success') {
                        $mdToast.show(
                        $mdToast.simple()
                               .textContent('Writer added successfully!')
                               .position(pinTo)
                               .hideDelay(3000)
                           );
                        Addfromusertable(userdata.id, stid, ctid, tgnm);
                        getAlltags();
                    }
                    else {
                        $mdDialog.show(
         $mdDialog.alert()
           .parent(angular.element(document.querySelector('#popupContainer')))
           .clickOutsideToClose(true)
           .parent(angular.element(document.body))
           .title('Error')
           .textContent(data.status)
           .ariaLabel('Error')
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
           .title('Error')
           .textContent('Error')
           .ariaLabel('Error')
           .ok('Ok')
           .targetEvent()
        );

                });
            }
            //Delete writer from list
            $scope.deletetag = function (writerid, tagid, catid) {
                var confirm = $mdDialog.confirm()
         .title('Delete Writer')
         .textContent('Would you like to delete writer?')
         .ariaLabel('Lucky day')
         .targetEvent()
         .clickOutsideToClose(true)
         .parent(angular.element(document.body))
         .ok('Yes')
         .cancel('No');

                $mdDialog.show(confirm).then(function () {
                $http.post(url + 'tags/removeuser/' + tagid, {
                    "writerid": writerid
                }).success(function (data, status) {

                    if (data.status == 'Success') {
                        $mdToast.show(
                        $mdToast.simple()
                               .textContent('Writer removed successfully!')
                               .position(pinTo)
                               .hideDelay(3000)
                           );
                        if (catid != "") {
                            removefromusertable(writerid, tagid, catid);
                        }
                        getAlltags();
                    }
                    else {
                        $mdDialog.show(
         $mdDialog.alert()
           .parent(angular.element(document.querySelector('#popupContainer')))
           .clickOutsideToClose(true)
           .parent(angular.element(document.body))
           .title('Error')
           .textContent(data.status)
           .ariaLabel('Error')
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
           .title('Error')
           .textContent('Error')
           .ariaLabel('Error')
           .ok('Ok')
           .targetEvent()
        );

                });
                    }, function () {
                        getAlltags();
                        // $scope.status = 'You decided to keep your debt.';
                    });
                
            }
            //Also remove from user table
            function removefromusertable(userid, tagid, cat_id) {

                $http.post(url + 'users/tagsupdate/' + userid, {
                    "tagid": tagid,
                    "catid": cat_id,
                    "addremove": "remove"
                }).success(function (data, status) {

                    if (data.status == 'Success') {

                        getAllStyles();
                    }
                    else {
                        $mdDialog.show(
         $mdDialog.alert()
           .parent(angular.element(document.querySelector('#popupContainer')))
           .clickOutsideToClose(true)
           .parent(angular.element(document.body))
           .title('Error')
           .textContent(data.status)
           .ariaLabel('Error')
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
           .title('Error')
           .textContent('Error')
           .ariaLabel('Error')
           .ok('Ok')
           .targetEvent()
        );

                });
            }
            //Also add to user table
            function Addfromusertable(userid, tagid, cat_id, tagname) {

                var tag = { 'id': cat_id, 'name': tagname, 'status': 'Active' };
                $http.post(url + 'users/tagsupdate/' + userid, {
                    "tags": tag,
                    "catid": cat_id,
                    "addremove": "Add"
                }).success(function (data, status) {

                    if (data.status == 'Success') {

                        getAllStyles();
                    }
                    else {
                        $mdDialog.show(
         $mdDialog.alert()
           .parent(angular.element(document.querySelector('#popupContainer')))
           .clickOutsideToClose(true)
           .parent(angular.element(document.body))
           .title('Error')
           .textContent(data.status)
           .ariaLabel('Error')
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
           .title('Error')
           .textContent('Error')
           .ariaLabel('Error')
           .ok('Ok')
           .targetEvent()
        );

                });
            }
            //Add new categories to database
            $scope.addnewtags = function () {


                $http.post(url + 'tags/save',
                                          {
                                              "name": vm.tags,


                                          }).success(function (data, status) {

                                              if (data.status == 'Success') {
                                                  vm.newstyle = "";
                                                  $mdToast.show(
                              $mdToast.simple()
                                .textContent('Tag Saved successfully!')
                                .position(pinTo)
                                .hideDelay(3000)
                            );
                                                  getAlltags();
                                              }
                                              else {
                                                  $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Error')
                                     .textContent(data.status)
                                     .ariaLabel('Error')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                                              }

                                          }).error(function (data) {



                                          });
            }
            $scope.startsWith = function (actual, expected) {
                var lowerStr = (actual + "").toLowerCase();
                return lowerStr.indexOf(expected.toLowerCase()) === 0;
            }



            $scope.selectedUsers = [];
            $scope.querySearch = function (query) {

                console.log(query);
                var results = [];
                var places = [];
                query = query.toLowerCase();
                angular.forEach($scope.userData, function (user, key) {
                    if (places.indexOf(user.place.toLowerCase()) == -1 && user.place.toLowerCase().indexOf(query) > -1) {
                        results.push(user);
                        places.push(user.place.toLowerCase())
                    }
                });
                return results;
            };
            //Display places as tags
            $scope.transformChip = function (chip, id, name) {

                //var user = { "id": chip.id, "name": chip.name };
                var chk = chip.name;
                if (chk == undefined) {
                    chip = null;
                }
                else {
                    usersnew = ({ 'id': chip.id, 'name': chip.name, 'status': 'Active' });
                    vm.selectedItem = "";
                    addtags(id, usersnew);
                }
                // return user;
            };
        }
    }
})();



