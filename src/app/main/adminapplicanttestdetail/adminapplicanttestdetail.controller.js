(function ($http, $scope, $location, $mdDialog, $sce) {
    'use strict';
    angular
        .module('app.adminapplicanttestdetail')
        .controller('adminapplicanttestdetailController', adminapplicanttestdetailController);

    /** @ngInject */
    function adminapplicanttestdetailController(SampleData, $http, $scope, Documents, $location, $mdDialog, $sce) {
        

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
            var questionall = [];
            var WIcount = 0;
            var passingpercentage = 0;
            var testid = $scope.$root.adminapplicanttestID;
            var currenttestposition = 0;
            $scope.disnext = true;
            
            $scope.disgrade = false;
            $scope.gradetext = "Grade";
            //var Alltests = [];
            $scope.currentattempt = 0;

            $scope.test = function () {
                if ($scope.disnext == true) {
                    $scope.stylecheck = "style='background-color: #ccc !important;'";
                }
                else {
                    $scope.stylecheck = "";
                }
            }
            if (testid != undefined) {


                $http.get(url + 'applicanttests/' + 'undefined').success(function (data, status) {

                    vm.filteredTodos = data.tests;
                    getsingledata(testid);
                }).error(function () {

                    console.log('error');
                });

                function getsingledata(id) {

                    for (var i = 0; i < vm.filteredTodos.length; i++) {
                        if (vm.filteredTodos[i]._id == id) {
                            $scope.username = vm.filteredTodos[i].username;
                            $scope.id = vm.filteredTodos[i]._id;
                            $scope.role = vm.filteredTodos[i].role;
                            $scope.email = vm.filteredTodos[i].email;
                            $scope.date = vm.filteredTodos[i].createddate;
                            $scope.time = vm.filteredTodos[i].attempttime;
                            $scope.locked = vm.filteredTodos[i].locked;
                            $scope.grade = vm.filteredTodos[i].grade;
                            $scope.attempts = vm.filteredTodos[i].attempts;
                            $scope.status = vm.filteredTodos[i].status;
                            $scope.questionsansresulttype = vm.filteredTodos[i].questions[0];
                            questionall = vm.filteredTodos[i].questions;
                            $scope.totalquestion = vm.filteredTodos[i].totalquestion;
                            $scope.attemptsquestion = vm.filteredTodos[i].attemptsquestion;
                            passingpercentage = vm.filteredTodos[i].passpercentage;

                            currenttestposition = i;
                            getpercantage($scope.currentattempt);

                            if (vm.filteredTodos[i].questions.length == 1)
                            {
                                $scope.disnext = true;
                            }
                        }
                    }
                }
                //next test details
                $scope.nexttest = function () {

                    $scope.disnext = true;
                    $scope.disgrade = false;
                    $scope.gradetext = "Grade";

                    currenttestposition++;
                    if (currenttestposition < vm.filteredTodos.length) {
                        $scope.username = vm.filteredTodos[currenttestposition].username;
                        $scope.id = vm.filteredTodos[currenttestposition]._id;
                        $scope.role = vm.filteredTodos[currenttestposition].role;
                        $scope.email = vm.filteredTodos[currenttestposition].email;
                        $scope.date = vm.filteredTodos[currenttestposition].createddate;
                        $scope.time = vm.filteredTodos[currenttestposition].attempttime;
                        $scope.locked = vm.filteredTodos[currenttestposition].locked;
                        $scope.grade = vm.filteredTodos[currenttestposition].grade;
                        $scope.attempts = vm.filteredTodos[currenttestposition].attempts;
                        $scope.questionsansresulttype = vm.filteredTodos[currenttestposition].questions[0];
                        questionall = vm.filteredTodos[currenttestposition].questions;
                        $scope.totalquestion = vm.filteredTodos[currenttestposition].totalquestion;
                        $scope.attemptsquestion = vm.filteredTodos[currenttestposition].attemptsquestion;
                        passingpercentage = vm.filteredTodos[currenttestposition].passpercentage;
                        currenttestposition = currenttestposition;

                        getpercantage($scope.currentattempt);
                    }
                    else {
                        $scope.disnext = true;
                        $scope.disgrade = true;
                    }
                }
                $scope.next = function () {

                    if (questionall.length - 1 != $scope.currentattempt) {
                        $scope.currentattempt++;
                        getpercantage($scope.currentattempt);
                    }
                }
                $scope.prev = function () {

                    if ($scope.currentattempt != 0) {
                        $scope.currentattempt--;
                        getpercantage($scope.currentattempt);
                    }
                }


                $scope.removeclass = function (index,status) {

                    //var result = $("#WI" + index);
                    //result.removeClass("border-red");
                    WIcount++;
                    getpercantage($scope.currentattempt, 'WI', status);

                }

                $scope.Grade = function (id) {
                    $scope.disnext = false;
                    var current = parseInt($scope.currentperctentage);
                    var passper = parseInt(passingpercentage);

                    if (current > passper || current == passper) {
                        $scope.status = 'Passed';
                        changestatusgrade('Passed', $scope.currentperctentage, id);

                    }
                    else {
                        $scope.status = 'Failed';
                        changestatusgrade('Failed', $scope.currentperctentage, id);
                    }
                }
                //update status method and set grade into the database
                function changestatusgrade(status, grade, testid) {
                    $http.post(url + 'applicanttests/update/' + testid,
                                          {

                                              "status": status,
                                              "grade": grade,

                                          }).success(function (data, status) {
                                              $scope.disnext = false;
                                              $scope.disgrade = true;
                                              $scope.gradetext = "Graded";
                                              //var result = $("#grade");
                                              //result.addClass("grade");
                                              //result.innerHTML = "Graded";
                                          }).error(function (data) {
                                              $mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .parent(angular.element(document.body))
                                        .title('Error!')
                                        .textContent("Not Possible now!")
                                        .ariaLabel('')
                                        .ok('Ok')
                                        .targetEvent()
                                    );

                                          });
                }

                $scope.cancel = function () {
                    $location.path('Applicants');
                }
                function getpercantage(arrayindex, type, status) {
                    if (type == 'WI' && type != undefined) {


                        if (questionall.length - 1 == arrayindex && questionall.length - 1 > arrayindex) {
                            $scope.prevfr = true;
                            $scope.nextfr = false;
                        }
                        else if (arrayindex < 0) {
                            
                        }
                        else {

                            //all questions


                            var correctans = 0;
                            var details = questionall[arrayindex];
                            for (var i = 0; i < details.length; i++) {
                                var chkstr = "";
                                if (details[i].type == 'TF') {
                                    chkstr = details[i].canswer.toString();
                                    chkstr = JSON.parse(chkstr);
                                }
                                else {
                                    chkstr = details[i].canswer.toString();
                                }
                                if (details[i].type != 'WI') {
                                    if (details[i].value == chkstr) {
                                        correctans++;
                                    }
                                }
                                

                            }
                            $scope.questionsansresulttype = details;
                            correctans = correctans + WIcount;
                            if (status == 'F') {
                                correctans = correctans - 1;
                            }
                            
                            var percentageget = (correctans / $scope.totalquestion) * 100;
                            $scope.currentperctentage = percentageget.toString();
                            //total questions in test
                            var passper = parseInt(passingpercentage);
                            if ($scope.currentperctentage > passper || $scope.currentperctentage > passper)
                            { $scope.status = 'Passed'; }
                            else { $scope.status = 'Failed'; }

                        }
                    }
                    else {
                        if (questionall.length - 1 == arrayindex && questionall.length - 1 > arrayindex) {
                            $scope.prevfr = true;
                            $scope.nextfr = false;
                        }
                        else if (arrayindex < 0) {

                        }
                        else {

                            //all questions
                            var correctans = 0;
                            var details = questionall[arrayindex];
                            for (var i = 0; i < details.length; i++) {
                                var chkstr = "";
                                if (details[i].type == 'TF')
                                {
                                    chkstr = details[i].canswer.toString();
                                    chkstr = JSON.parse(chkstr);
                                }
                                else
                                {
                                    chkstr = details[i].canswer.toString();
                                }
                                if (details[i].value == chkstr) {
                                    correctans++;
                                }
                            }
                            $scope.questionsansresulttype = details;
                            var percentageget = (correctans / $scope.totalquestion) * 100;
                            //total questions in test
                            $scope.currentperctentage = percentageget.toString();
                        }
                    }
                }
            }
            else {
                $location.path('Applicants');
            }
        }
    }
})();
