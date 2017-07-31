
(function ($http, $scope, $location, $mdDialog, $mdToast) {
    'use strict';
    angular
        .module('app.edittest')
        .controller('edittestController', edittestController);

    /** @ngInject */
    function edittestController(SampleData, $http, $scope, Documents, $location, $mdDialog, $mdToast) {
        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {
            var vm = this;
            vm.questionsdata = null;
            $scope.mcclass = "active";
            $scope.MC = false;
            $scope.TF = false;
            $scope.WI = false;
            vm.offline = false;

            $scope.showaddquestion = false;
            $scope.anslist = [];
            $scope.questionsansresulttype = [];
            $scope.buttontext = "Add Question";
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
            var id = $scope.$root.admintestid;
            if (id == undefined) {
                $location.path('Tests');
            }
            else {
                var url = window.localStorage['APIURL'];
                var statusget = "";

                var numberofquestion = 0;
                var testdata = null;
                //Get jobsrole
                $http.get(url + 'jobsrole').success(function (data, status) {

                    vm.jobsrole = data.jobsrole;
                    gettestalldata();
                }).error(function () {

                    console.log('error');
                });

                function gettestalldata() {

                    $http.get(url + 'tests/id/' + id).success(function (data, status) {

                        console.log(data);

                        testdata = data.tests;
                        vm.testtitle = data.tests.testname;
                        vm.testselected = data.tests.role;
                        vm.Timer = data.tests.Time;
                        vm.Attemps = data.tests.Attempts;
                        numberofquestion = data.tests.Questions;
                        vm.questionsansresulttype = data.tests.quesans;
                        $scope.showaddquestion = false;
                        $scope.buttontext = "Add Question";
                        $scope.passpercentage = data.tests.passpercentage;

                        if (data.tests.Locked == "Yes") {
                            $scope.icon = "icon icon-lock-outline s40";
                            $scope.lkukvalue = "Yes";
                        }
                        else {
                            $scope.icon = "icon icon-lock-unlocked-outline s40";
                            $scope.lkukvalue = "No";
                        }
                        $scope.contenttype = data.tests.contentType;
                        vm.lengthque = data.tests.quesans.length;

                    }).error(function () {

                        console.log('error');
                    });

                }
                //datatable data
                vm.widget7 = {

                    title: "Test Questions",
                    table: vm.questionsdata,
                    dtOptions: {
                        dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                        pagingType: 'simple',
                        paging: false,
                        pageLength: 10,
                        lengthMenu: [10, 20, 50, 100],
                        autoWidth: false,
                        responsive: true,

                        columnDefs: [
                            {
                                width: '50%',
                                targets: [0, 1, 2, 3]
                            }
                        ],
                        columns: [

                            {

                            },
                            {

                            },
                            {}, {},

                        ]
                    }
                };

                $scope.removequestion = function (questionid, type) {
                    var confirm = $mdDialog.confirm()
          .title('Would you like to delete question?')
          .textContent('Would you like to delete question?')
          .ariaLabel('Lucky day')
          .targetEvent()
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
          .ok('Yes')
          .cancel('No');

                    $mdDialog.show(confirm).then(function () {
                        if (type == "TF") {
                            updatequestion(questionid, "question/update/");
                        }
                        else if (type == "WI") {
                            updatequestion(questionid, "question/update/");
                        }
                        else {
                            updatequestion(questionid, "question/update/");
                        }
                    }, function () {
                        //$scope.status = 'You decided to keep your debt.';
                    });
                    
                }
                function updatequestion(qid, api) {

                    $http.post(url + api + qid,
                                          {
                                              "testid": ""
                                          }).success(function (data, status) {

                                              if (data.status == 'Success') {
                                                  var pinTo = $scope.getToastPosition();

                                                  $mdToast.show(
                                                    $mdToast.simple()
                                                      .textContent('Question Removed')
                                                      .position(pinTo)
                                                      .hideDelay(3000));
                                                  gettestalldata();


                                              }
                                              else {
                                                  var pinTo = $scope.getToastPosition();

                                                  $mdToast.show(
                                                    $mdToast.simple()
                                                      .textContent('Question Not Removed!')
                                                      .position(pinTo)
                                                      .hideDelay(3000));
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

                //Cancel the edit
                $scope.cancel = function () {
                    $location.path('Tests');
                }
                //Update the test
                $scope.UpdateTest = function () {
                    var contentType = [];
                    //if(document.getElementById('WebPagesmain').checked){
                    //alert($('#WebPagesmain').attr('aria-checked'));
                    if ($('#WebPagesmain').attr('aria-checked') == 'true') {
                        var typeexpert = [];
                        var gen = false;
                        var exp = false;
                        var aut = false;
                        var oth = false;
                        if ($('#webGENERAL').attr('aria-checked') == 'true') {
                            gen = true;
                        }
                        if ($('#webEXPERT').attr('aria-checked') == 'true') {
                            exp = true;
                        }
                        if ($('#webAUTHORITY').attr('aria-checked') == 'true') {
                            aut = true;
                        }
                        if ($('#webOTHER').attr('aria-checked') == 'true') {
                            oth = true;
                        }
                        contentType.push({ "WebPages": true, "GENERAL": gen, "EXPERT": exp, "AUTHORITY": aut, "OTHER": oth });
                    }
                    else {
                        contentType.push({ "WebPages": false, "GENERAL": false, "EXPERT": false, "AUTHORITY": false, "OTHER": false });
                    }

                    if ($('#Blogsmain').attr('aria-checked') == 'true') {
                        var typeexpert = [];
                        var gen = false;
                        var exp = false;
                        var aut = false;
                        var oth = false;
                        if ($('#BlogsGENERAL').attr('aria-checked') == 'true') {
                            gen = true;
                        }
                        if ($('#BlogsEXPERT').attr('aria-checked') == 'true') {
                            exp = true;
                        }
                        if ($('#BlogsAUTHORITY').attr('aria-checked') == 'true') {
                            aut = true;
                        }
                        if ($('#BlogsOTHER').attr('aria-checked') == 'true') {
                            oth = true;
                        }
                        contentType.push({ "Blogs": true, "GENERAL": gen, "EXPERT": exp, "AUTHORITY": aut, "OTHER": oth });
                    }
                    else {
                        contentType.push({ "Blogs": false, "GENERAL": false, "EXPERT": false, "AUTHORITY": false, "OTHER": false });
                    }

                    if ($('#Articlesmain').attr('aria-checked') == 'true') {
                        var typeexpert = [];
                        var gen = false;
                        var exp = false;
                        var aut = false;
                        var oth = false;
                        if ($('#ArticlesGENERAL').attr('aria-checked') == 'true') {
                            gen = true;
                        }
                        if ($('#ArticlesEXPERT').attr('aria-checked') == 'true') {
                            exp = true;
                        }
                        if ($('#ArticlesAUTHORITY').attr('aria-checked') == 'true') {
                            aut = true;
                        }
                        if ($('#ArticlesOTHER').attr('aria-checked') == 'true') {
                            oth = true;
                        }
                        contentType.push({ "Articles": true, "GENERAL": gen, "EXPERT": exp, "AUTHORITY": aut, "OTHER": oth });
                    }
                    else {
                        contentType.push({ "Articles": false, "GENERAL": false, "EXPERT": false, "AUTHORITY": false, "OTHER": false });
                    }

                    if ($('#LandingPagesmain').attr('aria-checked') == 'true') {
                        var typeexpert = [];
                        var gen = false;
                        var exp = false;
                        var aut = false;
                        var oth = false;
                        if ($('#LandingPagesGENERAL').attr('aria-checked') == 'true') {
                            gen = true;
                        }
                        if ($('#LandingPagesEXPERT').attr('aria-checked') == 'true') {
                            exp = true;
                        }
                        if ($('#LandingPagesAUTHORITY').attr('aria-checked') == 'true') {
                            aut = true;
                        }
                        if ($('#LandingPagesOTHER').attr('aria-checked') == 'true') {
                            oth = true;
                        }
                        contentType.push({ "LandingPages": true, "GENERAL": gen, "EXPERT": exp, "AUTHORITY": aut, "OTHER": oth });
                    }
                    else {
                        contentType.push({ "LandingPages": false, "GENERAL": false, "EXPERT": false, "AUTHORITY": false, "OTHER": false });
                    }
                    $http.post(url + 'tests/' + id,
                                         {
                                             "testname": vm.testtitle,
                                             "status": testdata.status,
                                             "Questions": vm.questionsansresulttype.length,
                                             "Time": vm.Timer,
                                             "Attempts": vm.Attemps,
                                             "Randomize": testdata.Randomize,
                                             "Locked": $scope.lkukvalue,
                                             "Applicants": testdata.Applicants,
                                             "Passrate": testdata.Passrate,
                                             "role": vm.testselected,
                                             "contentType": contentType,
                                             "passpercentage": $scope.passpercentage,
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

                }
                //attachednewproduct
                $scope.attachednewproduct = function () {

                    if ($scope.buttontext == "Add Question") {
                        $scope.anslist = [];
                        vm.question = "";
                        $scope.buttontext = "Close attach"
                        $scope.showaddquestion = true;

                    }
                    else {
                        $scope.anslist = [];
                        vm.question = "";
                        $scope.buttontext = "Add Question";
                        $scope.showaddquestion = false;
                    }
                }
                $scope.savequestionchange = function () {
                    if ($scope.mcclass == "active") {
                        $scope.MC = true;
                        $scope.TF = false;
                        $scope.WI = false;
                    }
                    else if ($scope.tfclass == "active") {
                        $scope.MC = false;
                        $scope.TF = true;
                        $scope.WI = false;
                    }
                    else {
                        $scope.MC = false;
                        $scope.TF = false;
                        $scope.WI = true;
                    }
                }
                $scope.MCchange = function () {
                    vm.question = "";
                    $scope.mcclass = "active";
                    $scope.tfclass = "";
                    $scope.wiclass = "";

                }
                $scope.TFchange = function () {
                    vm.question = "";
                    $scope.mcclass = "";
                    $scope.tfclass = "active";
                    $scope.wiclass = "";



                }
                $scope.WIchange = function () {
                    vm.question = "";
                    $scope.mcclass = "";
                    $scope.tfclass = "";
                    $scope.wiclass = "active";

                }

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


                $scope.addtoexist = function (index) {
                    if (vm.WCanswer != "" || vm.WCanswer != undefined || vm.WCanswer != " ") {
                        if (vm.questionsansresulttype[index].options.length == 4) {

                            var rep = false;
                            for (var i = 0; i < vm.questionsansresulttype[index].options.length; i++) {
                                if (vm.questionsansresulttype[index].options[i].value == vm.WCanswer) {
                                    rep = true;
                                }
                            }
                            if (rep == false) {
                                if (vm.questionsansresulttype[index].options[1].value != undefined) {
                                    if (vm.questionsansresulttype[index].options[2].value != undefined) {
                                        if (vm.questionsansresulttype[index].options[3].value != undefined) {
                                            $mdDialog.show(
                                              $mdDialog.alert()
                                                .parent(angular.element(document.querySelector('#popupContainer')))
                                                .clickOutsideToClose(true)
                                                .parent(angular.element(document.body))
                                                .title('Error!')
                                                .textContent('Cannot Add more then four option')
                                                .ariaLabel('')
                                                .ok('Ok')
                                                .targetEvent()
                                            );
                                        }
                                        else {
                                            vm.questionsansresulttype[index].options[3].value = vm.WCanswer;
                                            vm.WCanswer = "";
                                        }
                                    }
                                    else {
                                        vm.questionsansresulttype[index].options[2].value = vm.WCanswer;
                                        vm.WCanswer = "";
                                    }
                                }
                                else {
                                    vm.questionsansresulttype[index].options[1].value=vm.WCanswer;
                                    vm.WCanswer = "";
                                }
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
                $scope.savequestion = function () {

                    if ($scope.MC == true) {
                        saveMC();
                    }
                    else if ($scope.TF == true) {
                        saveTF();
                    }
                    else {
                        saveWI();
                    }

                }
                //Save True false question

                $scope.savequestion1 = function (checked) {

                    if (checked == "MC") {

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
                                $http.post(url + 'Questions/' + id,
                                          {
                                              "questionsansresulttype": $scope.questionsansresulttype
                                          }).success(function (data, status) {
                                              if (data.status == 'Success') {
                                                  var pinTo = $scope.getToastPosition();
                                                  vm.selectedanswer = "";
                                                  vm.question = "";
                                                  $scope.anslist = [];
                                                  $scope.MC = false;
                                                  $scope.TF = false;
                                                  $scope.WI = false;
                                                  $mdToast.show(
                                                    $mdToast.simple()
                                                      .textContent('Question Saved successfully!')
                                                      .position(pinTo)
                                                      .hideDelay(3000));
                                                  gettestalldata();
                                              }
                                              else {
                                                  var pinTo = $scope.getToastPosition();

                                                  $mdToast.show(
                                                    $mdToast.simple()
                                                      .textContent('Question Not Saved!')
                                                      .position(pinTo)
                                                      .hideDelay(3000));
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
                        }
                    }
                    else if (checked == "TF") {

                        if (vm.question != "" && vm.question != undefined) {
                            $scope.questionsansresulttype.push({ "Qtitle": vm.question, "answer": vm.offline, "type": "TF" });
                            $http.post(url + 'Questions/' + id,
                                         {
                                             "questionsansresulttype": $scope.questionsansresulttype
                                         }).success(function (data, status) {

                                             if (data.status == 'Success') {
                                                 var pinTo = $scope.getToastPosition();
                                                 vm.question = "";
                                                 vm.offline = false;
                                                 $scope.MC = false;
                                                 $scope.TF = false;
                                                 $scope.WI = false;
                                                 gettestalldata();
                                                 $mdToast.show(
                                                   $mdToast.simple()
                                                     .textContent('Question Saved successfully!')
                                                     .position(pinTo)
                                                     .hideDelay(3000));
                                                 gettestalldata();
                                             }
                                             else {
                                                 var pinTo = $scope.getToastPosition();

                                                 $mdToast.show(
                                                   $mdToast.simple()
                                                     .textContent('Question Not Saved!')
                                                     .position(pinTo)
                                                     .hideDelay(3000));
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

                            count++;
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

                        if (vm.question != "" && vm.question != undefined && vm.answer != undefined && vm.answer != "") {
                            $scope.questionsansresulttype.push({ "Qtitle": vm.question, "answer": vm.answer, "type": "WI" });
                            $http.post(url + 'Questions/' + id,
                                        {
                                            "questionsansresulttype": $scope.questionsansresulttype
                                        }).success(function (data, status) {
                                            if (data.status == 'Success') {
                                                var pinTo = $scope.getToastPosition();
                                                vm.question = "";
                                                vm.answer = "";
                                                $scope.MC = false;
                                                $scope.TF = false;
                                                $scope.WI = false;
                                                gettestalldata();
                                                $mdToast.show(
                                                  $mdToast.simple()
                                                    .textContent('Question Saved successfully!')
                                                    .position(pinTo)
                                                    .hideDelay(3000));

                                            }
                                            else {
                                                var pinTo = $scope.getToastPosition();

                                                $mdToast.show(
                                                  $mdToast.simple()
                                                    .textContent('Question Not Saved!')
                                                    .position(pinTo)
                                                    .hideDelay(3000));
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
                $scope.close = function () {

                    $scope.MC = false;
                    $scope.TF = false;
                    $scope.WI = false;
                    vm.question = "";
                    vm.offline = false;
                    $scope.anslist = [];
                    vm.answer = "";
                }
                $scope.showAdvanced = function (ev, id, type) {
                    $scope.$root.typequestion = type;
                    $scope.$root.questionid = id;

                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'app/main/createtest/dialog1.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    })
                    .then(function (answer) {
                        id = $scope.$root.admintestid;
                        gettestalldata();
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
                };

                function DialogController($scope, $mdDialog) {

                    var vm = this;
                    $scope.anslist = [];
                    $scope.editanslist = [];
                    $scope.MC = true;
                    $scope.TF = false;
                    $scope.WI = false;
                    $scope.hdneditMCanswer = false;
                    $scope.hdnradiolist = true;
                    var url = "http://devteamroom.expresswriters.com:7000/api/v1/";
                    var statusget = "";
                    //var url = "http://localhost:7000/api/v1/";
                    var typeofques = $scope.$root.typequestion;
                    var testrootid = $scope.$root.admintestid;
                    var questionid = $scope.$root.questionid;
                    if (typeofques == "MC") {
                        $scope.MC = true;
                        $scope.TF = false;
                        $scope.WI = false;
                        getquestion("questionWC/get/", questionid);

                    }
                    else if (typeofques == "TF") {
                        $scope.MC = false;
                        $scope.TF = true;
                        $scope.WI = false;
                        getquestion("questiontruefalse/get/", questionid);

                    }
                    else {
                        $scope.MC = false;
                        $scope.TF = false;
                        $scope.WI = true;
                        getquestion("questionWI/get/", questionid);

                    }
                    $scope.converttotext = function () {

                        if ($scope.hdneditMCanswer == false) {

                            $scope.hdneditMCanswer = true;
                            $scope.hdnradiolist = false;
                        }
                        else {

                            $scope.selectedanswer = $scope.selectedanswer;
                            $scope.hdneditMCanswer = false;
                            $scope.hdnradiolist = true;

                        }
                        console.log($scope.anslist);
                    }
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };

                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };

                    $scope.Update = function () {
                        if (typeofques == "MC") {

                            updatequestionMC("question/update/", questionid, typeofques, $scope.selectedanswer);

                        }
                        else if (typeofques == "TF") {

                            updatequestionMC("question/update/", questionid, typeofques, $scope.offline);
                        }
                        else {

                            updatequestionMC("question/update/", questionid, typeofques, $scope.answer);

                        }

                    };
                    //get div according to question type
                    function getquestion(apitype, apiid) {
                        $http.get(url + 'question/' + apiid).success(function (data, status) {

                            if (typeofques == "MC") {
                                $scope.question = data.result.questiontitle;
                                $scope.selectedanswer = data.result.answer;

                                for (var i = 0; i < data.result.options.length; i++) {
                                    if (data.result.options[i].value != undefined) {
                                        $scope.anslist.push({ 'name': data.result.options[i].value });
                                    }
                                }
                                //$scope.anslist.push({ 'name': data.result.options[0].value });
                                //$scope.anslist.push({ 'name': data.result.options[1].value });
                                //$scope.anslist.push({ 'name': data.result.options[2].value });
                                //$scope.anslist.push({ 'name': data.result.options[3].value });


                            }
                            else if (typeofques == "TF") {
                                $scope.question = data.result.questiontitle;
                                $scope.offline = data.result.answer;
                            }
                            else {
                                $scope.question = data.result.questiontitle;
                                $scope.answer = data.result.answer;
                            }
                        }).error(function () {

                            console.log('error');
                        });

                    }
                    //update questions according to question type

                    //update questionsMC according to question type
                    function updatequestionMC(apitype, apiid, type, answer) {

                        $http.post(url + apitype + apiid,
                                               {
                                                   "questiontitle": $scope.question,
                                                   "testid": testrootid,
                                                   "options": $scope.anslist,
                                                   "type": type,
                                                   "answer": answer
                                               }).success(function (data, status) {

                                                   $mdDialog.hide('Done');
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
                }
                
                //Update question
                $scope.updatequestion = function (id, type,title,testid,answer,options)
                {
                    $http.post(url + '/question/update/' + id,
                                         {
                                             "questiontitle": title,
                                             "testid": testid,
                                             "answer": answer,
                                             "question": options,
                                             "type": type,
                                         }).success(function (data, status) {
                                             if (data.status == 'Success') {
                                                 var pinTo = $scope.getToastPosition();
                                                 
                                                 $mdToast.show(
                                                   $mdToast.simple()
                                                     .textContent('Question Update successfully!')
                                                     .position(pinTo)
                                                     .hideDelay(3000));
                                                 gettestalldata();
                                             }
                                             else {
                                                 var pinTo = $scope.getToastPosition();

                                                 $mdToast.show(
                                                   $mdToast.simple()
                                                     .textContent('Question Not Update!')
                                                     .position(pinTo)
                                                     .hideDelay(3000));
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
            }

        }

    }
})();
