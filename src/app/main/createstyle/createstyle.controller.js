(function ($http, $scope, $location, $mdDialog, $sce, $mdToast, $timeout, $q, $log, $filter) {
    'use strict';
    angular
        .module('app.createstyle')
        .controller('createstyleController', createstyleController);

    /** @ngInject */
    function createstyleController(SampleData, $http, $scope, Documents, $location, $mdDialog, $sce, $mdToast, $timeout, $q, $log, $filter) {
        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {
            var last = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };

            $scope.toastPosition = angular.extend({}, last);

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
            var vm = this;
            var pendingSearch, cancelSearch = angular.noop;
            var cachedQuery, lastSearch;
            var url = window.localStorage['APIURL'];
            var users = "";

            vm.manager = window.localStorage['manager'];
            getAllStyles();
            var allStates = [];
            getAllWriters();
            var usersnew = {};
            //Add style to database
            $scope.addnewstyle = function () {

                var user = window.localStorage['storageName'];
                $http.post(url + 'style',
                                          {
                                              "stylename": vm.newstyle,

                                              "users": "",
                                              "createdby": user

                                          }).success(function (data, status) {

                                              if (data.status == 'Success') {
                                                  vm.newstyle = "";
                                                  $mdToast.show(
                              $mdToast.simple()
                                .textContent('Style Saved successfully!')
                                .position(pinTo)
                                .hideDelay(3000)
                            );
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



                                          });
            }

            //get all styles from database
            function getAllStyles() {

                $http.get(url + 'style/all', {}).success(function (data, status) {

                    if (data.status == 'Success') {

                        vm.styles = data.style;

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
            //delete style from list
            $scope.deletestyle = function (id) {
                var confirm = $mdDialog.confirm()
          .title('Delete Style')
          .textContent('Would you like to delete style?')
          .ariaLabel('Lucky day')
          .targetEvent()
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
          .ok('Yes')
          .cancel('No');

                $mdDialog.show(confirm).then(function () {
                    $http.post(url + 'style/delete/' + id, {}).success(function (data, status) {

                        if (data.status == 'Success') {
                            $mdToast.show(
                                $mdToast.simple()
                                  .textContent('Style deleted successfully!')
                                  .position(pinTo)
                                  .hideDelay(3000)
                              );
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
                }, function () {
                    //$scope.status = 'You decided to keep your debt.';
                });
               
            }
            //EnableDisable
            $scope.EnableDisable = function (id) {

                $http.post(url + 'style/update/' + id, {}).success(function (data, status) {

                    if (data.status == 'Success') {
                        $mdToast.show(
                             $mdToast.simple()
                               .textContent('Style Updated successfully!')
                               .position(pinTo)
                               .hideDelay(3000)
                           );
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

            //Get all writers details
            function getAllWriters() {

                $http.get(url + 'users/Active/Writer', {}).success(function (data, status) {

                    if (data.status == 'Success') {
                        vm.allusers = data.Users;
                        $scope.userData = [];

                        for (var i = 0; i < vm.allusers.length; i++) {
                            $scope.userData.push({
                                "id": vm.allusers[i]._id,
                                "name": vm.allusers[i].firstname + " " + vm.allusers[i].lastname,
                                "place": vm.allusers[i].firstname + " " + vm.allusers[i].lastname,
                                "pic": vm.allusers[i].firstname + " " + vm.allusers[i].lastname
                            });
                            //users = users + ", " + vm.allusers[i].firstname + " " + vm.allusers[i].lastname + "-" + vm.allusers[i]._id;
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

            //Delete writer from list
            $scope.deleteuser = function (writerid, styleid) {
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
                    $http.post(url + 'style/removeuser/' + styleid, {
                        "writerid": writerid
                    }).success(function (data, status) {

                        if (data.status == 'Success') {

                            removefromusertable(writerid, styleid);

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
                    getAllStyles();
                   // $scope.status = 'You decided to keep your debt.';
                });
                
            }



            function removefromusertable(userid, styleid) {

                $http.post(url + 'users/styleupdate/' + userid, {
                    "stid": styleid,
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


            function addfromusertable(userid, styled) {

                $http.post(url + 'users/styleupdate/' + userid, {
                    "writingstyles": styled,
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
                // $log.info('Text changed to ' + text);
            }

            function selectedItemChange(item, id) {

                $log.info('Item changed to ' + JSON.stringify(item));

            }

            $scope.addwr = function (wid, wname, id, allusers, stylename) {


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
                    getAllStyles();
                }
                else {
                    usersnew = ({ 'id': wid, 'name': wname });
                    vm.selectedItem = "";
                    addWriter(id, usersnew, stylename);
                }

            }

            //add writers to style
            function addWriter(stid, userdata, name) {
                $http.post(url + 'style/adduser/' + stid, {
                    "users": userdata
                }).success(function (data, status) {

                    if (data.status == 'Success') {
                        $mdToast.show(
                        $mdToast.simple()
                               .textContent('Writer added successfully!')
                               .position(pinTo)
                               .hideDelay(3000)
                           );
                        //getAllStyles();
                        var styledata = { "id": stid, "name": name }

                        addfromusertable(userdata.id, styledata);
                    }
                    else {
                        $mdDialog.show(
         $mdDialog.alert()
           .parent(angular.element(document.querySelector('#popupContainer')))
           .clickOutsideToClose(true)
           .parent(angular.element(document.body))
           .title('Error')
           .textContent(data.message)
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


            $scope.removeuserwriter = function (id) {

                $('#' + id).css('display', 'none');
            }
            vm.cancel = function () {
                $location.path('Users');
            }

            //New Code



            $scope.selectedUsers = [];
            $scope.querySearch = function (query) {

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

                var user = { "id": chip.id, "name": chip.name };

                usersnew = ({ 'id': chip.id, 'name': chip.name });
                vm.selectedItem = "";
                addWriter(id, usersnew, name);
                return user;
            };


        }







    }

})();



