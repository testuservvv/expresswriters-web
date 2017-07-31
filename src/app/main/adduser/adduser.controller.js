(function ($http, $scope, $location, $mdDialog, $filter) {
    'use strict';
    angular
        .module('app.adduser')
        .controller('adduserController', adduserController);

    /** @ngInject */
    function adduserController(SampleData, $http, $scope, Documents, $location, $mdDialog, $filter) {
        var vm = this;
        debugger;
        var usertype = window.localStorage['type'];
        vm.typeofuser = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {
            
            var url = window.localStorage['APIURL'];

            //categories

            $scope.unav = '';
            $scope.av = '';
            vm.answer = false;
            vm.suspendtext = "SUSPEND";
            vm.bookedval = 1;
            var servicealldata = [];
            vm.word = 0;
            vm.hdnshwtxt = 'Show';
            vm.typeoftax = "password";
            vm.lck = 'icon-lock-outline';
            vm.customselect = "";
            //getservices();
            getuserroles();
            getcategories();
            getAllStyles();
            getAlltags();
            //Get all tags details
            function getAlltags() {

                $http.get(url + 'tagsshhowall/' + 'Active', {}).success(function (data, status) {

                    if (data.status == 'Success') {
                        vm.alltags = data.tags;
                        $scope.userData = [];
                        if (vm.alltags.length == 0) {
                            // users = "";
                            $scope.userData = [];
                        }
                        else {
                            for (var i = 0; i < vm.alltags.length; i++) {
                                $scope.userData.push({
                                    "id": vm.alltags[i]._id,
                                    "name": vm.alltags[i].name,
                                    "place": vm.alltags[i].name,
                                    "pic": vm.alltags[i].name
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
            vm.countofseleteddays = 0;
            vm.countdays = function (valuechk) {

                if (valuechk == true) {
                    vm.countofseleteddays = vm.countofseleteddays + 1;
                }
                else {
                    if (vm.countofseleteddays != 0) {
                        vm.countofseleteddays = vm.countofseleteddays - 1;
                    }
                }
            }
            vm.getpayout = function (servicetype) {


                getservices(servicetype);
            }
            //function to get all services
            function getservices(srety) {
                $http.get(url + 'services/' + srety).success(function (data, status) {
                   
                    //servicealldata = data.services;
                    vm.filteredTodos = data.services;
                    //gethtmltr();
                }).error(function () {

                    console.log('error');
                });
            }

            //create html
            //function gethtmltr() {
            //    debugger;
            //    var htmltable = '';
            //    var type = window.localStorage['type'];
            //    if (type == 'Admin') {
            //        for (var i = 0; i < vm.filteredTodos.length; i++) {

            //            var teamrated = "";
            //            var clientrated = "";
            //            for (var j = 0; j < vm.filteredTodos[i].TeamRated; j++) {
            //                teamrated = teamrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
            //            }
            //            var jh = 5 - (vm.filteredTodos[i].TeamRated);
            //            for (var k = 0; k < jh ; k++) {
            //                teamrated = teamrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
            //            }
            //            for (var l = 0; l < vm.filteredTodos[i].ClientRated; l++) {
            //                clientrated = clientrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
            //            }
            //            var jk = 5 - (vm.filteredTodos[i].ClientRated);
            //            for (var m = 0; m < jk; m++) {
            //                clientrated = clientrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
            //            }
            //            if (vm.filteredTodos[i].Type == 'Writer') {
            //                if (vm.filteredTodos[i].status != 'ACTIVE') {
            //                    htmltable = htmltable + "<tr 'class='ng-scope'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                        "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                         "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                        + "<td class='position ng-binding'>" + vm.filteredTodos[i].servicename + "</td>" +
            //                                        "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> <input type='text' ng-modal='" + vm.filteredTodos[i].General + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> <input type='text' ng-modal='" + vm.filteredTodos[i].Expert + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> <input type='text' ng-modal='" + vm.filteredTodos[i].Authority + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='salary text-right ng-binding'>" +

            //                                            "<span style='color:red;' class='last-status'>" + vm.filteredTodos[i].status + "</span>" +
            //                                        "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +


            //                                        "</td>" +

            //                                        " </tr>";
            //                    $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
            //                    htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
            //                "<div class='rating-list00'><li class='list-rating'><span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Team Rated:</span>" + teamrated + "</li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Rated:</span>" + clientrated + "</li></div></td></tr>";
            //                }
            //                else {
            //                    htmltable = htmltable + "<tr 'class='ng-scope'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                           "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                           "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                       + "<td class='position ng-binding' >" + vm.filteredTodos[i].servicename + "</td>" +
            //                                       "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'><input type='text' ng-modal='" + vm.filteredTodos[i].General + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'><input type='text' ng-modal='" + vm.filteredTodos[i].Expert + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'><input type='text' ng-modal='" + vm.filteredTodos[i].Authority + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='salary text-right ng-binding'>" +
            //                   "<span style='color:green;'>" + vm.filteredTodos[i].status + "</span>" +

            //                                       "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +



            //                                       "</td>" +

            //                                       " </tr>";
            //                    $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
            //                    htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
            //                 "<div class='rating-list00'><li class='list-rating'><span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Team Rated:</span>" + teamrated + "</li>" +
            //                 "<li class='list-rating'><span class='service-title'>Client Rated:</span>" + clientrated + "</li></div></td></tr>";
            //                }
            //            }

            //            if (vm.filteredTodos[i].Type == 'Editor' || vm.filteredTodos[i].Type == 'Custom' || vm.filteredTodos[i].Type == 'Social Media Manager') {
            //                if (vm.filteredTodos[i].status != 'ACTIVE') {
            //                    htmltable = htmltable + "<tr 'class='ng-scope'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                        "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                         "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                        + "<td class='position ng-binding'>" + vm.filteredTodos[i].servicename + "</td>" +
            //                                        "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ <input type='text' value='" + vm.filteredTodos[i].Level1 + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ <input type='text' value='" + vm.filteredTodos[i].Level2 + "'/> " + vm.filteredTodos[i].Per + "</td>" +

            //                                        "<td class='salary text-right ng-binding'>" +

            //                                            "<span style='color:red;' class='last-status'>" + vm.filteredTodos[i].status + "</span>" +
            //                                        "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +


            //                                        "</td>" +

            //                                        " </tr>";
            //                    $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
            //                    htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
            //                "<div class='rating-list00'><li class='list-rating'><span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Team Rated:</span>" + teamrated + "</li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Rated:</span>" + clientrated + "</li></div></td></tr>";
            //                }
            //                else {
            //                    htmltable = htmltable + "<tr 'class='ng-scope'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                           "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                           "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                       + "<td class='position ng-binding' >" + vm.filteredTodos[i].servicename + "</td>" +
            //                                       "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ <input type='text' value='" + vm.filteredTodos[i].Level1 + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ <input type='text' value='" + vm.filteredTodos[i].Level2 + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='salary text-right ng-binding'>" +
            //                   "<span style='color:green;'>" + vm.filteredTodos[i].status + "</span>" +

            //                                       "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +



            //                                       "</td>" +

            //                                       " </tr>";
            //                    $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
            //                    htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
            //                "<div class='rating-list00'><li class='list-rating'><span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Team Rated:</span>" + teamrated + "</li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Rated:</span>" + clientrated + "</li></div></td></tr>";
            //                }
            //            }



            //            if (vm.filteredTodos[i].Type == 'Sales' || vm.filteredTodos[i].Type == 'Manager' || vm.filteredTodos[i].Type == 'Assistant') {
            //                var hdnstyle = "";
            //                var options = "<td><select><option selected='selected'>Hourly</option><option onclick='shhdll(this)'>Weekly</option></select></td>";

            //                if (i != 0) {
            //                    hdnstyle = "style='display:none;'";
            //                    options = "<td><select><option selected='selected'>Weekly</option><option onclick='shhdff(this)'>Hourly</option></select></td>";
            //                }

            //                if (vm.filteredTodos[i].status != 'ACTIVE') {

            //                    htmltable = htmltable + "<tr " + hdnstyle + " 'class='ng-scope' id='tr-" + vm.filteredTodos[i]._id + "'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                        "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                         "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                        + options +
            //                                        "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ <input type='text' value='" + vm.filteredTodos[i].Level1 + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ <input type='text' value='" + vm.filteredTodos[i].Level2 + "'/> " + vm.filteredTodos[i].Per + "</td>" +

            //                                        "<td class='salary text-right ng-binding'>" +

            //                                            "<span style='color:red;' class='last-status'>" + vm.filteredTodos[i].status + "</span>" +
            //                                        "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20'></i>" +


            //                                        "</td>" +

            //                                        " </tr>";

            //                }
            //                else {
            //                    htmltable = htmltable + "<tr " + hdnstyle + " 'class='ng-scope' id='tr-" + vm.filteredTodos[i]._id + "'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                           "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                           "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"
            //                    + options +
            //                                       "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ <input type='text' value='" + vm.filteredTodos[i].Level1 + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ <input type='text' value='" + vm.filteredTodos[i].Level2 + "'/> " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='salary text-right ng-binding'>" +
            //                   "<span style='color:green;'>" + vm.filteredTodos[i].status + "</span>" +

            //                                       "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' ></i>" +



            //                                       "</td>" +

            //                                       " </tr>";
                               
            //                }
            //            }
            //        }
            //    }
            //    else {
            //        for (var i = 0; i < vm.filteredTodos.length; i++) {

            //            var teamrated = "";
            //            var clientrated = "";
            //            for (var j = 0; j < vm.filteredTodos[i].TeamRated; j++) {
            //                teamrated = teamrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
            //            }
            //            var jh = 5 - (vm.filteredTodos[i].TeamRated);
            //            for (var k = 0; k < jh ; k++) {
            //                teamrated = teamrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
            //            }
            //            for (var l = 0; l < vm.filteredTodos[i].ClientRated; l++) {
            //                clientrated = clientrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
            //            }
            //            var jk = 5 - (vm.filteredTodos[i].ClientRated);
            //            for (var m = 0; m < jk; m++) {
            //                clientrated = clientrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
            //            }
            //            if (vm.filteredTodos[i].Type == 'Writer') {
            //                if (vm.filteredTodos[i].status != 'ACTIVE') {
            //                    htmltable = htmltable + "<tr 'class='ng-scope'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                        "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                         "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                        + "<td class='position ng-binding'>" + vm.filteredTodos[i].servicename + "</td>" +
            //                                        "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].General + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].Expert + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].Authority + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='salary text-right ng-binding'>" +

            //                                            "<span style='color:red;' class='last-status'>" + vm.filteredTodos[i].status + "</span>" +
            //                                        "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +


            //                                        "</td>" +

            //                                        " </tr>";
            //                    $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
            //                    htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
            //                "<div class='rating-list00'><li class='list-rating'><span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Team Rated:</span>" + teamrated + "</li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Rated:</span>" + clientrated + "</li></div></td></tr>";
            //                }
            //                else {
            //                    htmltable = htmltable + "<tr 'class='ng-scope'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                           "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                           "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                       + "<td class='position ng-binding' >" + vm.filteredTodos[i].servicename + "</td>" +
            //                                       "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].General + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].Expert + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].Authority + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='salary text-right ng-binding'>" +
            //                   "<span style='color:green;'>" + vm.filteredTodos[i].status + "</span>" +

            //                                       "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +



            //                                       "</td>" +

            //                                       " </tr>";
            //                    $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
            //                    htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
            //                 "<div class='rating-list00'><li class='list-rating'><span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span></li>" +
            //                 "<li class='list-rating'><span class='service-title'>Team Rated:</span>" + teamrated + "</li>" +
            //                 "<li class='list-rating'><span class='service-title'>Client Rated:</span>" + clientrated + "</li></div></td></tr>";
            //                }
            //            }

            //            if (vm.filteredTodos[i].Type == 'Editor' || vm.filteredTodos[i].Type == 'Custom' || vm.filteredTodos[i].Type == 'Social Media Manager') {
            //                if (vm.filteredTodos[i].status != 'ACTIVE') {
            //                    htmltable = htmltable + "<tr 'class='ng-scope'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                        "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                         "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                        + "<td class='position ng-binding'>" + vm.filteredTodos[i].servicename + "</td>" +
            //                                        "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ " + vm.filteredTodos[i].Level1 + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ " + vm.filteredTodos[i].Level2 + " " + vm.filteredTodos[i].Per + "</td>" +

            //                                        "<td class='salary text-right ng-binding'>" +

            //                                            "<span style='color:red;' class='last-status'>" + vm.filteredTodos[i].status + "</span>" +
            //                                        "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +


            //                                        "</td>" +

            //                                        " </tr>";
            //                    $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
            //                    htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
            //                "<div class='rating-list00'><li class='list-rating'><span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Team Rated:</span>" + teamrated + "</li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Rated:</span>" + clientrated + "</li></div></td></tr>";
            //                }
            //                else {
            //                    htmltable = htmltable + "<tr 'class='ng-scope'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                           "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                           "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                       + "<td class='position ng-binding' >" + vm.filteredTodos[i].servicename + "</td>" +
            //                                       "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ " + vm.filteredTodos[i].Level1 + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ " + vm.filteredTodos[i].Level2 + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='salary text-right ng-binding'>" +
            //                   "<span style='color:green;'>" + vm.filteredTodos[i].status + "</span>" +

            //                                       "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +



            //                                       "</td>" +

            //                                       " </tr>";
            //                    $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
            //                    htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
            //                "<div class='rating-list00'><li class='list-rating'><span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span></li>" +
            //                "<li class='list-rating'><span class='service-title'>Team Rated:</span>" + teamrated + "</li>" +
            //                "<li class='list-rating'><span class='service-title'>Client Rated:</span>" + clientrated + "</li></div></td></tr>";
            //                }
            //            }



            //            if (vm.filteredTodos[i].Type == 'Sales' || vm.filteredTodos[i].Type == 'Manager' || vm.filteredTodos[i].Type == 'Assistant') {
            //                var hdnstyle = "";
            //                var options = "<td><select><option selected='selected'>Hourly</option><option onclick='shhdll(this)'>Weekly</option></select></td>";

            //                if (i != 0) {
            //                    hdnstyle = "style='display:none;'";
            //                    options = "<td><select><option selected='selected'>Weekly</option><option onclick='shhdff(this)'>Hourly</option></select></td>";
            //                }

            //                if (vm.filteredTodos[i].status != 'ACTIVE') {

            //                    htmltable = htmltable + "<tr " + hdnstyle + " 'class='ng-scope' id='tr-" + vm.filteredTodos[i]._id + "'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                        "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                         "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"

            //                                        + options +
            //                                        "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ " + vm.filteredTodos[i].Level1 + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ " + vm.filteredTodos[i].Level2 + " " + vm.filteredTodos[i].Per + "</td>" +

            //                                        "<td class='salary text-right ng-binding'>" +

            //                                            "<span style='color:red;' class='last-status'>" + vm.filteredTodos[i].status + "</span>" +
            //                                        "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20'></i>" +


            //                                        "</td>" +

            //                                        " </tr>";

            //                }
            //                else {
            //                    htmltable = htmltable + "<tr " + hdnstyle + " 'class='ng-scope' id='tr-" + vm.filteredTodos[i]._id + "'>" +
            //                                        "<td class='name ng-binding'>" +
            //                                           "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
            //                                           "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
            //                                          "</td>"
            //                    + options +
            //                                       "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ " + vm.filteredTodos[i].Level1 + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                        "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $ " + vm.filteredTodos[i].Level2 + " " + vm.filteredTodos[i].Per + "</td>" +
            //                                       "<td class='salary text-right ng-binding'>" +
            //                   "<span style='color:green;'>" + vm.filteredTodos[i].status + "</span>" +

            //                                       "</td>" +
            //                                        "<td><i class='icon-play-circle-outline s20' ></i>" +



            //                                       "</td>" +

            //                                       " </tr>";
            //                    //    $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
            //                    //    htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
            //                    //"<div class='rating-list00'><li class='list-rating'><span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span></li>" +
            //                    //"<li class='list-rating'><span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span></li>" +
            //                    //"<li class='list-rating'><span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span></li>" +
            //                    //"<li class='list-rating'><span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span></li>" +
            //                    //"<li class='list-rating'><span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span></li>" +
            //                    //"<li class='list-rating'><span class='service-title'>Team Rated:</span>" + teamrated + "</li>" +
            //                    //"<li class='list-rating'><span class='service-title'>Client Rated:</span>" + clientrated + "</li></div></td></tr>";
            //                }
            //            }
            //        }
            //    }
            //    //alert(htmltable);
            //    $('#tableservice').html(htmltable);
            //}
            //Rating Check
            $scope.getNumber = function (num) {

                if (num != undefined) {
                    return new Array(num);
                }
            }

            //function to get all userroles
            function getuserroles() {
                $http.get(url + 'userrole').success(function (data, status) {


                    vm.jobsroles = data.userrole;

                }).error(function () {

                    console.log('error');
                });
            }

            //function to get all  categories
            function getcategories() {
                $http.get(url + 'categories').success(function (data, status) {


                    vm.categories = data.categories;

                }).error(function () {

                    console.log('error');
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
            //cancel the add user
            $scope.cancel = function () {
                $location.path('Users');
            }
            //toogle avalable and unavalable
            $scope.toggle = function (ans) {

                if (ans != false) {
                    $scope.unav = 'green';
                    $scope.av = '';
                    vm.answer = true;
                }
                else {
                    $scope.unav = '';
                    $scope.av = 'green';
                    vm.answer = false;
                }
            }

            //suspend the user
            $scope.suspend = function () {
                if (vm.suspendtext == "SUSPEND") {
                    vm.suspendtext = "UN-SUSPEND";
                }
                else {
                    vm.suspendtext = "SUSPEND"
                }
            }
            //datatable data

            vm.widget7 = {

                title: "Jobs",
                table: vm.filteredTodos,
                dtOptions: {
                    dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                    pagingType: 'simple',
                    //pageLength: 10,
                    //lengthMenu: [10, 20, 50, 100],
                    autoWidth: false,
                    responsive: true,
                    paging: false,
                    columnDefs: [
                        {
                            width: '20%',
                            targets: [0, 1, 2, 3, 4, 5, 6]
                        }
                    ],
                    columns: [
                        {},
                        {},
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
                        }
                    ]
                }
            };

            //suspend service 
            $scope.Suspendtest = function () {

                var ids = $('#selectedids').val();
                var itemId = ids.substring(1);
                var array1 = itemId.split(',');
                var array = array1.filter(function (itm, i, array1) {
                    return i == array1.indexOf(itm);
                });
                if (ids != "") {
                    updateservice(array, 'SUSPEND');
                }
                else {
                    $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .parent(angular.element(document.body))
                                    .title('Error!')
                                    .textContent('Please select a service first!')
                                    .ariaLabel('')
                                    .ok('Ok')
                                    .targetEvent()
                                );
                }
            }
            //suspend service 
            $scope.SuspendtestSales = function () {

                var ids = $('#selectedids').val();
                var itemId = ids.substring(1);
                var array1 = itemId.split(',');
                var array = array1.filter(function (itm, i, array1) {
                    return i == array1.indexOf(itm);
                });
                if (ids != "") {
                    updateservice(array, 'SUSPEND');

                    $('#tr-' + array1).show();
                    $('#tr-' + array1).prev('tr').prev('tr').hide();
                    $('#tr-' + array1).next('tr').next('tr').hide();
                }
                else {
                    $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .parent(angular.element(document.body))
                                    .title('Error!')
                                    .textContent('Please select a service first!')
                                    .ariaLabel('')
                                    .ok('Ok')
                                    .targetEvent()
                                );
                }
            }
            //Send Test service 
            $scope.SendTest = function () {

                var ids = $('#selectedids').val();
                var itemId = ids.substring(1);
                var array1 = itemId.split(',');
                var array = array1.filter(function (itm, i, array1) {
                    return i == array1.indexOf(itm);
                });
                if (ids != "") {
                    updateservice(array, 'Send a test');
                }
                else {
                    $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .parent(angular.element(document.body))
                                    .title('Error!')
                                    .textContent('Please select a service first!')
                                    .ariaLabel('')
                                    .ok('Ok')
                                    .targetEvent()
                                );
                }
            }

            //Send Test service for sales section 
            $scope.SendTestSales = function () {

                var ids = $('#selectedids').val();
                var itemId = ids.substring(1);
                var array1 = itemId.split(',');
                var array = array1.filter(function (itm, i, array1) {
                    return i == array1.indexOf(itm);
                });
                if (ids != "") {

                    updateservice(array, 'Send a test');

                    $('#tr-' + array1).show();
                    $('#tr-' + array1).prev('tr').prev('tr').hide();
                    $('#tr-' + array1).next('tr').next('tr').hide();


                }
                else {
                    $mdDialog.show(
                                  $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .parent(angular.element(document.body))
                                    .title('Error!')
                                    .textContent('Please select a service first!')
                                    .ariaLabel('')
                                    .ok('Ok')
                                    .targetEvent()
                                );
                }
            }
            function updateservice(id, stacurrent) {

                for (var j = 0; j < id.length; j++) {
                    for (var i = 0; i < vm.filteredTodos.length; i++) {
                        if (vm.filteredTodos[i]._id == id[j]) {

                            vm.filteredTodos[i].status = stacurrent;
                            //vm.selectedId = "";
                        }
                    }
                }
                $('#selectedids').val("");
                gethtmltr();
            }



            $scope.getNumber = function (num) {
                return new Array(num);
            }
            //create user

            $scope.createuser = function () {
                var ids = [];
                var styles = [];
                if (vm.jobsrole == 'Admin') {
                    ids = "";
                    styles = "";
                    saveuser(ids, styles);
                }
                for (var t = 0; t < vm.filteredTodos.length; t++) {
                    var result = $('#' + vm.filteredTodos[t]._id).val();

                    result = result.split('-');
                    if (result[0] !== "" && result[0] != null) {
                        ids.push({ 'id': vm.filteredTodos[t]._id, 'name': result, 'status': result[1] });
                    }
                }

                if (vm.jobsrole == 'Writer') {

                    for (var k = 0; k < vm.styles.length; k++) {
                        if ($('#' + vm.styles[k]._id).hasClass('md-checked')) {
                            styles.push({ 'id': vm.styles[k]._id, 'name': vm.styles[k].stylename });
                        }
                    }
                    saveuser(ids, styles);
                }

                if (vm.jobsrole == 'Sales' || vm.jobsrole == 'Manager' || vm.jobsrole == 'Assistant' || vm.jobsrole == 'Editor' || vm.jobsrole == 'Custom'
                    || vm.jobsrole == 'Social Media Manager') {

                    styles = "";
                    saveuser(ids, styles);
                }
            }
            //to save the user
            function saveuser(payout, styles) {

                var availability = '';
                var suspendstatus = '';
                var totalavalablehr = "";

                var hrsavaleditor = [];
                var avaldays = [];
                var userdata = {};
                {
                    if (vm.suspendtext == "UN-SUSPEND") {
                        suspendstatus = "Suspend";
                    }
                    else {
                        suspendstatus = "Active";
                    }
                    if ($scope.unav == 'green') {
                        availability = "Unavailable";
                    }
                    else {
                        availability = "Available";
                    }
                }

                if (vm.jobsrole == 'Sales' || vm.jobsrole == 'Manager' || vm.jobsrole == 'Assistant' || vm.jobsrole == 'Custom'
                    || vm.jobsrole == 'Social Media Manager' || vm.jobsrole == 'Admin') {

                    vm.categories = {};
                }
                //For editor
                if (vm.jobsrole == 'Editor') {
                    vm.categories = {};
                    totalavalablehr = parseInt(vm.EMhr) + parseInt(vm.LMhr) + parseInt(vm.EAhr)
                        + parseInt(vm.LAhr) + parseInt(vm.EEhr) + parseInt(vm.LEhr);
                    if (vm.EMhr != undefined && vm.EMhr != "") {
                        hrsavaleditor.push({ "name": "Early Morning", "time": vm.EMhr });
                    }
                    if (vm.LMhr != undefined && vm.LMhr != "") {
                        hrsavaleditor.push({ "name": "Late Morning", "time": vm.LMhr });
                    }
                    if (vm.EAhr != undefined && vm.EAhr != "") {
                        hrsavaleditor.push({ "name": "Early Afternoon", "time": vm.EAhr });
                    }
                    if (vm.LAhr != undefined && vm.LAhr != "") {
                        hrsavaleditor.push({ "name": "Late Afternoon", "time": vm.LAhr });
                    }
                    if (vm.EEhr != undefined && vm.EEhr != "") {
                        hrsavaleditor.push({ "name": "Early Evening", "time": vm.EEhr });
                    }
                    if (vm.LEhr != undefined && vm.LEhr != "") {
                        hrsavaleditor.push({ "name": "Late Evening", "time": vm.LEhr });
                    }
                    //days selected
                    if (vm.Mon != undefined && vm.Mon != "") {
                        avaldays.push({ "name": "Mon", "value": true });
                    }
                    else {
                        avaldays.push({ "name": "Mon", "value": false });
                    }
                    if (vm.Tue != undefined && vm.Tue != "") {
                        avaldays.push({ "name": "Tue", "value": true });
                    }
                    else {
                        avaldays.push({ "name": "Tue", "value": false });
                    }
                    if (vm.Wed != undefined && vm.Wed != "") {
                        avaldays.push({ "name": "Wed", "value": true });
                    }
                    else {
                        avaldays.push({ "name": "Wed", "value": false });
                    }
                    if (vm.Thur != undefined && vm.Thur != "") {
                        avaldays.push({ "name": "Thur", "value": true });
                    }
                    else {
                        avaldays.push({ "name": "Thur", "value": false });
                    }
                    if (vm.Fri != undefined && vm.Fri != "") {
                        avaldays.push({ "name": "Fri", "value": true });
                    }
                    else {
                        avaldays.push({ "name": "Fri", "value": false });
                    }
                    if (vm.Sat != undefined && vm.Sat != "") {
                        avaldays.push({ "name": "Sat", "value": true });
                    }
                    else {
                        avaldays.push({ "name": "Sat", "value": false });
                    }
                }
                $http.post(url + 'users/Admin',
                                          {
                                              "firstname": vm.firstname,
                                              "lastname": vm.lastname,
                                              "username": vm.email,
                                              "paymentemail": vm.paymentemail,
                                              "phone": vm.Phone,
                                              "extphone": vm.ext,
                                              "street": vm.StreetAddress,
                                              "city": vm.City,
                                              "state": vm.StateRegion,
                                              "country": vm.Country,
                                              "postalcode": vm.postalCode,
                                              "taxinfo": vm.EINSSN,
                                              "availability": availability,
                                              "availableword": vm.word,
                                              "Bookedoutfor": vm.bookedval,
                                              "services": vm.filteredTodos,
                                              "servicesselcted": payout,
                                              "writingstyles": styles,
                                              "categoriestags": vm.categories,
                                              "totalhrperday": totalavalablehr,
                                              "hrperdaycat": hrsavaleditor,
                                              "noofdayswork": vm.countofseleteddays,
                                              "avaldays": avaldays,
                                              "roles": {
                                                  "role": vm.jobsrole
                                              },
                                              "Status": suspendstatus,
                                              "customusertype": vm.customselect
                                          }).success(function (data, status) {

                                              if (data.status == "Success") {
                                                  if (vm.jobsrole == 'Writer') {
                                                      userdata = ({ 'id': data.results._id, 'name': data.results.firstname + " " + data.results.lastname })
                                                      for (var i = 0; i < styles.length; i++) {
                                                          addWriter(styles[i].id, userdata);

                                                      }
                                                      for (var j = 0; j < vm.categories.length; j++) {
                                                          for (var k = 0; k < vm.categories[j].tags.length; k++) {
                                                              addwritertotagstable(vm.categories[j].tags[k].id, userdata)
                                                          }

                                                      }
                                                  }
                                                  $location.path('Users');
                                              }

                                              else {

                                              }
                                          }).error(function (data) {

                                              $mdDialog.show(
                                $mdDialog.alert()
                                  .parent(angular.element(document.querySelector('#popupContainer')))
                                  .clickOutsideToClose(true)
                                  .parent(angular.element(document.body))
                                  .title('Error!')
                                  .textContent('Error')
                                  .ariaLabel('')
                                  .ok('Ok')
                                  .targetEvent()
                              );


                                          });
            }

            //tax filed show hide
            $scope.hideshowtype = function () {
                if (vm.hdnshwtxt == 'Show') {
                    vm.hdnshwtxt = 'Hide';
                    vm.typeoftax = "text";
                    vm.lck = 'icon-lock-unlocked-outline';

                }
                else {
                    vm.hdnshwtxt = 'Show';
                    vm.typeoftax = "password";
                    vm.lck = 'icon-lock-outline';
                }
            }


            // after save update styles table
            function addWriter(stid, userdata) {
                $http.post(url + 'style/adduser/' + stid, {
                    "users": userdata
                }).success(function (data, status) {

                    if (data.status == 'Success') {


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

            //after save update tags table
            function addwritertotagstable(stid, userdata) {

                $http.post(url + 'tags/adduser/' + stid, {
                    "users": userdata
                }).success(function (data, status) {

                    if (data.status == 'Success') {


                    }
                    else {

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

            vm.cancel = function () {
                $location.path('Users');
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
            $scope.transformChip = function (chip) {

                var user = { "id": chip.id, "name": chip.name };
                return user;
            };
        }
    }
})();
