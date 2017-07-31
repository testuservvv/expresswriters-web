(function ($http, $scope, $location, $mdDialog, $sce, $mdToast, $timeout, $q, $log) {
    'use strict';
    angular
        .module('app.createcategories')
        .controller('createcategoriesController', createcategoriesController);

    /** @ngInject */
    function createcategoriesController(SampleData, $http, $scope, Documents, $location, $mdDialog, $sce, $mdToast, $timeout, $q, $log) {
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
            var url = window.localStorage['APIURL'];
            var users = "";

            vm.manager = window.localStorage['manager'];
            //Get all categories from database
            getAllcategories();
            var allStates = [];
            //Get all tags from database
            getAlltags();
            var usersnew = {};
            //Add new categories to database
            $scope.addnewcategories = function () {

                var user = window.localStorage['storageName'];
                $http.post(url + 'categories/save',
                                          {
                                              "name": vm.newcategories,
                                              "createby": user

                                          }).success(function (data, status) {

                                              if (data.status == 'Success') {
                                                  vm.newstyle = "";
                                                  $mdToast.show(
                              $mdToast.simple()
                                .textContent('Category Saved successfully!')
                                .position(pinTo)
                                .hideDelay(3000)
                            );
                                                  getAllcategories();
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



                                          });
            }

            //get all categories from database
            function getAllcategories() {

                $http.get(url + 'categories', {}).success(function (data, status) {

                    if (data.status == 'Success') {

                        vm.styles = data.categories;
                        for (var i = 0; i < vm.styles.length; i++) {
                            var ttac = [];
                            var ttinac = [];
                            for (var j = 0; j < vm.styles[i].tags.length; j++) {
                                if (vm.styles[i].tags[j].status == 'Active') {
                                    ttac.push(vm.styles[i].tags[j]);
                                    //vm.styles[i].tagsactive = vm.styles[i].tags[j];
                                }
                                else {
                                    ttinac.push(vm.styles[i].tags[j]);
                                    //vm.styles[i].tagsinactive = vm.styles[i].tags[j];
                                }
                            }
                            vm.styles[i].tagsactive = ttac;
                            vm.styles[i].tagsinactive = ttinac;
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
            //delete category from list
            $scope.deletestyle = function (id) {

                var confirm = $mdDialog.confirm()
          .title('Delete Category')
          .textContent('Would you like to delete category?')
          .ariaLabel('Lucky day')
          .targetEvent()
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
          .ok('Yes')
          .cancel('No');

                $mdDialog.show(confirm).then(function () {
                    $http.post(url + 'categories/delete/' + id, {}).success(function (data, status) {

                        if (data.status == 'Success') {


                            $http.post(url + 'users/categories/' + id, {}).success(function (data, status) {

                                if (data.status == 'Success') {
                                    $http.post(url + 'tags/removetag/' + id, {}).success(function (data, status) {

                                        if (data.status == 'Success') {
                                            $mdToast.show(
                                                $mdToast.simple()
                                                  .textContent('Category deleted successfully!')
                                                  .position(pinTo)
                                                  .hideDelay(3000)
                                              );

                                            getAllcategories();
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

                                    //getAllcategories();
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
                   // $scope.status = 'You decided to keep your debt.';
                });

               
            }
            //EnableDisable
            $scope.EnableDisable = function (id) {

                $http.post(url + 'categories/update/' + id, {}).success(function (data, status) {

                    if (data.status == 'Success') {
                        $mdToast.show(
                             $mdToast.simple()
                               .textContent('Category Updated successfully!')
                               .position(pinTo)
                               .hideDelay(3000)
                           );
                        getAllcategories();
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

            //Get all tags details
            function getAlltags() {

                $http.get(url + 'tags/' + 'Active', {}).success(function (data, status) {

                    //users = "";
                    if (data.status == 'Success') {

                        vm.allusers = data.tags;
                        $scope.userData = [];
                        if (vm.allusers.length == 0) {
                            // users = "";
                            $scope.userData = [];
                        }
                        else {
                            for (var i = 0; i < vm.allusers.length; i++) {
                                $scope.userData.push({
                                    "id": vm.allusers[i]._id,
                                    "name": vm.allusers[i].name,
                                    "place": vm.allusers[i].name,
                                    "pic": vm.allusers[i].name
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

            //Delete writer from list
            $scope.deletetag = function (tagid, catid) {
                var confirm = $mdDialog.confirm()
          .title('Remove Tag')
          .textContent('Would you like to remove tag?')
          .ariaLabel('Lucky day')
          .targetEvent()
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
          .ok('Yes')
          .cancel('No');

                $mdDialog.show(confirm).then(function () {
                    $http.post(url + 'categories/removetag/' + catid, {
                        "tagid": tagid
                    }).success(function (data, status) {

                        if (data.status == 'Success') {
                            $mdToast.show(
                            $mdToast.simple()
                                   .textContent('Tag removed successfully!')
                                   .position(pinTo)
                                   .hideDelay(3000)
                               );
                            $http.post(url + 'tags/addcat/' + tagid, {
                                "catid": ""
                            }).success(function (data, status) {
                                if (data.status == 'Success') {
                                    getAlltags();
                                    getAllcategories();
                                    //        $http.post(url + 'users/tagsupdatebycat/' + catid, {
                                    //            "tdid": tagid,
                                    //            "addremove": "remove"
                                    //        }).success(function (data, status) {
                                    //            
                                    //            if (data.status == 'Success') {
                                    //                getAlltags();
                                    //                getAllcategories();

                                    //            }
                                    //            else {
                                    //                $mdDialog.show(
                                    // $mdDialog.alert()
                                    //   .parent(angular.element(document.querySelector('#popupContainer')))
                                    //   .clickOutsideToClose(true)
                                    //   .parent(angular.element(document.body))
                                    //   .title('Error')
                                    //   .textContent(data.status)
                                    //   .ariaLabel('Error')
                                    //   .ok('Ok')
                                    //   .targetEvent()
                                    //);
                                    //            }

                                    //        }).error(function (data) {


                                    //            $mdDialog.show(
                                    // $mdDialog.alert()
                                    //   .parent(angular.element(document.querySelector('#popupContainer')))
                                    //   .clickOutsideToClose(true)
                                    //   .parent(angular.element(document.body))
                                    //   .title('Error')
                                    //   .textContent('Error')
                                    //   .ariaLabel('Error')
                                    //   .ok('Ok')
                                    //   .targetEvent()
                                    //);

                                    //        });
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
                    getAllcategories();
                });
               

               
            }

            vm.simulateQuery = false;
            vm.isDisabled = false;

            // list of `state` value/display objects

            vm.searchTextChange = searchTextChange;

            function newState(state) {

                //alert("Sorry! You'll need to create a Constitution for " + state + " first!");
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

            function selectedItemChange(item, id) {

                $log.info('Item changed to ' + JSON.stringify(item));

            }
            //check tag already exist on not or call add tags menthod for Add Active tag
            $scope.addwr = function (tid, tname, id, allusers) {

                var found = false;
                for (var i = 0; i < allusers.length; i++) {
                    if (allusers[i].name == tname) {
                        found = true;
                    }
                }
                if (found == true) {
                    $mdDialog.show(
    $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .parent(angular.element(document.body))
      .title('Tag exist')
      .textContent('Tag already exist in list!')
      .ariaLabel('Error')
      .ok('Ok')
      .targetEvent()
   );
                    getAllcategories();
                }
                else {
                    usersnew = ({ 'id': tid, 'name': tname, 'status': 'Active' });
                    vm.selectedItem = "";
                    addtags(id, usersnew);
                }

            }
            //check tag already exist on not or call add tags menthod for Add Inactive tag
            $scope.addwrss = function (tid, tname, id, allusers) {

                if (vm.selectedItem != undefined && vm.selectedItem != "") {
                    var found = false;
                    for (var i = 0; i < allusers.length; i++) {
                        if (allusers[i].name == tname) {
                            found = true;
                        }
                    }
                    if (found == true) {
                        $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
          .title('Tag exist')
          .textContent('Tag already exist in list!')
          .ariaLabel('Error')
          .ok('Ok')
          .targetEvent()
       );
                        getAllcategories();
                    }
                    else {
                        usersnew = ({ 'id': tid, 'name': tname, 'status': 'InActive' });
                        vm.selectedItem = "";
                        addtags(id, usersnew);
                    }
                }
            }
            //add writers to style
            function addtags(catid, userdata) {
                $http.post(url + 'categories/addtag/' + catid, {
                    "tags": userdata
                }).success(function (data, status) {

                    if (data.status == 'Success') {
                        $mdToast.show(
                        $mdToast.simple()
                               .textContent('Tag added successfully!')
                               .position(pinTo)
                               .hideDelay(3000)
                           );


                        $http.post(url + 'tags/addcat/' + userdata.id, {
                            "catid": catid
                        }).success(function (data, status) {

                            if (data.status == 'Success') {
                                //getAlltags();
                                //        $http.post(url + 'users/tagsupdatebycat/' + catid, {
                                //            "tdid": "",
                                //            "addremove": "Add",
                                //            "tags": userdata
                                //        }).success(function (data, status) {
                                //            
                                //            if (data.status == 'Success') {
                                //                getAlltags();


                                //            }
                                //            else {
                                //                $mdDialog.show(
                                // $mdDialog.alert()
                                //   .parent(angular.element(document.querySelector('#popupContainer')))
                                //   .clickOutsideToClose(true)
                                //   .parent(angular.element(document.body))
                                //   .title('Error')
                                //   .textContent(data.status)
                                //   .ariaLabel('Error')
                                //   .ok('Ok')
                                //   .targetEvent()
                                //);
                                //            }

                                //        }).error(function (data) {


                                //            $mdDialog.show(
                                // $mdDialog.alert()
                                //   .parent(angular.element(document.querySelector('#popupContainer')))
                                //   .clickOutsideToClose(true)
                                //   .parent(angular.element(document.body))
                                //   .title('Error')
                                //   .textContent('Error')
                                //   .ariaLabel('Error')
                                //   .ok('Ok')
                                //   .targetEvent()
                                //);

                                //        });
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
                        getAlltags();
                        getAllcategories();
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

            //Active tag 
            $scope.addtagtoactive = function (tagid, catid) {

                $http.post(url + 'categories/tag/' + catid, {
                    "tagid": tagid
                }).success(function (data, status) {

                    if (data.status == 'Success') {
                        $mdToast.show(
                        $mdToast.simple()
                               .textContent('Tag added successfully!')
                               .position(pinTo)
                               .hideDelay(3000)
                           );
                        getAlltags();
                        getAllcategories();
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
            vm.addnewtags = function (tag, catid) {
                if (tag.length < 12) {
                    $http.post(url + 'tags/save',
                                              {
                                                  "name": tag,


                                              }).success(function (data, status) {
                                                  if (data.status == 'Success') {
                                                      vm.newstyle = "";
                                                      vm.searchText = "";
                                                      $mdToast.show(
                                  $mdToast.simple()
                                    .textContent('Tag Saved successfully!')
                                    .position(pinTo)
                                    .hideDelay(3000)
                                );
                                                      usersnew = ({ 'id': data.results._id, 'name': tag, 'status': 'Active' });
                                                      vm.selectedItem = "";
                                                      addtags(catid, usersnew);
                                                      // getAlltags();
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


                                              });
                }
                else {
                    $mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .parent(angular.element(document.body))
                                        .title('Error')
                                        .textContent('Tag name is not more than 12 character!')
                                        .ariaLabel('Error')
                                        .ok('Ok')
                                        .targetEvent()
                                    );
                }
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
            $scope.transformChips = function (chip, id, name) {

                //var user = { "id": chip.id, "name": chip.name };

                var chk = chip.name;
                if (chk == undefined) {
                    chip = null;
                }
                else {
                    usersnew = ({ 'id': chip.id, 'name': chip.name, 'status': 'InActive' });
                    vm.selectedItem = "";
                    addtags(id, usersnew);
                }
                //return user;
            };

        }

    }

})();



