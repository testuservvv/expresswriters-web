(function ($http, $scope, $location, $mdDialog, $sce, $mdToast) {
    'use strict';
    angular
        .module('app.createtest')
        .controller('createtestController', createtestController);

    /** @ngInject */
    function createtestController(SampleData, $http, $scope, Documents, $location, $mdDialog, $sce, $mdToast) {
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
            $scope.test = true;
            $scope.quest = false;
            vm.offline = false;

            var numberofquestions = 0;
            $scope.choices = [];
            $scope.mcclass = "active";
            $scope.anslist = [];
            //$scope.MC = true;
            $scope.checked = "MC";
            $scope.lkukvalue = "No";
            vm.testtitle = "";
            $scope.icon = "icon icon-lock-unlocked-outline s40";
            //store question in array
            $scope.questionsansresulttype = [];
            var count = 1;
            var TestId = "";

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



            //MC click
            $scope.MCchange = function () {
                vm.question = "";
                $scope.mcclass = "active";
                $scope.tfclass = "";
                $scope.wiclass = "";
                $scope.checked = "MC";

            }
            $scope.TFchange = function () {
                vm.question = "";
                $scope.mcclass = "";
                $scope.tfclass = "active";
                $scope.wiclass = "";
                $scope.checked = "TF";


            }
            $scope.WIchange = function () {
                vm.question = "";
                $scope.mcclass = "";
                $scope.tfclass = "";
                $scope.wiclass = "active";
                $scope.checked = "WI";

            }
            $scope.savequestion = function () {

                if ($scope.checked == "MC") {

                    if (vm.question != "" && vm.question != undefined) {
                        if ($scope.anslist.length == 0 || $scope.anslist.length == 1 || $scope.anslist.length > 4) {
                            $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Error!')
                                     .textContent('Please add options!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                        }
                        else if (vm.selectedanswer == undefined || vm.selectedanswer == "") {
                            $mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .parent(angular.element(document.body))
                                        .title('Error!')
                                        .textContent('Please select an option!')
                                        .ariaLabel('')
                                        .ok('Ok')
                                        .targetEvent()
                                    );
                        }
                        else {
                            $scope.questionsansresulttype.push(
                            {
                                id: count,
                                Qtitle: vm.question,
                                answer: vm.selectedanswer,
                                type: "MC",
                                options: [

                                    {
                                        value: $scope.anslist[0]
                                    },

                                    {
                                        value: $scope.anslist[1]
                                    },

                                    {
                                        value: $scope.anslist[2]
                                    },

                                    {
                                        value: $scope.anslist[3]
                                    }
                                ]
                            });
                            vm.selectedanswer = "";
                            vm.question = "";
                            $scope.anslist = [];
                            $scope.MC = false;
                            $scope.TF = false;
                            $scope.WI = false;
                            count++;
                            var pinTo = $scope.getToastPosition();

                            $mdToast.show(
                              $mdToast.simple()
                                .textContent('Question Saved successfully!')
                                .position(pinTo)
                                .hideDelay(3000)
                            );
                        }
                    }
                    else {
                        $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Error!')
                                     .textContent('Please add Question!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                    }
                }
                else if ($scope.checked == "TF") {
                    $scope.MC = false;
                    $scope.TF = false;
                    $scope.WI = false;
                    if (vm.question != "" && vm.question != undefined) {
                        $scope.questionsansresulttype.push({ "id": count, "Qtitle": vm.question, "answer": vm.offline, "type": "TF" });
                        vm.question = "";
                        vm.offline = false;
                        $scope.MC = false;
                        $scope.TF = false;
                        $scope.WI = false;
                        count++;
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Question Saved successfully!')
                            .position(pinTo)
                            .hideDelay(3000)
                        );
                    }
                    else {
                        $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Error!')
                                     .textContent('Please add Question first!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                    }
                }
                else {
                    $scope.MC = false;
                    $scope.TF = false;
                    $scope.WI = false;
                    if (vm.question != "" && vm.question != undefined && vm.answer != undefined && vm.answer != "") {
                        $scope.questionsansresulttype.push({ "id": count, "Qtitle": vm.question, "answer": vm.answer, "type": "WI" });
                        vm.question = "";
                        vm.answer = "";
                        $scope.MC = false;
                        $scope.TF = false;
                        $scope.WI = false;
                        count++;
                        var pinTo = $scope.getToastPosition();

                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Question Saved successfully!')
                            .position(pinTo)
                            .hideDelay(3000)
                        );
                    }
                    else {
                        $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Error!')
                                     .textContent('Please add answer first!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                    }
                }
            }

            $scope.savequestionchange = function () {

                if ($scope.checked == "MC") {
                    $scope.MC = true;
                    $scope.TF = false;
                    $scope.WI = false;

                    vm.question = "";
                    vm.offline = false;
                    $scope.anslist = [];
                    vm.answer = "";

                }
                else if ($scope.checked == "TF") {
                    $scope.MC = false;
                    $scope.TF = true;
                    $scope.WI = false;
                    vm.question = "";
                    vm.offline = false;
                    $scope.anslist = [];
                    vm.answer = "";

                }
                else {
                    $scope.MC = false;
                    $scope.TF = false;
                    $scope.WI = true;
                    vm.question = "";
                    vm.offline = false;
                    $scope.anslist = [];
                    vm.answer = "";

                }
            }
            //Close window()
            $scope.close = function () {

                $scope.MC = false;
                $scope.TF = false;
                $scope.WI = false;
                vm.question = "";
                vm.offline = false;
                $scope.anslist = [];
                vm.answer = "";
            }
            //Save True false question
            function saveTF() {
                $http.post(url + 'questiontruefalse',
                                           {
                                               "questiontitle": vm.question,
                                               "testid": TestId,
                                               "answer": vm.offline
                                           }).success(function (data, status) {

                                               numberofquestions = numberofquestions + 1;
                                               vm.question = "";
                                               $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Success!')
                                     .textContent('Question saved successfully!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );

                                           }).error(function (data) {
                                               $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Error!')
                                     .textContent('error!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                                           });
            }
            //Save WI question
            function saveWI() {

                $http.post(url + 'questionWI',
                                           {
                                               "questiontitle": vm.question,
                                               "testid": TestId,
                                               "answer": vm.answer
                                           }).success(function (data, status) {

                                               numberofquestions = numberofquestions + 1;
                                               vm.question = "";
                                               vm.answer = "";
                                               $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Success!')
                                     .textContent('Question saved successfully!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );

                                           }).error(function (data) {
                                               $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Error!')
                                     .textContent('error!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                                           });
            }
            //Save WI question
            function saveMC() {

                $http.post(url + 'questionWC',
                                           {
                                               "questiontitle": vm.question,
                                               "testid": TestId,
                                               "question1": $scope.anslist[0],
                                               "question2": $scope.anslist[1],
                                               "question3": $scope.anslist[2],
                                               "question4": $scope.anslist[3],
                                               "answer": vm.selectedanswer
                                           }).success(function (data, status) {

                                               if (data.status == "Success") {
                                                   numberofquestions = numberofquestions + 1;
                                                   vm.question = "";
                                                   vm.selectedanswer = "";
                                                   vm.WCanswer = "";
                                                   $scope.anslist = [];
                                                   $mdDialog.show(
                                       $mdDialog.alert()
                                         .parent(angular.element(document.querySelector('#popupContainer')))
                                         .clickOutsideToClose(true)
                                         .parent(angular.element(document.body))
                                         .title('Success!')
                                         .textContent('Question saved successfully!')
                                         .ariaLabel('')
                                         .ok('Ok')
                                         .targetEvent()
                                     );
                                               }
                                               else {
                                                   $mdDialog.show(
                                                                                        $mdDialog.alert()
                                                                                          .parent(angular.element(document.querySelector('#popupContainer')))
                                                                                          .clickOutsideToClose(true)
                                                                                          .parent(angular.element(document.body))
                                                                                          .title('Error!')
                                                                                          .textContent(data.message + " or check the answer is selected")
                                                                                          .ariaLabel('')
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
                                     .title('Error!')
                                     .textContent('error!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                                           });
            }
            //To add the answer into the radio button list
            $scope.addtolist = function () {

                if (vm.WCanswer != "" || vm.WCanswer != undefined || vm.WCanswer != " ") {
                    if ($scope.anslist.length == 4) {
                        vm.WCanswer = "";
                    }
                    else {
                        if ($scope.anslist.length == 0) {
                            $scope.anslist.push(vm.WCanswer);
                            vm.WCanswer = "";
                        }
                        else {
                            var rep = false;
                            for (var i = 0; i < $scope.anslist.length; i++) {
                                if ($scope.anslist[i] == vm.WCanswer) {
                                    rep = true;
                                }
                            }
                            if (rep == false) {
                                $scope.anslist.push(vm.WCanswer);
                                vm.WCanswer = "";
                            }
                            else {
                                $mdDialog.show(
                                       $mdDialog.alert()
                                         .parent(angular.element(document.querySelector('#popupContainer')))
                                         .clickOutsideToClose(true)
                                         .parent(angular.element(document.body))
                                         .title('Error!')
                                         .textContent('Option already exist!')
                                         .ariaLabel('')
                                         .ok('Ok')
                                         .targetEvent()
                                     );
                            }
                        }

                    }
                }
            }
            //To lock unlock the test
            $scope.lockunlock = function () {
                if ($scope.lkukvalue == "No") {
                    $scope.icon = "icon icon-lock-outline s40";

                    $scope.lkukvalue = "Yes";
                }
                else {
                    $scope.icon = "icon icon-lock-unlocked-outline s40";

                    $scope.lkukvalue = "No";
                }

            }
            //Add new test after added the questions
            $scope.publishtest = function () {


                var contentType = [];
                if ($scope.WebPages != undefined && $scope.WebPages != "") {
                    var typeexpert = [];
                    var gen = false;
                    var exp = false;
                    var aut = false;
                    var oth = false;
                    if ($scope.WebPagesGENERAL != undefined && $scope.WebPagesGENERAL != "") {
                        gen = true;
                    }
                    if ($scope.WebPagesEXPERT != undefined && $scope.WebPagesEXPERT != "") {
                        exp = true;
                    }
                    if ($scope.WebPagesAUTHORITY != undefined && $scope.WebPagesAUTHORITY != "") {
                        aut = true;
                    }
                    if ($scope.WebPagesOTHER != undefined && $scope.WebPagesOTHER != "") {
                        oth = true;
                    }
                    contentType.push({ "WebPages": true, "GENERAL": gen, "EXPERT": exp, "AUTHORITY": aut, "OTHER": oth });
                }
                else {
                    contentType.push({ "WebPages": false, "GENERAL": false, "EXPERT": false, "AUTHORITY": false, "OTHER": false });
                }
                if ($scope.Blogs != undefined && $scope.Blogs != "") {
                    var typeexpert = [];
                    var gen = false;
                    var exp = false;
                    var aut = false;
                    var oth = false;
                    if ($scope.BlogsGENERAL != undefined && $scope.BlogsGENERAL != "") {
                        gen = true;
                    }
                    if ($scope.BlogsEXPERT != undefined && $scope.BlogsEXPERT != "") {
                        exp = true;
                    }
                    if ($scope.BlogsAUTHORITY != undefined && $scope.BlogsAUTHORITY != "") {
                        aut = true;
                    }
                    if ($scope.BlogsOTHER != undefined && $scope.BlogsOTHER != "") {
                        oth = true;
                    }
                    contentType.push({ "Blogs": true, "GENERAL": gen, "EXPERT": exp, "AUTHORITY": aut, "OTHER": oth });
                }
                else {
                    contentType.push({ "Blogs": false, "GENERAL": false, "EXPERT": false, "AUTHORITY": false, "OTHER": false });
                }
                if ($scope.Articles != undefined && $scope.Articles != "") {
                    var typeexpert = [];
                    var gen = false;
                    var exp = false;
                    var aut = false;
                    var oth = false;
                    if ($scope.ArticlesGENERAL != undefined && $scope.ArticlesGENERAL != "") {
                        gen = true;
                    }
                    if ($scope.ArticlesEXPERT != undefined && $scope.ArticlesEXPERT != "") {
                        exp = true;
                    }
                    if ($scope.ArticlesAUTHORITY != undefined && $scope.ArticlesAUTHORITY != "") {
                        aut = true;
                    }
                    if ($scope.ArticlesOTHER != undefined && $scope.ArticlesOTHER != "") {
                        oth = true;
                    }
                    contentType.push({ "Articles": true, "GENERAL": gen, "EXPERT": exp, "AUTHORITY": aut, "OTHER": oth });
                }
                else {
                    contentType.push({ "Articles": false, "GENERAL": false, "EXPERT": false, "AUTHORITY": false, "OTHER": false });
                }
                if ($scope.LandingPages != undefined && $scope.LandingPages != "") {
                    var typeexpert = [];
                    var gen = false;
                    var exp = false;
                    var aut = false;
                    var oth = false;
                    if ($scope.LandingPagesGENERAL != undefined && $scope.LandingPagesGENERAL != "") {
                        gen = true;
                    }
                    if ($scope.LandingPagesEXPERT != undefined && $scope.LandingPagesEXPERT != "") {
                        exp = true;
                    }
                    if ($scope.LandingPagesAUTHORITY != undefined && $scope.LandingPagesAUTHORITY != "") {
                        aut = true;
                    }
                    if ($scope.LandingPagesOTHER != undefined && $scope.LandingPagesOTHER != "") {
                        oth = true;
                    }
                    contentType.push({ "LandingPages": true, "GENERAL": gen, "EXPERT": exp, "AUTHORITY": aut, "OTHER": oth });
                }
                else {
                    contentType.push({ "LandingPages": false, "GENERAL": false, "EXPERT": false, "AUTHORITY": false, "OTHER": false });
                }

                var questionsansresulttype = $scope.questionsansresulttype;
                $http.post(url + 'tests',
                                           {
                                               "testname": vm.testtitle,
                                               "status": "Open",
                                               "Questions": $scope.questionsansresulttype.length,
                                               "Time": vm.Timer,
                                               "Attempts": vm.Attemps,
                                               "Randomize": "Yes",
                                               "Locked": $scope.lkukvalue,
                                               "Applicants": "0",
                                               "Passrate": "0",
                                               "role": vm.role,
                                               "contentType": contentType,
                                               "passpercentage": $scope.passpercentage,

                                           }).success(function (data, status) {

                                               TestId = data.results._id;
                                               $http.post(url + 'Questions/' + TestId,
                                           {
                                               "questionsansresulttype": questionsansresulttype
                                           }).success(function (data, status) {

                                               $location.path('Tests');


                                           }).error(function (data) {
                                               $mdDialog.show(
                                   $mdDialog.alert()
                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                     .clickOutsideToClose(true)
                                     .parent(angular.element(document.body))
                                     .title('Error!')
                                     .textContent('error!')
                                     .ariaLabel('')
                                     .ok('Ok')
                                     .targetEvent()
                                 );
                                           });
                                           }).error(function (data) {



                                           });
            }
            //remove from list
            $scope.remove = function (testid) {


                var index = $scope.questionsansresulttype.indexOf(testid);
                $scope.questionsansresulttype.splice(index, 1);
                var pinTo = $scope.getToastPosition();

                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Question removed successfully!')
                    .position(pinTo)
                    .hideDelay(3000)
                );

            }
            $scope.cancel = function () {
                $location.path('Tests');
            }
            //Get jobsrole
            $http.get(url + 'jobsrole').success(function (data, status) {

                vm.jobsrole = data.jobsrole;

            }).error(function () {

                console.log('error');
            });
        }
    }
})();
