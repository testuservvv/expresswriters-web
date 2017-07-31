(function ($http, $scope, $state, $location, $mdDialog, $timeout, $stateParams) {
    'use strict';
    angular
        .module('app.taskitemlistclient')
        .controller('taskitemlistclientController', taskitemlistclientController);

    /** @ngInject */
    function taskitemlistclientController(SampleData, $http, $scope, $state, $location, $mdDialog, $timeout, $stateParams) {

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

            var vm = this;
            var CLID = $stateParams.ClientID;
            var ORID = $stateParams.OrderID;
            vm.totalids = $scope.$root.arryIDs;
            $scope.$root.itemidsarr = [];
            vm.allitemsofclient = [];
            vm.currentitem = 0;
            vm.today = new Date();
            vm.username = $scope.$root.clientname;
            if (vm.totalids == undefined) {
                $location.path('Orders');
            }
            else {
                set();
                function set() {
                    //By Default Set Active Tab
                    vm.activeclassall = "active";
                    vm.activeclassunass = "";
                    vm.activeclassreass = "";
                    vm.activeclassass = "";
                    vm.activeclasslate = "";
                    vm.activeclasswor = "";
                    vm.activeclassedi = "";
                    vm.activeclasssen = "";
                    vm.activeclassapp = "";
                    vm.activeclassrev = "";
                    vm.activeclasscan = "";
                    vm.activeclasspau = "";
                    //Action hide and show buttons
                    vm.unassignedtab = true;
                    vm.reassignedtab = true;
                    vm.assignedtab = true;
                    vm.latetab = true;
                    vm.workingtab = true;
                    vm.editorialtab = true;
                    vm.senttab = true;
                    vm.approvedtab = true;
                    vm.revisiontab = true;
                    vm.cancelledtab = true;
                    vm.pausedtab = true;
                }
                vm.all = function () {
                    vm.search = "";
                    //By Default Set Active Tab
                    vm.activeclassall = "active";
                    vm.activeclassunass = "";
                    vm.activeclassreass = "";
                    vm.activeclassass = "";
                    vm.activeclasslate = "";
                    vm.activeclasswor = "";
                    vm.activeclassedi = "";
                    vm.activeclasssen = "";
                    vm.activeclassapp = "";
                    vm.activeclassrev = "";
                    vm.activeclasscan = "";
                    vm.activeclasspau = "";
                    //Action hide and show buttons
                    vm.unassignedtab = true;
                    vm.reassignedtab = true;
                    vm.assignedtab = true;
                    vm.latetab = true;
                    vm.workingtab = true;
                    vm.editorialtab = true;
                    vm.senttab = true;
                    vm.approvedtab = true;
                    vm.revisiontab = true;
                    vm.cancelledtab = true;
                    vm.pausedtab = true;
                    vm.filterlistname = "";


                    getallorders(ORID, CLID);
                }
                /*Get All orders Details By Client ID*/
                getallorders(ORID, CLID);
                function getallorders(OrderID, clientid) {
                    $http.get(url + 'items/' + OrderID + '/' + clientid).success(function (data, status) {
                        if (data.status == 'Success') {
                            vm.filteredTodos = data.items;
                            vm.orderid = OrderID;

                            for (var i = 0; i < vm.filteredTodos.length; i++) {
                                $scope.$root.itemidsarr.push(vm.filteredTodos[i]._id);
                            }
                            if (vm.totalids.length == 1) {
                                vm.prev = true;
                                vm.next = true;
                            }
                            if (vm.currentitem == vm.totalids.length - 1) {
                                vm.prev = false;
                                vm.next = true;
                            }
                            if (vm.currentitem == 0) {
                                getsingledata(OrderID);
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
                /*Get All orders Details By Client ID*/
                vm.widget7 = {

                    title: "Applicant Tests",
                    table: vm.filteredTodos,
                    dtOptions: {
                        dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                        pagingType: 'simple',

                        autoWidth: false,
                        responsive: true,
                        bFilter: false,
                        bPaginate: false,
                        sInfoFiltered: "",
                        bInfo: false,
                        columnDefs: [
                            {
                                width: '',
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
                    if (items != undefined) {
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
                }
                //get detail of orders items by current order id
                function getsingledata(OrderID) {

                    if (vm.totalids.length == 1) {
                        vm.prev = true;
                        vm.next = true;
                    }
                    else {
                        for (var i = 0; i < vm.totalids.length; i++) {
                            if (vm.totalids[i] == OrderID) {
                                vm.currentitem = i;
                                if (vm.currentitem == 0) {
                                    vm.prev = true;
                                    vm.next = false;
                                }
                                else if (vm.currentitem == vm.totalids.length - 1) {
                                    vm.prev = false;
                                    vm.next = true;
                                }
                                else if (vm.currentitem < vm.totalids.length) {
                                    vm.prev = false;
                                    vm.next = false;
                                }


                            }
                        }
                    }
                }
                //Show next record
                vm.nextrecord = function () {

                    set();
                    vm.filterlistname = "";
                    vm.currentitem++;
                    if (vm.currentitem < vm.totalids.length && vm.currentitem > 0) {
                        vm.prev = false;
                        vm.next = false;
                        getallorders(vm.totalids[vm.currentitem], CLID);
                    }
                    else if (vm.currentitem == vm.totalids.length) {
                        vm.currentitem--;
                        vm.prev = false;
                        vm.next = true;
                    }
                    else if (vm.currentitem < vm.totalids.length) {
                        vm.prev = false;
                        vm.next = false;
                    }
                }
                //Show Previous record
                vm.prevrecord = function () {

                    set();
                    vm.filterlistname = "";
                    vm.currentitem--;

                    if (vm.currentitem < vm.totalids.length) {
                        vm.prev = false;
                        vm.next = false;
                        getallorders(vm.totalids[vm.currentitem], CLID);
                    }
                    else {
                        vm.currentitem++;
                        vm.prev = true;
                        vm.next = false;
                    }
                }

                //clear all
                function clear() {
                    //By Default Set Active Tab
                    vm.activeclassall = "";
                    vm.activeclassunass = "";
                    vm.activeclassreass = "";
                    vm.activeclassass = "";
                    vm.activeclasslate = "";
                    vm.activeclasswor = "";
                    vm.activeclassedi = "";
                    vm.activeclasssen = "";
                    vm.activeclassapp = "";
                    vm.activeclassrev = "";
                    vm.activeclasscan = "";
                    vm.activeclasspau = "";
                    //Action hide and show buttons
                    vm.unassignedtab = true;
                    vm.reassignedtab = true;
                    vm.assignedtab = true;
                    vm.latetab = true;
                    vm.workingtab = true;
                    vm.editorialtab = true;
                    vm.senttab = true;
                    vm.approvedtab = true;
                    vm.revisiontab = true;
                    vm.cancelledtab = true;
                    vm.pausedtab = true;
                }

                //Show list
                vm.getlist = function (searchtext) {

                    vm.search = "";
                    clear();
                    if (searchtext == 'Unassigned') {
                        vm.activeclassunass = 'active';
                    }
                    if (searchtext == 'Reassigned') {
                        vm.activeclassreass = 'active';
                    }
                    if (searchtext == 'Assigned') {
                        vm.activeclassass = 'active';
                    }
                    if (searchtext == 'Late') {
                        vm.activeclasslate = 'active';
                    }
                    if (searchtext == 'Working') {
                        vm.activeclasswor = 'active';
                    }
                    if (searchtext == 'Editorial') {
                        vm.activeclassedi = 'active';
                    }
                    if (searchtext == 'Sent') {
                        vm.activeclasssen = 'active';
                    }
                    if (searchtext == 'Approved') {
                        vm.activeclassapp = 'active';
                    }
                    if (searchtext == 'Revision') {
                        vm.activeclassrev = 'active';
                    }
                    if (searchtext == 'Cancelled') {
                        vm.activeclasscan = 'active';
                    }
                    if (searchtext == 'Paused') {
                        vm.activeclasspau = 'active';
                    }
                    vm.filterlistname = searchtext;

                }


                //change status by id
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
                                                    .textContent('Please select a item first!')
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
                            set();
                            getupdatestatusbyaction(selectedValues, status)
                        }
                    }
                }

                function getupdatestatusbyaction(itemsids, status) {

                    for (var i = 0; i < itemsids.length; i++) {
                        var id = itemsids[i];
                        if (id != "") {
                            $http.post(url + 'items/' + id,
                                                 {
                                                     "status": status
                                                 }).success(function (data, status) {

                                                     if (data.status == 'Success') {
                                                         set();
                                                         vm.filterlistname = "";
                                                         vm.search = "";
                                                         getallorders(ORID, CLID);
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

                //go to detail
                vm.showallordersbyclientid = function (id,index) {
                    $scope.$root.iittmmID = id;
                    $scope.$root.ClientID = CLID;
                    $scope.$root.OrderID = ORID
                    $scope.$root.arryIDs = vm.totalids;
                    $scope.$root.name = vm.username;
                    $location.path(ORID + "/" + id + "/" + index);
                }

                vm.goback = function () {
                    $location.path('Orders');
                }

                vm.itemlisting = function () {
                    $location.path('ClientOrders/' + CLID);
                }
            }
        }
    }
})();
