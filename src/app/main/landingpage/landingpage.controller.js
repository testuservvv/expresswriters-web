(function ($http, $scope, $location, $timeout, $mdDialog, $mdToast) {
    'use strict';
    angular
        .module('app.landingpage')
        .controller('landingpageController', landingpageController);

    /** @ngInject */
    function landingpageController(SampleData, $http, $scope, Documents, $location, $timeout, $mdDialog, $mdToast) {

        var vm = this;


        var url = window.localStorage['APIURL'];
        var testid = $scope.$root.applyid;
        var jobid = $scope.$root.applyjobid;
        var actualtime = 0;
        var actualsec = 59;
        var passingpercentage = 0;
        var locked = "";
        var screenout = 0;
        var submitedtest = true;
        var MC = false;
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };
        var alldata = [];
        $scope.questionsansresulttype = [];
        $scope.toastPosition = angular.extend({}, last);

        $scope.getToastPosition = function () {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
                .filter(function (pos) {
                    return $scope.toastPosition[pos];
                })
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

        $scope.givenans = [];
        if (testid != undefined && testid != "") {


            gettestalldata();


            function gettestalldata() {

                $http.get(url + 'tests/id/' + testid).success(function (data, status) {
                    if (data.status == "Success") {

                        $scope.role = data.tests.role;
                        $scope.date = new Date(data.tests.createddate);
                        $scope.locked = data.tests.Locked;
                        $scope.maxtime = data.tests.Time;
                        $scope.Attempts = data.tests.Attempts;

                        alldata = data.tests.quesans;
                        $scope.questionsansresulttype.push(alldata[0]);
                        vm.preque = true;
                        vm.nextque = false;
                        $scope.currentindex = 0;
                        $scope.totalqueindex = parseInt(alldata.length);
                        passingpercentage = data.tests.passpercentage;
                        actualtime = $scope.maxtime;
                        locked = data.tests.Locked;
                    }
                    else {
                        $location.path('Careers');
                    }
                }).error(function () {

                    console.log('error');
                });

            }

            $scope.landing = true;
            $scope.test = false;
            $scope.apply = function () {

                $scope.landing = false;
                $scope.test = true;
                $scope.sec = 59;
                $scope.min = $scope.maxtime;
            }

            vm.next = function () {
                $scope.currentindex = $scope.currentindex + 1;
                if ($scope.currentindex == $scope.totalqueindex) {
                    $scope.currentindex = $scope.currentindex - 1;
                    vm.preque = false;
                    vm.nextque = true;
                }
                else {
                    vm.preque = false;
                    vm.nextque = false;
                    $scope.questionsansresulttype = [];
                    $scope.questionsansresulttype.push(alldata[$scope.currentindex]);
                }

            }
            vm.prev = function () {
                $scope.currentindex = $scope.currentindex - 1;
                if ($scope.currentindex < 0) {
                    $scope.currentindex = $scope.currentindex + 1;
                    vm.preque = true;
                    vm.nextque = false;
                }
                else {

                    vm.preque = false;
                    vm.nextque = false;
                    $scope.questionsansresulttype = [];
                    $scope.questionsansresulttype.push(alldata[$scope.currentindex]);
                }

            }
            //MC selecttion
            $scope.MCclick = function (testid, value, type, title, correctanswer) {

                var match = 0;
                var indexinlist = 0;

                if ($scope.givenans.length < 1) {
                    $scope.givenans.push({
                        "id": testid,
                        "value": value,
                        "type": type,
                        "title": title,
                        "canswer": correctanswer
                    });
                    var pinTo = $scope.getToastPosition();

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Answer Saved successfully!')
                            .position(pinTo)
                            .hideDelay(3000)
                    );
                }
                else {
                    for (var i = 0; i < $scope.givenans.length; i++) {
                        if ($scope.givenans[i].id == testid) {
                            match = 1;
                            indexinlist = i;
                        }
                    }
                    if (match == 0) {
                        $scope.givenans.push({
                            "id": testid,
                            "value": value,
                            "type": type,
                            "title": title,
                            "canswer": correctanswer
                        });
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Answer Saved successfully!')
                                .position(pinTo)
                                .hideDelay(3000)
                        );
                    }
                    else {
                        $scope.givenans[indexinlist] = ({
                            "id": testid,
                            "value": value,
                            "type": type,
                            "title": title,
                            "canswer": correctanswer
                        });
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Answer Saved successfully!')
                                .position(pinTo)
                                .hideDelay(3000)
                        );
                    }
                }
            }

            //TF Selection
            $scope.ans = function (testid, value, type, title, correctanswer, index) {

                //var truefalse = truefalse + index;
                if (correctanswer == 'true') {

                }
                if (type == 'TF') {

                    // $(ev).addclass('active');
                }
                else {

                    MC = true;
                }
                var match = 0;
                var indexinlist = 0;

                if ($scope.givenans.length < 1) {
                    $scope.givenans.push({
                        "id": testid,
                        "value": value,
                        "type": type,
                        "title": title,
                        "canswer": correctanswer
                    });
                    var pinTo = $scope.getToastPosition();

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Answer Saved successfully!')
                            .position(pinTo)
                            .hideDelay(3000)
                    );
                }
                else {
                    for (var i = 0; i < $scope.givenans.length; i++) {
                        if ($scope.givenans[i].id == testid) {
                            match = 1;
                            indexinlist = i;
                        }
                    }
                    if (match == 0) {
                        $scope.givenans.push({
                            "id": testid,
                            "value": value,
                            "type": type,
                            "title": title,
                            "canswer": correctanswer
                        });
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Answer Saved successfully!')
                                .position(pinTo)
                                .hideDelay(3000)
                        );
                    }
                    else {
                        $scope.givenans[indexinlist] = ({
                            "id": testid,
                            "value": value,
                            "type": type,
                            "title": title,
                            "canswer": correctanswer
                        });
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Answer Saved successfully!')
                                .position(pinTo)
                                .hideDelay(3000)
                        );
                    }
                }
            }


            $scope.onTimeout = function () {
                if ($scope.sec != 0) {
                    $scope.sec--;
                    var valueInt = parseInt($scope.sec);
                    if (!isNaN($scope.sec) && $scope.sec >= 0 && $scope.sec < 10)
                        $scope.sec = "0" + $scope.sec;
                    mytimeout = $timeout($scope.onTimeout, 1000);
                }
                else {
                    $scope.min--;
                    if ($scope.min > 0) {
                        $scope.sec = 59;
                        mytimeout = $timeout($scope.onTimeout, 1000);
                    }
                    else {


                        actualtime = actualtime - $scope.min;
                        actualsec = actualsec - $scope.sec;
                        $scope.min = 0;
                        $scope.sec = 0;
                        $timeout.cancel(mytimeout);
                        if (MC == true) {
                            savetest();
                        }
                        else {
                            getpercantage($scope.givenans);
                        }
                    }
                }
            }
            var mytimeout = $timeout($scope.onTimeout, 1000);

            //submit test click
            $scope.submittest = function () {
                submitedtest = false;
                actualtime = actualtime - $scope.min;
                actualsec = actualsec - $scope.sec;
                $timeout.cancel(mytimeout);
                console.log("MC:", MC);
                debugger
                if (MC == true) {
                    savetest();
                }
                else {
                    getpercantage($scope.givenans);
                }

            }
            //save the test into database
            function savetest() {
                console.log("grade:", $scope.grade);
                debugger;
                if ($scope.grade == undefined) {
                    var status = 'Review';
                }
                else {
                    var inval = parseInt(passingpercentage);
                    if ($scope.grade > inval) {
                        var status = 'Passed';
                    }

                    else {
                        var status = 'Failed';
                    }
                }
                var attempttime = "";
                attempttime = actualtime + "." + actualsec;

                var userid = window.localStorage['userid'];

                var username = window.localStorage['storageName'];
                var email = window.localStorage['email'];
                var ip = document.getElementById('ipAddressID').value;
                var country = document.getElementById('country').value;
                $http.post(url + 'applicanttests/' + $scope.Attempts,
                    {
                        "userid": userid,
                        "testid": testid,
                        "jobid": jobid,
                        "questions": $scope.givenans,
                        "totalquestion": $scope.totalqueindex,
                        "attemptsquestion": $scope.givenans.length,
                        "status": status,
                        "ipaddress": ip,
                        "username": username,
                        "attempttime": attempttime,
                        "email": email,
                        "locked": locked,
                        "role": $scope.role,
                        "country": country,
                        "grade": $scope.grade,
                        "passpercentage": passingpercentage,
                    }).success(function (data, status) {
                    if (data.status == "Success") {

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Test is completed!')
                                .textContent("Your test is completed. your attempt " + $scope.givenans.length + " out of " + $scope.totalqueindex)
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                        );
                        $location.path('Careers');
                    }
                    else if (data.status == "MaxAttampts") {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Test not completed!')
                                .textContent(data.message)
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                        );
                        $location.path('Careers');
                    }
                    else {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .parent(angular.element(document.body))
                                .title('Error!')
                                .textContent("Test is not saved successfully!")
                                .ariaLabel('')
                                .ok('Ok')
                                .targetEvent()
                        );
                    }
                }).error(function (data) {

                    console.log(data);

                });
            }

            //Cancel
            $scope.cancel = function () {
                submitedtest = false;
                $location.path('Careers');
            }
            function getpercantage(arrayindex) {
                if (arrayindex < 0) {
                    savetest();
                }
                else {

                    //all questions

                    var correctans = 0;
                    for (var i = 0; i < arrayindex.length; i++) {
                        var chkstr = arrayindex[i].canswer.toString();

                        if (arrayindex[i].value.toString() == chkstr) {
                            correctans++;
                        }

                    }
                    var percentageget = (correctans / alldata.length) * 100;
                    $scope.grade = percentageget;
                    savetest();
                }


            }

            //When user move mouse from out of the div
            //  $scope.hoverOut = function () {
            angular.element(document.body).parent().mouseleave(function () {
                var path = '/Jobs/';
                if ($location.path().slice(0, path.length) == path) {
                    if (submitedtest == true) {
                        screenout++;
                        if (screenout > 1) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .parent(angular.element(document.body))
                                    .title('Message!')
                                    .textContent("We are canceled your test now!")
                                    .ariaLabel('Error')
                                    .ok('Ok')
                                    .targetEvent()
                            );
                            $location.path('Careers');
                        }
                        else {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .parent(angular.element(document.body))
                                    .title('Warning!')
                                    .textContent("Please don't go out of box. Next time the moment you go out of the box the test will be automatically canceled!")
                                    .ariaLabel('Error')
                                    .ok('Ok')
                                    .targetEvent()
                            );
                        }
                    }
                }

            });
            // }

        }
        else {
            $location.path('Careers');
        }
    }
})();
