(function ($http, $scope, $location, $mdDialog, $filter) {
    'use strict';
    angular
        .module('app.edituser')
        .controller('edituserController', edituserController);

    /** @ngInject */
    function edituserController(SampleData, $http, $scope, Documents, $location, $mdDialog, $filter) {
        var vm = this;
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
            var userid = $scope.$root.uidw;
            vm.hdnshwtxt = 'Show';
            vm.typeoftax = "password";
            vm.lck = 'icon-lock-outline';
            if (userid == undefined) {
                $location.path('Users');
            }
            else {
                //get user detail by id
                getAllStyles();
                getuserdetail();
                getAlltags();

                function getuserdetail() {
                    $http.get(url + 'users/' + userid).success(function (data, status) {

                        if (data.status == 'Success') {
                            vm.jobsrole = data.User.roles.role;
                            vm.firstname = data.User.firstname;
                            vm.lastname = data.User.lastname;
                            vm.email = data.User.username;
                            vm.paymentemail = data.User.paymentemail;
                            vm.Phone = data.User.phone;
                            vm.ext = data.User.extphone;
                            vm.StreetAddress = data.User.street;
                            vm.City = data.User.city;
                            vm.StateRegion = data.User.state;
                            vm.Country = data.User.country;
                            vm.postalCode = data.User.postalcode;
                            vm.EINSSN = data.User.taxinfo;
                            vm.word = data.User.availableword;
                            vm.bookedval = data.User.Bookedoutfor;
                            vm.categories = data.User.categoriestags;
                            vm.styledata = data.User.writingstyles;
                            vm.filteredTodos = data.User.services;
                            vm.servicesselcted = data.User.servicesselcted;
                            if (vm.jobsrole == 'Editor') {

                                vm.countofseleteddays = data.User.noofdayswork;
                                vm.selecteddays = data.User.avaldays;
                                for (var o = 0; o < vm.selecteddays.length; o++) {
                                    if (vm.selecteddays[o].value == true) {
                                        if (vm.selecteddays[o].name == 'Mon') {
                                            vm.Mon = true;
                                        }
                                        if (vm.selecteddays[o].name == 'Tue') {
                                            vm.Tue = true;
                                        }
                                        if (vm.selecteddays[o].name == 'Wed') {
                                            vm.Wed = true;
                                        }
                                        if (vm.selecteddays[o].name == 'Thur') {
                                            vm.Thur = true;
                                        }
                                        if (vm.selecteddays[o].name == 'Fri') {
                                            vm.Fri = true;
                                        }
                                        if (vm.selecteddays[o].name == 'Sat') {
                                            vm.Sat = true;
                                        }


                                    }
                                }

                                vm.slidersvalues = data.User.hrperdaycat;
                                for (var h = 0; h < vm.slidersvalues.length; h++) {

                                    if (vm.slidersvalues[h].name == 'Early Morning') {
                                        vm.EMhr = vm.slidersvalues[h].time;
                                    }
                                    if (vm.slidersvalues[h].name == 'Late Morning') {
                                        vm.LMhr = vm.slidersvalues[h].time;
                                    }
                                    if (vm.slidersvalues[h].name == 'Early Afternoon') {
                                        vm.EAhr = vm.slidersvalues[h].time;
                                    }
                                    if (vm.slidersvalues[h].name == 'Late Afternoon') {
                                        vm.LAhr = vm.slidersvalues[h].time;
                                    }
                                    if (vm.slidersvalues[h].name == 'Early Evening') {
                                        vm.EEhr = vm.slidersvalues[h].time;
                                    }
                                    if (vm.slidersvalues[h].name == 'Late Evening') {
                                        vm.LEhr = vm.slidersvalues[h].time;
                                    }



                                }
                            }

                            if (data.User.availability == 'Available') {
                                $scope.unav = '';
                                $scope.av = 'green';
                                vm.answer = true;
                            }
                            else {
                                $scope.unav = 'green';
                                $scope.av = '';
                                vm.answer = false;
                            }
                            if (data.User.Status == 'Active') {
                                vm.suspendtext = "SUSPEND"
                            }
                            else {
                                vm.suspendtext = "UN-SUSPEND";
                            }
                            if (vm.jobsrole == 'Custom') {
                                vm.customselect = data.User.customusertype;
                            }
                            else {
                                vm.customusertype = "";
                            }

                        }
                        else {
                            $mdDialog.show(
                                $mdDialog.alert()
                                  .parent(angular.element(document.querySelector('#popupContainer')))
                                  .clickOutsideToClose(true)
                                  .parent(angular.element(document.body))
                                  .title('Error!')
                                  .textContent(data.message)
                                  .ariaLabel('')
                                  .ok('Ok')
                                  .targetEvent()
                              );
                        }

                    }).error(function () {

                        console.log('error');
                    });
                }
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

                setTimeout(function () {
                    angular.element(document).ready(function () {

                        gethtmltr();

                        for (var i = 0; i < vm.styledata.length; i++) {
                            $('#' + vm.styledata[i].id).addClass('md-checked');
                        }


                        for (var j = 0; j < vm.servicesselcted.length; j++) {
                            // $('#sl-' + vm.servicesselcted[j].id).addClass('service-select-active');

                            var get = true;

                            $('#sl-' + vm.servicesselcted[j].id).parent('tr').find('td').each(function () {
                                var dt = $(this).html();
                                if (get == true) {
                                    if (dt == vm.servicesselcted[j].name[0]) {
                                        $(this).addClass('service-select-active');
                                        get = false;
                                    }
                                }
                            });

                            $('#sl-' + vm.servicesselcted[j].id).parent('tr').find('input[type="checkbox"]').each(function () {
                                $(this).prop('checked', true);
                            });
                            $('#sl-' + vm.servicesselcted[j].id).parent('tr').find('input[type="hidden"]').each(function () {
                                $(this).val($('#sl-' + vm.servicesselcted[j].id).html() + '-' + $('#sl-' + vm.servicesselcted[j].id).parent('tr').find('.last-status').find('span').html());
                            });
                            if (vm.jobsrole == 'Sales') {
                                $('#tr-' + vm.servicesselcted[j].id).show();
                                $('#tr-' + vm.servicesselcted[j].id).prev('tr').prev('tr').hide();
                                $('#tr-' + vm.servicesselcted[j].id).next('tr').next('tr').hide();

                            }
                        }
                    });
                }, 3000);
                //create html
                function gethtmltr() {

                    var htmltable = '';

                    for (var i = 0; i < vm.filteredTodos.length; i++) {

                        var teamrated = "";
                        var clientrated = "";
                        for (var j = 0; j < vm.filteredTodos[i].TeamRated; j++) {
                            teamrated = teamrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
                        }
                        var jh = 5 - (vm.filteredTodos[i].TeamRated);
                        for (var k = 0; k < jh ; k++) {
                            teamrated = teamrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
                        }
                        for (var l = 0; l < vm.filteredTodos[i].ClientRated; l++) {
                            clientrated = clientrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
                        }
                        var jk = 5 - (vm.filteredTodos[i].ClientRated);
                        for (var m = 0; m < jk; m++) {
                            clientrated = clientrated + "<span class='payout-data'><i class='icon icon-star s10'></i></span>";
                        }
                        if (vm.filteredTodos[i].Type == 'Writer') {
                            if (vm.filteredTodos[i].status != 'ACTIVE') {
                                htmltable = htmltable + "<tr 'class='ng-scope'>" +
                                                    "<td class='name ng-binding'>" +
                                                    "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
                                                     "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
                                                      "</td>"

                                                    + "<td class='position ng-binding'>" + vm.filteredTodos[i].servicename + "</td>" +
                                                    "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].General + "</td>" +
                                                    "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].Expert + "</td>" +
                                                    "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].Authority + "</td>" +
                                                    "<td class='salary text-right ng-binding'>" +

                                                        "<span style='color:red;' class='last-status'>" + vm.filteredTodos[i].status + "</span>" +
                                                    "</td>" +
                                                    "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +


                                                    "</td>" +

                                                    " </tr>";
                                $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
                                htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
                            "<span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span>" +
                            "<span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span>" +
                            "<span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span>" +
                            "<span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span>" +
                            "<span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span>" +
                            "<span class='service-title'>Team Rated:</span> " + teamrated +
                            "<span class='service-title'>Client Rated:</span> " + clientrated + "</td></tr>";
                            }
                            else {
                                htmltable = htmltable + "<tr 'class='ng-scope'>" +
                                                    "<td class='name ng-binding'>" +
                                                       "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
                                                       "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
                                                      "</td>"

                                                   + "<td class='position ng-binding' >" + vm.filteredTodos[i].servicename + "</td>" +
                                                   "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].General + "</td>" +
                                                   "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].Expert + "</td>" +
                                                   "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'>" + vm.filteredTodos[i].Authority + "</td>" +
                                                   "<td class='salary text-right ng-binding'>" +
                               "<span style='color:green;'>" + vm.filteredTodos[i].status + "</span>" +

                                                   "</td>" +
                                                    "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +



                                                   "</td>" +

                                                   " </tr>";
                                $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
                                htmltable = htmltable + "<tr style='display:none;'><td colspan='7'>" +
                            "<span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span>" +
                            "<span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span>" +
                            "<span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span>" +
                            "<span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span>" +
                            "<span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span>" +
                            "<span class='service-title'>Team Rated:</span> " + teamrated +
                            "<span class='service-title'>Client Rated:</span> " + clientrated + "</td></tr>";
                            }
                        }
                        if (vm.filteredTodos[i].Type == 'Editor' || vm.filteredTodos[i].Type == 'Custom' || vm.filteredTodos[i].Type == 'Social Media Manager') {
                            if (vm.filteredTodos[i].status != 'ACTIVE') {
                                htmltable = htmltable + "<tr 'class='ng-scope'>" +
                                                    "<td class='name ng-binding'>" +
                                                    "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
                                                     "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
                                                      "</td>"

                                                    + "<td class='position ng-binding'>" + vm.filteredTodos[i].servicename + "</td>" +
                                                    "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $" + vm.filteredTodos[i].Level1 + "</td>" +
                                                    "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $" + vm.filteredTodos[i].Level2 + "</td>" +

                                                    "<td class='salary text-right ng-binding'>" +

                                                        "<span style='color:red;' class='last-status'>" + vm.filteredTodos[i].status + "</span>" +
                                                    "</td>" +
                                                    "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +


                                                    "</td>" +

                                                    " </tr>";
                                $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
                                htmltable = htmltable + "<tr style='display:none;'><td colspan='6'>" +
                            "<span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span>" +
                            "<span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span>" +
                            "<span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span>" +
                            "<span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span>" +
                            "<span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span>" +
                            "<span class='service-title'>Team Rated:</span> " + teamrated +
                            "<span class='service-title'>Client Rated:</span> " + clientrated + "</td></tr>";
                            }
                            else {
                                htmltable = htmltable + "<tr 'class='ng-scope'>" +
                                                    "<td class='name ng-binding'>" +
                                                       "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
                                                       "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
                                                      "</td>"

                                                   + "<td class='position ng-binding' >" + vm.filteredTodos[i].servicename + "</td>" +
                                                   "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $" + vm.filteredTodos[i].Level1 + "</td>" +
                                                    "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $" + vm.filteredTodos[i].Level2 + "</td>" +
                                                   "<td class='salary text-right ng-binding'>" +
                               "<span style='color:green;'>" + vm.filteredTodos[i].status + "</span>" +

                                                   "</td>" +
                                                    "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +



                                                   "</td>" +

                                                   " </tr>";
                                $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
                                htmltable = htmltable + "<tr style='display:none;'><td colspan='6'>" +
                            "<span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span>" +
                            "<span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span>" +
                            "<span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span>" +
                            "<span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span>" +
                            "<span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span>" +
                            "<span class='service-title'>Team Rated:</span> " + teamrated +
                            "<span class='service-title'>Client Rated:</span> " + clientrated + "</td></tr>";
                            }
                        }

                        if (vm.filteredTodos[i].Type == 'Sales' || vm.filteredTodos[i].Type == 'Manager' || vm.filteredTodos[i].Type == 'Assistant') {
                            var hdnstyle = "";
                            var options = "<td><select><option selected='selected'>Hourly</option><option onclick='shhdll(this)'>Weekly</option></select></td>";

                            if (i != 0) {
                                hdnstyle = "style='display:none;'";
                                options = "<td><select><option selected='selected'>Weekly</option><option onclick='shhdff(this)'>Hourly</option></select></td>";
                            }

                            if (vm.filteredTodos[i].status != 'ACTIVE') {

                                htmltable = htmltable + "<tr " + hdnstyle + " 'class='ng-scope' id='tr-" + vm.filteredTodos[i]._id + "'>" +
                                                    "<td class='name ng-binding'>" +
                                                    "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
                                                     "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
                                                      "</td>"

                                                    + options +
                                                    "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $" + vm.filteredTodos[i].Level1 + "</td>" +
                                                    "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $" + vm.filteredTodos[i].Level2 + "</td>" +

                                                    "<td class='salary text-right ng-binding'>" +

                                                        "<span style='color:red;' class='last-status'>" + vm.filteredTodos[i].status + "</span>" +
                                                    "</td>" +
                                                    "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +


                                                    "</td>" +

                                                    " </tr>";
                                $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
                                htmltable = htmltable + "<tr style='display:none;'><td colspan='6'>" +
                            "<span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span>" +
                            "<span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span>" +
                            "<span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span>" +
                            "<span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span>" +
                            "<span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span>" +
                            "<span class='service-title'>Team Rated:</span> " + teamrated +
                            "<span class='service-title'>Client Rated:</span> " + clientrated + "</td></tr>";
                            }
                            else {
                                htmltable = htmltable + "<tr " + hdnstyle + " 'class='ng-scope' id='tr-" + vm.filteredTodos[i]._id + "'>" +
                                                    "<td class='name ng-binding'>" +
                                                       "<input type='checkbox' value=" + vm.filteredTodos[i]._id + " onclick='addids(this);'>" +
                                                       "<input type='hidden' id='" + vm.filteredTodos[i]._id + "'/>" +
                                                      "</td>"
                                + options +
                                                   "<td class='start-date text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $" + vm.filteredTodos[i].Level1 + "</td>" +
                                                    "<td class='age text-right ng-binding service-select' style='cursor:pointer;' id='sl-" + vm.filteredTodos[i]._id + "' onclick='selectthis(this);'> $" + vm.filteredTodos[i].Level2 + "</td>" +
                                                   "<td class='salary text-right ng-binding'>" +
                               "<span style='color:green;'>" + vm.filteredTodos[i].status + "</span>" +

                                                   "</td>" +
                                                    "<td><i class='icon-play-circle-outline s20' style='cursor:pointer;' onclick='opennexttr(this);'></i>" +



                                                   "</td>" +

                                                   " </tr>";
                                $scope.formattedDate = $filter('date')(vm.filteredTodos[i].datecreated, "M-dd-yyyy");
                                htmltable = htmltable + "<tr style='display:none;'><td colspan='6'>" +
                            "<span class='service-title'>Active:</span> <span class='payout-data'>" + $scope.formattedDate + " to Current</span>" +
                            "<span class='service-title'>Flags:</span> <span class='payout-data'>" + vm.filteredTodos[i].Flags + "</span>" +
                            "<span class='service-title'>Revisions:</span> <span class='payout-data'>" + vm.filteredTodos[i].Revisions + "</span>" +
                            "<span class='service-title'>Client Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].ClientApproved + "</span>" +
                            "<span class='service-title'>Auto Approved:</span> <span class='payout-data'>" + vm.filteredTodos[i].AutoApproved + "</span>" +
                            "<span class='service-title'>Team Rated:</span> " + teamrated +
                            "<span class='service-title'>Client Rated:</span> " + clientrated + "</td></tr>";
                            }
                        }
                    }
                    //alert(htmltable);
                    $('#tableservice').html(htmltable);
                }

                $scope.createuser = function () {

                    var ids = [];
                    var styles = [];
                    if (vm.filteredTodos == undefined) {
                        vm.filteredTodos = {};
                    }
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
                   || vm.jobsrole == 'Social Media Manager' || vm.jobsrole == 'User') {
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
                   || vm.jobsrole == 'Social Media Manager' || vm.jobsrole == 'Admin' || vm.jobsrole == 'User') {

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
                    $http.post(url + 'users/Admin/' + userid,
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
                                                          userdata = ({ 'id': userid, 'name': vm.firstname + " " + vm.lastname })
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
        }
    }
})();
