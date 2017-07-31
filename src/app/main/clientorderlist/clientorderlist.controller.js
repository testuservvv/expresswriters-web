(function ($http, $scope, $state, $location, $mdDialog, $timeout, $stateParams) {
    'use strict';
    angular
        .module('app.clientorderlist')
        .controller('clientorderlistController', clientorderlistController);

    /** @ngInject */
    function clientorderlistController(SampleData, $http, $scope, $state, $location, $mdDialog, $timeout, $stateParams) {

        var usertype = window.localStorage['type'];
        if (usertype == 'User' || usertype == undefined) {
            $location.path('Careers');
        }
        else if (usertype == "") {
            $location.path('login');
        }
        else {
            //API Url
            var url = window.localStorage['APIURL'];

            var CLID = $stateParams.ClientID;

            if (CLID == undefined) {
                $location.path('Orders');
            }
            else {
                var vm = this;
                {
                    //By Default Set Active Tab
                    vm.activeclasslis = "active";
                    vm.activeclasscom = "";
                    vm.activeclasshis = "";
                    vm.activeclassfrz = "";
                    vm.activeclasstra = "";
                    //Action hide and show buttons
                    vm.activetab = false;
                    vm.completetab = true;
                    vm.historytab = true;
                    vm.frozentab = true;
                    vm.trashtab = true;
                }
                var status = "Active";
                vm.username = "";
                vm.totalvalue = 0;
                vm.totalitems = 0;
                vm.totaltasks = 0;

                /*Get All orders Details By Client ID*/
                getallorders(status, CLID);
                function getallorders(status, clientid) {

                    $http.get(url + 'orders/' + status + '/' + clientid).success(function (data, status) {
                        if (data.status == 'Success') {

                            vm.filteredTodos = data.Orders;
                            $scope.$root.arryIDs = [];
                            for (var t = 0; t < vm.filteredTodos.length; t++) {
                                $scope.$root.arryIDs.push(vm.filteredTodos[t]._id);
                                vm.username = vm.filteredTodos[t].clientname;

                                vm.totalvalue = parseInt(vm.totalvalue) + parseInt(vm.filteredTodos[t].accountcredit);
                                for (var n = 0; n < vm.filteredTodos[t].items.length; n++) {
                                    vm.totaltasks = vm.totaltasks + vm.filteredTodos[t].items[n].tasks.length;
                                }
                                vm.totalitems = vm.totalitems + vm.filteredTodos[t].items.length;
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

                /*datatable data*/
                vm.widget7 = {

                    title: "Applicant Tests",
                    table: vm.filteredTodos,
                    dtOptions: {
                        dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                        pagingType: 'simple',
                        pageLength: 10,
                        lengthMenu: [10, 20, 50, 100],
                        autoWidth: false,
                        responsive: true,
                        bFilter: false,
                        columnDefs: [
                            {
                               
                                targets: [0, 1, 2, 3, 4, 5, 6, 7]
                            }
                        ],
                        columns: [
                            {},

                            {
                                render: function (data, type) {
                                    if (type === 'display') {
                                        return data + ' ';
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
                            },
                            {

                            }
                        ]
                    }
                };

                /* Get percentage*/
                vm.getpercentage = function (items) {

                    var completetasks = 0;
                    var total = 0;
                    for (var i = 0; i < items.length; i++) {

                        completetasks = completetasks + parseInt(items[i].totalassigntasks);
                        total = total + parseInt(items[i].totaltasks);
                    }

                    var per = (completetasks / total) * 100;
                    var final = Math.round(per * 100) / 100;
                    return final;
                }

                //Get All active
                vm.allactive = function () {
                    vm.activeclasslis = "active";
                    vm.activeclasscom = "";
                    vm.activeclasshis = "";
                    vm.activeclassfrz = "";
                    vm.activeclasstra = "";
                    vm.activetab = false;
                    vm.completetab = true;
                    vm.historytab = true;
                    vm.frozentab = true;
                    vm.trashtab = true;
                    vm.totalvalue = 0;
                    vm.totalitems = 0;
                    vm.totaltasks = 0;
                    getallorders('Active', CLID);
                }

                //Get All completed
                vm.completed = function () {
                    vm.activeclasslis = "";
                    vm.activeclasscom = "active";
                    vm.activeclasshis = "";
                    vm.activeclassfrz = "";
                    vm.activeclasstra = "";
                    vm.activetab = true;
                    vm.completetab = false;
                    vm.historytab = true;
                    vm.frozentab = true;
                    vm.trashtab = true;
                    vm.totalvalue = 0;
                    vm.totalitems = 0;
                    vm.totaltasks = 0;
                    getallorders('Complete', CLID);
                }

                //Get All history
                vm.history = function () {
                    vm.activeclasslis = "";
                    vm.activeclasscom = "";
                    vm.activeclasshis = "active";
                    vm.activeclassfrz = "";
                    vm.activeclasstra = "";
                    vm.activetab = true;
                    vm.completetab = true;
                    vm.historytab = false;
                    vm.frozentab = true;
                    vm.trashtab = true;
                    vm.totalvalue = 0;
                    vm.totalitems = 0;
                    vm.totaltasks = 0;
                    getallorders('History', CLID);
                }

                //Get All frozen
                vm.frozen = function () {
                    vm.activeclasslis = "";
                    vm.activeclasscom = "";
                    vm.activeclasshis = "";
                    vm.activeclassfrz = "active";
                    vm.activeclasstra = "";
                    vm.activetab = true;
                    vm.completetab = true;
                    vm.historytab = true;
                    vm.frozentab = false;
                    vm.trashtab = true;
                    vm.totalvalue = 0;
                    vm.totalitems = 0;
                    vm.totaltasks = 0;
                    getallorders('Frozen', CLID);
                }

                //Get All Trash
                vm.Trash = function () {
                    vm.activeclasslis = "";
                    vm.activeclasscom = "";
                    vm.activeclasshis = "";
                    vm.activeclassfrz = "";
                    vm.activeclasstra = "active";
                    vm.activetab = true;
                    vm.completetab = true;
                    vm.historytab = true;
                    vm.frozentab = true;
                    vm.trashtab = false;
                    vm.totalvalue = 0;
                    vm.totalitems = 0;
                    vm.totaltasks = 0;
                    getallorders('Trash', CLID);
                }

                //Go to client profile
                vm.gotoprofile = function () {
                    alert('Not Created Yet!');
                }

                //Upadte order status function
                function getupdatestatusbyaction(orderid, newstatus) {

                    for (var i = 0; i < orderid.length; i++) {
                        var id = orderid[i];
                        if (id != "") {
                            $http.post(url + 'orders/status/' + orderid[i],
                                {
                                    "status": newstatus
                                }
                                ).success(function (data, status) {

                                    if (data.status == 'Success') {
                                        $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .parent(angular.element(document.body))
                          .title('Success')
                          .textContent('Order status has been changed!')
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
                    $timeout(function () {

                        vm.activeclasslis = "active";
                        vm.activeclasscom = "";
                        vm.activeclasshis = "";
                        vm.activeclassfrz = "";
                        vm.activeclasstra = "";
                        vm.activetab = false;
                        vm.completetab = true;
                        vm.historytab = true;
                        vm.frozentab = true;
                        vm.trashtab = true;
                        vm.totalvalue = 0;
                        vm.totalitems = 0;
                        vm.totaltasks = 0;
                        getallorders('Active', CLID);
                    }, 2000);
                }
                //Check Drop down is selected or not if yes then update the status
                vm.change = function (status) {

                    //var selids = $('#selectedids').val();
                    var selectedValues = "";
                    $('#tableservice').find('input[type="checkbox"]:checked').each(function () {
                        selectedValues += "," + $(this).val();
                    });
                    if (selectedValues == "") {
                        $mdDialog.show(
                                                  $mdDialog.alert()
                                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                                    .clickOutsideToClose(true)
                                                    .parent(angular.element(document.body))
                                                    .title('Cannot Process!')
                                                    .textContent('Please select a order first!')
                                                    .ariaLabel('')
                                                    .ok('Ok')
                                                    .targetEvent()
                                                );
                    }
                    else {
                        selectedValues = selectedValues.substring(1);
                        var selectedValues = selectedValues.split(',');
                        $('#selectedids').val("");
                        if (selectedValues.length < 1) {

                            $mdDialog.show(
                                      $mdDialog.alert()
                                        .parent(angular.element(document.querySelector('#popupContainer')))
                                        .clickOutsideToClose(true)
                                        .parent(angular.element(document.body))
                                        .title('Cannot Process!')
                                        .textContent('Please select a order first!')
                                        .ariaLabel('')
                                        .ok('Ok')
                                        .targetEvent()
                                    );

                        }
                        else {
                            getupdatestatusbyaction(selectedValues, status)
                        }
                    }
                }


                //Go to selected client Id only lists
                vm.showallordersbyclientid = function (orderId, clientID, name) {

                    //alert('Under Working!');
                    $scope.$root.clientname = name;
                    $location.path('TaskItems/' + orderId + '/' + clientID);
                }

                vm.totaltaskscount = function (items) {

                    var tasks = 0;
                    for (var i = 0; i < items.length; i++) {
                        tasks = tasks + parseInt(items[i].totaltasks);
                    }
                    return tasks;
                }
            }
        }
    }
})();
