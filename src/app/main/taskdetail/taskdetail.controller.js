(function ($http, $scope, $state, $location, $mdDialog, $timeout, $stateParams, $filter) {
    'use strict';
    angular
        .module('app.taskdetail')
        .controller('taskdetailController', taskdetailController);

    /** @ngInject */
    function taskdetailController(SampleData, $http, $scope, $state, $location, $mdDialog, $timeout, $stateParams, $filter) {

        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {

            //API Url
            var vm = this;
            vm.today = new Date();
            vm.formsindex = 0;
            var url = window.localStorage['APIURL'];
            //var writerquant = 0;
            vm.idsall = $scope.$root.itemidsarr;
            vm.currentitem = 0;

            //Set variable for getwriters in items
            vm.witersalreadyassign = [];
            vm.totalused = 0;

            var id = $scope.$root.iittmmID;
            var cid = $scope.$root.ClientID;
            var oid = $scope.$root.OrderID;
            var idsarr = $scope.$root.arryIDs;
            var username = $scope.$root.name;
            var assigned = 0;
            vm.desingersalreadyassign = [];
            var writers = [];
            var designers = [];
            if (vm.idsall != undefined) {
                for (var i = 0; i < vm.idsall.length; i++) {

                    if (vm.idsall[i] == id) {
                        vm.currentitem = i;
                    }
                }
            }
            //var id = 1;
            var assigned = 0;
            var tagids = [];
            var allforms = [];
            var currentformselect = 0;
            if (id != undefined) {
                //empty array for writers details
                $scope.writersnamearr = [];
                // Get items by id
                getitembyid(id);
                //getDesigner();
                function getitembyid(itemid) {
                    $http.get(url + 'itemdetail/' + itemid).success(function (data, status) {
                        allforms = [];
                        tagids = [];
                        if (data.status == 'Success') {

                            vm.items = data.items;
                            vm.writersadded = data.items.writers;
                            vm.designersadded = data.items.designers;
                            vm.totalused = data.items.totalassigntasks;
                            vm.capqty = data.items.serviceqty;
                            for (var i = 0; i < vm.items.form.length; i++) {
                                allforms.push(vm.items.form[i]);
                                for (var j = 0; j < vm.items.form[i].keywords.length; j++) {
                                    tagids.push({ "id": vm.items.form[i].keywords[j].id, "name": vm.items.form[i].keywords[j].name });
                                }
                            }
                            tagids = getUniqueArray(tagids);
                            $scope.tagsname = tagids;
                            getwritersdetail(tagids);
                            getformsshow(currentformselect);
                            getDesigner();
                            getalltags();
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

                    }).error(function () {

                        $mdDialog.show(
             $mdDialog.alert()
               .parent(angular.element(document.querySelector('#popupContainer')))
               .clickOutsideToClose(true)
               .parent(angular.element(document.body))
               .title('Error')
               .textContent('API is not responding!')
               .ariaLabel('Error')
               .ok('Ok')
               .targetEvent()
           );
                    });
                }

                //get forms data
                function getformsshow(index) {
                    vm.totalcount = 0;

                    vm.forms = allforms[index];
                    vm.crntform = index + 1;
                    vm.totalcount = allforms.length;
                }

                vm.addtractqty = function (Qtyy, index) {
                    
                    if (parseInt(vm.items.totaltasks) != vm.totalused) {
                        Qtyy = Qtyy + 1;
                        vm.totalused = vm.totalused + 1;
                        var amountcal = parseFloat(vm.items.amountpertask) * Qtyy;
                        vm.witersalreadyassign[index].Qty = Qtyy;
                        vm.witersalreadyassign[index].amount = amountcal;
                        vm.witersalreadyassign[index].capacity = vm.capqty * Qtyy;
                    }
                    else {
                        $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .parent(angular.element(document.body))
              .title('Error')
              .textContent('You have only ' + vm.items.totaltasks + ' tasks.')
              .ariaLabel('Error')
              .ok('Ok')
              .targetEvent()
          );
                    }
                }
                vm.subtractqty = function (Qtyy, index) {
                   
                    if (Qtyy != 0) {
                        if (vm.totalused != 0) {
                            Qtyy = Qtyy - 1;
                            vm.totalused = vm.totalused - 1;
                            var amountcal = parseFloat(vm.items.amountpertask) * Qtyy;
                            vm.witersalreadyassign[index].Qty = Qtyy;
                            vm.witersalreadyassign[index].amount = amountcal;
                            vm.witersalreadyassign[index].capacity = vm.capqty * Qtyy;
                        }
                    }
                }

                //prev form record
                vm.prevrecord = function (index) {


                    index--;
                    vm.formsindex = index;
                    getformsshow(index);
                }
                //next form record
                vm.nextrecord = function (index) {


                    index++;
                    vm.formsindex = index;
                    getformsshow(index)
                }

                vm.deletefile = function (index)
                {
                    var confirm = $mdDialog.confirm()
         .title('Delete File')
         .textContent('Would you like to delete File?')
         .ariaLabel('Lucky day')
         .targetEvent()
         .clickOutsideToClose(true)
         .parent(angular.element(document.body))
         .ok('Yes')
         .cancel('No');

                    $mdDialog.show(confirm).then(function () {
                       
                    }, function () {
                       
                    });
                }

                //prev item record
                vm.showprevitem = function (index) {

                    index--;
                    vm.desingersalreadyassign = [];
                    vm.witersalreadyassign = [];
                    var id = vm.idsall[index];
                    vm.currentitem = index;
                    getitembyid(id);
                }
                //next item record
                vm.shownextitem = function (index) {

                    index++;
                    vm.desingersalreadyassign = [];
                    vm.witersalreadyassign = [];
                    var id = vm.idsall[index];
                    vm.currentitem = index;
                    getitembyid(id);
                }


                //to get unique values from arrary
                function getUniqueArray(array) {

                    var result = [];
                    for (var x = 0; x < array.length; x++) {
                        if (result.indexOf(array[x]) == -1)
                            result.push(array[x]);
                    }
                    return result;
                }

                //Get Writers
                function getwritersdetail(tagsname) {

                    $scope.writersnamearr = [];

                    //tagsname = getUniqueArray(tagsname);

                    for (var i = 0; i < tagsname.length; i++) {
                        $http.get(url + 'userbytags/' + tagsname[i].name).success(function (data, status) {
                            $scope.writersnamearr = [];

                            if (data.status == 'Success') {
                                for (var i = 0; i < data.items.length; i++) {
                                    $scope.writersnamearr.push(data.items[i]);
                                }

                                for (var i = 0; i < $scope.writersnamearr.length; i++) {
                                    vm.witersalreadyassign.push({
                                        "id": $scope.writersnamearr[i]._id,
                                        "name": $scope.writersnamearr[i].firstname + " " + $scope.writersnamearr[i].lastname,
                                        "capacity": 0,
                                        "Qty": 0, "date": null, "amount": 0, "isassigned": false, "active": $scope.writersnamearr[i].createddate,
                                        "flags": $scope.writersnamearr[i].Flags, "revisions": $scope.writersnamearr[i].Revisions,
                                        "reassigned": $scope.writersnamearr[i].Reassigned,
                                        "clientapproved": $scope.writersnamearr[i].ClientApproved,
                                        "autoapproved": $scope.writersnamearr[i].AutoApproved,
                                        "teamrated": $scope.writersnamearr[i].TeamRated,
                                        "clientrated": $scope.writersnamearr[i].ClientRated
                                    });
                                }

                                for (var j = 0; j < vm.witersalreadyassign.length; j++) {
                                    for (var k = 0; k < vm.writersadded.length; k++) {
                                      
                                        if (vm.writersadded[k].id == vm.witersalreadyassign[j].id) {
                                            vm.witersalreadyassign[k].id = vm.writersadded[k].id;
                                           // writerquant = writerquant + parseInt(vm.writersadded[k].taskqty);
                                            vm.witersalreadyassign[k].date = new Date(vm.writersadded[k].date);
                                            vm.witersalreadyassign[k].Qty = vm.writersadded[k].taskqty;
                                            vm.witersalreadyassign[k].amount = vm.writersadded[k].totalamount;
                                            vm.witersalreadyassign[k].isassigned = true;
                                        }



                                    }
                                }
                                
                                vm.witersalreadyassign = getUniqueArray(vm.witersalreadyassign);
                               // vm.percentagewriters = getpercentage(vm.items.totaltasks, writerquant);
                                var elementId = [];


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

                        }).error(function () {

                            $mdDialog.show(
                 $mdDialog.alert()
                   .parent(angular.element(document.querySelector('#popupContainer')))
                   .clickOutsideToClose(true)
                   .parent(angular.element(document.body))
                   .title('Error')
                   .textContent('API is not responding!')
                   .ariaLabel('Error')
                   .ok('Ok')
                   .targetEvent()
               );
                        });
                    }

                }

                //get percentage
                vm.getpercentage = function (total, assigned) {
                   
                    if (total != undefined) {
                        vm.writercount = 0;
                        var result = getpercentage(total, assigned);
                        vm.percentagewriters = result;
                        vm.writercount = (result / 100) * total;
                        return result;
                    }
                }
                function getpercentage(total, assigned) {
                    total = parseInt(total);
                    assigned = parseInt(assigned);
                    var percent = (assigned / total) * 100;
                    var final = Math.round(percent * 100) / 100;
                    return final;
                }

                //Open a controller

                $scope.showAdvanced = function (ev, itemID, orderID, users, index, tasks, type, total) {
                   
                    $scope.$root.AllData = ({ itemID: itemID, orderID: orderID, users: users, index: index, tasks: tasks, type: type, username: username });
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'app/main/taskdetail/dialog1.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: $scope.customFullscreen //Only for -xs, -sm breakpoints.
                    })
                    .then(function (answer) {
                       
                        getitembyid(id);

                    }, function () {
                       
                    });
                };
                //Open a controller
                //$scope.showAdvancedform = function (ev, itemID) {

                //    $scope.$root.formdata = itemID;
                //    $mdDialog.show({
                //        controller: DialogformController,
                //        templateUrl: 'app/main/taskdetail/dialogform.tmpl.html',
                //        parent: angular.element(document.body),
                //        targetEvent: ev,
                //        clickOutsideToClose: true,
                //        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                //    })
                //    .then(function (answer) {
                //        $scope.status = 'You said the information was "' + answer + '".';
                //    }, function () {
                //        $scope.status = 'You cancelled the dialog.';
                //    });
                //};

                //Get all tags 
                //getalltags();
                function getalltags() {
                    $http.get(url + '/tagsall/Active').success(function (data, status) {

                        if (data.status == 'Success') {
                            vm.tagsall = data.tags;
                            $scope.userData = [];
                            if (vm.tagsall.length == 0) {
                                // users = "";
                                $scope.userData = [];
                            }
                            else {
                                for (var i = 0; i < vm.tagsall.length; i++) {
                                    $scope.userData.push({
                                        "id": vm.tagsall[i]._id,
                                        "name": vm.tagsall[i].name,
                                        "place": vm.tagsall[i].name,
                                        "pic": vm.tagsall[i].name
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
               .textContent(data.message)
               .ariaLabel('Error')
               .ok('Ok')
               .targetEvent()
           );
                        }

                    }).error(function () {

                        $mdDialog.show(
             $mdDialog.alert()
               .parent(angular.element(document.querySelector('#popupContainer')))
               .clickOutsideToClose(true)
               .parent(angular.element(document.body))
               .title('Error')
               .textContent('API is not responding!')
               .ariaLabel('Error')
               .ok('Ok')
               .targetEvent()
           );
                    });
                }

                function loadAll() {


                    var allStates = vm.tagsall;
                    return allStates.map(function (state) {
                        return {
                            value: state.name,
                            display: state.name
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

                //Update writers list
                $scope.resettags = function (id, name) {

                    $timeout(function () {
                        getwritersdetail($scope.tagsname);
                    }, 3000)

                }


                //Get Designer

                function getDesigner() {
                    vm.alldesigners = [];

                    $http.get(url + 'users/Active/Designer').success(function (data, status) {
                        vm.alldesigners = [];
                        if (data.status == "Success") {
                            vm.alldesigners = data.Users;

                            for (var i = 0; i < vm.alldesigners.length; i++) {

                                vm.desingersalreadyassign.push({
                                    "id": vm.alldesigners[i]._id,
                                    "name": vm.alldesigners[i].firstname + " " + vm.alldesigners[i].lastname,
                                    "capacity": vm.alldesigners[i].availableword,
                                    "Qty": 0, "date": null, "amount": 0, "isassigned": false, "active": vm.alldesigners[i].createddate,
                                    "flags": vm.alldesigners[i].Flags, "revisions": vm.alldesigners[i].Revisions,
                                    "reassigned": vm.alldesigners[i].Reassigned,
                                    "clientapproved": vm.alldesigners[i].ClientApproved,
                                    "autoapproved": vm.alldesigners[i].AutoApproved,
                                    "teamrated": vm.alldesigners[i].TeamRated,
                                    "clientrated": vm.alldesigners[i].ClientRated
                                });
                            }

                            for (var j = 0; j < vm.desingersalreadyassign.length; j++) {
                                for (var k = 0; k < vm.designersadded.length; k++) {

                                    if (vm.designersadded[k].id == vm.desingersalreadyassign[j].id) {
                                        vm.desingersalreadyassign[k].id = vm.designersadded[k].id;

                                        vm.desingersalreadyassign[k].date = new Date(vm.designersadded[k].date);
                                        vm.desingersalreadyassign[k].Qty = vm.designersadded[k].taskqty;
                                        vm.desingersalreadyassign[k].amount = vm.designersadded[k].totalamount;
                                        vm.desingersalreadyassign[k].isassigned = true;
                                    }



                                }
                            }

                            vm.desingersalreadyassign = getUniqueArray(vm.desingersalreadyassign);
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


                    }).error(function () {
                        $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .parent(angular.element(document.body))
                  .title('Error')
                  .textContent("API Not Responding")
                  .ariaLabel('Error')
                  .ok('Ok')
                  .targetEvent()
              );
                    });

                }

                //Rating Check
                $scope.getNumber = function (num) {

                    if (num != undefined) {
                        return new Array(num);
                    }
                }


                //remove tag and update list
                vm.removetagandupdatelist = function (id) {

                    var index = tagids.indexOf(tagids);
                    tagids.splice(index, 1);
                    $timeout(function () {
                        getwritersdetail(tagids);
                    }, 3000)

                }

                vm.goback = function () {
                   
                    $scope.$root.arryIDs = idsarr;

                    $location.path('TaskItems/' + oid + '/' + cid);
                }
                vm.addtractqtydes = function (Qtyy, index) {

                    if (parseInt(vm.items.totaltasks) != vm.totalused) {
                        Qtyy = Qtyy + 1;
                        vm.totalused = vm.totalused + 1;
                        var amountcal = parseFloat(vm.items.amountpertask) * Qtyy;
                        vm.desingersalreadyassign[index].Qty = Qtyy;
                        vm.desingersalreadyassign[index].amount = amountcal;
                    }
                    else {
                        $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .parent(angular.element(document.body))
              .title('Error')
              .textContent('You have only ' + vm.items.totaltasks + ' tasks.')
              .ariaLabel('Error')
              .ok('Ok')
              .targetEvent()
          );
                    }
                }
                vm.subtractqtydes = function (Qtyy, index) {

                    if (Qtyy != 0) {
                        if (vm.totalused != 0) {
                            Qtyy = Qtyy - 1;
                            vm.totalused = vm.totalused - 1;
                            var amountcal = parseFloat(vm.items.amountpertask) * Qtyy;
                            vm.desingersalreadyassign[index].Qty = Qtyy;
                            vm.desingersalreadyassign[index].amount = amountcal;
                        }
                    }
                }



                //Assign the task to writer and designer
                vm.assigntowriter = function (itemid, writerid, orderid, taskQty, taskdate, taskamount, type) {

                    if (assigned <= vm.items.totaltasks) {
                        if (type == 'wr') {
                            if (itemid != undefined && writerid != undefined && taskQty != 0 && taskdate != null && taskamount != 0) {
                                assigned = assigned + taskQty;
                                if (writers.length == 0) {

                                    writers.push({ 'id': writerid, "date": taskdate, "totalamount": taskamount, "taskqty": taskQty });
                                    assigntask(itemid, orderid, assigned, taskQty, writers);
                                }
                                else {
                                    for (var i = 0; i < writers.length; i++) {
                                        if (writers[i].id == writerid) {
                                            if (writers[i].taskqty > vm.items.totaltasks) {
                                                $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .parent(angular.element(document.body))
                        .title('Error')
                        .textContent('cannot add more tasks')
                        .ariaLabel('Error')
                        .ok('Ok')
                        .targetEvent()
                    );
                                            }
                                            else {

                                                var total = taskQty - writers[i].taskqty;
                                                total = total + writers[i].taskqty;
                                                if (total <= vm.items.totaltasks) {
                                                    writers[i].date = taskdate;
                                                    writers[i].taskqty = total;
                                                    writers[i].totalamount = taskamount;
                                                    assigned = total;

                                                    //assigntask(itemid, orderid, total, total, writers);
                                                }
                                                else {
                                                    $mdDialog.show(
                     $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#popupContainer')))
                       .clickOutsideToClose(true)
                       .parent(angular.element(document.body))
                       .title('Error')
                       .textContent('cannot add more tasks')
                       .ariaLabel('Error')
                       .ok('Ok')
                       .targetEvent()
                   );
                                                }
                                            }
                                        }
                                        else {

                                            writers.push({ 'id': writerid, "date": taskdate, "totalamount": taskamount, "taskqty": taskQty });
                                            assigntask(itemid, orderid, assigned, taskQty, writers);
                                        }
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
                         .textContent('Please fill the information first!')
                         .ariaLabel('Error')
                         .ok('Ok')
                         .targetEvent()
                     );
                            }
                        }
                        else {
                            if (itemid != undefined && writerid != undefined && taskQty != 0 && taskdate != null && taskamount != 0) {
                                assigned = assigned + taskQty;
                                if (designers.length == 0) {
                                    designers.push({ 'id': writerid, "date": taskdate, "totalamount": taskamount, "taskqty": taskQty });
                                    assigntasktodesingers(itemid, orderid, assigned, taskQty, designers);
                                }
                                else {
                                    for (var i = 0; i < designers.length; i++) {
                                        if (designers[i].id == writerid) {
                                            if (designers[i].taskqty > vm.items.totaltasks) {
                                                $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .parent(angular.element(document.body))
                        .title('Error')
                        .textContent('cannot add more tasks')
                        .ariaLabel('Error')
                        .ok('Ok')
                        .targetEvent()
                    );
                                            }
                                            else {

                                                var total = taskQty - designers[i].taskqty;
                                                total = total + designers[i].taskqty;
                                                if (total <= vm.items.totaltasks) {
                                                    designers[i].date = taskdate;
                                                    designers[i].taskqty = total;
                                                    designers[i].totalamount = taskamount;
                                                    assigned = total;
                                                    assigntasktodesingers(itemid, orderid, total, total, designers);
                                                }
                                                else {
                                                    $mdDialog.show(
                     $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#popupContainer')))
                       .clickOutsideToClose(true)
                       .parent(angular.element(document.body))
                       .title('Error')
                       .textContent('cannot add more tasks')
                       .ariaLabel('Error')
                       .ok('Ok')
                       .targetEvent()
                   );
                                                }
                                            }
                                        }
                                        else {
                                            designers.push({ 'id': writerid, "date": taskdate, "totalamount": taskamount, "taskqty": taskQty });
                                            assigntasktodesingers(itemid, orderid, assigned, taskQty, designers);
                                        }
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
                         .textContent('Please fill the information first!')
                         .ariaLabel('Error')
                         .ok('Ok')
                         .targetEvent()
                     );
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
                   .textContent('cannot add more tasks')
                   .ariaLabel('Error')
                   .ok('Ok')
                   .targetEvent()
               );
                    }
                }
                //Assign the task to writer 
                function assigntask(itemid, orderid, assigned, taskquntity, writers) {

                    for (var i = 0; i < writers.length; i++) {
                        for (var j = 0; j < vm.witersalreadyassign.length; j++) {
                            if (vm.witersalreadyassign[j].id == writers[i].id) {
                                vm.witersalreadyassign[j].isassigned = true;
                            }
                        }
                    }



                    $http.post(url + 'itemsassign/' + itemid,
                                 {
                                     "totalassigntasks": assigned,
                                     "writers": writers,
                                     "taskquntity": taskquntity,
                                     "orderID": orderid
                                 }
                                 ).success(function (data, status) {

                                     if (data.status == 'Success') {
                                         $mdDialog.show(
                         $mdDialog.alert()
                           .parent(angular.element(document.querySelector('#popupContainer')))
                           .clickOutsideToClose(true)
                           .parent(angular.element(document.body))
                           .title('Success')
                           .textContent('Task assign successfully!')
                           .ariaLabel('')
                           .ok('Ok')
                           .targetEvent()
                       );
                                         getitembyid(id);
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

                                 }).error(function () {

                                     $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .parent(angular.element(document.body))
                            .title('Error')
                            .textContent('API is not responding!')
                            .ariaLabel('Error')
                            .ok('Ok')
                            .targetEvent()
                        );
                                 });
                }

                //Assign the task to designer
                function assigntasktodesingers(itemid, orderid, assigned, taskquntity, designers) {

                    for (var i = 0; i < designers.length; i++) {
                        for (var j = 0; j < vm.desingersalreadyassign.length; j++) {
                            if (vm.desingersalreadyassign[j].id == designers[i].id) {
                                vm.desingersalreadyassign[j].isassigned = true;
                            }
                        }
                    }
                    $http.post(url + 'itemsassigndesingers/' + itemid,
                                 {
                                     "totalassigntasks": assigned,
                                     "designers": designers,
                                     "taskquntity": taskquntity,
                                     "orderID": orderid
                                 }
                                 ).success(function (data, status) {

                                     if (data.status == 'Success') {
                                         $mdDialog.show(
                         $mdDialog.alert()
                           .parent(angular.element(document.querySelector('#popupContainer')))
                           .clickOutsideToClose(true)
                           .parent(angular.element(document.body))
                           .title('Success')
                           .textContent('Task assign successfully!')
                           .ariaLabel('')
                           .ok('Ok')
                           .targetEvent()
                       );
                                         getitembyid(id);
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

                                 }).error(function () {

                                     $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .parent(angular.element(document.body))
                            .title('Error')
                            .textContent('API is not responding!')
                            .ariaLabel('Error')
                            .ok('Ok')
                            .targetEvent()
                        );
                                 });
                }
            }
            else {
                $location.path('Orders');
            }
        }
    }

    function DialogController($scope, $mdDialog, $http, filterFilter,$location) {
     
        $scope.tasks = [];
        var url = window.localStorage['APIURL'];
        var itemID = $scope.$root.AllData.itemID;
        var orderID = $scope.$root.AllData.orderID;
        var users = $scope.$root.AllData.users;
        var index = $scope.$root.AllData.index;
        var tasks = $scope.$root.AllData.tasks;
        var type = $scope.$root.AllData.type;
        var username = $scope.$root.AllData.username;
        var taskcount = 0;
        for (var i = 0; i < users.length; i++) {
            taskcount = taskcount + parseInt(users[i].taskqty);
        }
        for (var i = 0; i < taskcount; i++) {
            $scope.tasks.push({ 'name': tasks[i], 'selected': false });
        }
        $scope.allSelected = false;

        $scope.toggleAll = function () {
            var toggleStatus = $scope.isAllSelected;
            angular.forEach($scope.tasks, function (itm) { itm.selected = toggleStatus; });

        }

        $scope.optionToggled = function () {
            $scope.isAllSelected = $scope.tasks.every(function (itm) { return itm.selected; })
        }


        $scope.selection = [];

        // Helper method to get selected fruits
        $scope.selectedTasks = function selectedTasks() {

            return filterFilter($scope.tasks, { selected: true });
        };

        // Watch fruits for changes
        $scope.$watch('tasks|filter:{selected:true}', function (nv) {

            $scope.selection = nv.map(function (task) {

                return task.name;
            });
        }, true);


        $scope.answer = function () {
               

            $http.post(url + 'itemsreassign/' + itemID,
                            {
                                "status": 'Reassigned',
                                "reasonforreopen": $scope.selectedreason,
                                "reasondesc": $scope.selecteddesc
                            }
                            ).success(function (data, status) {
                                
                                if (data.status == 'Success') {
                                    $mdDialog.hide();
                                    $location.path('Orders');
                                }
                                else {

                                }
                            }).error(function () {

                            });

        }




        getallreasons();

        function getallreasons() {
            $http.get(url + 'reasonreopen').success(function (data, status) {

                if (data.status == 'Success') {
                    $scope.reasons = data.Reasons;
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

            }).error(function () {

                $mdDialog.show(
     $mdDialog.alert()
       .parent(angular.element(document.querySelector('#popupContainer')))
       .clickOutsideToClose(true)
       .parent(angular.element(document.body))
       .title('Error')
       .textContent('API is not responding!')
       .ariaLabel('Error')
       .ok('Ok')
       .targetEvent()
    );
            });

        }


        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        //$scope.answer = function (answer) {
        //    $mdDialog.hide(answer);
        //};
    }

    function DialogformController($scope, $mdDialog, $http) {


        $scope.formsdata = $scope.$root.formdata;

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

})();



