(function ()
{
    'use strict';

    angular
        .module('app.taskdetail', ['nvd3', 'datatables', 'ui.router'])
        .config(config)
   .filter('unique', function () {

        return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    });
    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.taskdetail', {
                url: '/:orderId/:itemid/:taskid',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/taskdetail/taskdetail.html',
                        controller: 'taskdetailController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('adminapplicant@get');
                    }
                },
                
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/taskdetail');
       
        // Api
        msApiProvider.register('taskdetail', ['app/data/sample/sample.json']);
       
        // Navigation
        
           
            msNavigationServiceProvider.saveItem('fuse.adminapplicant1.project', {
                title: 'Admin',
                state: 'app.orderslist',
                icon: 'icon-file-outline',
                translate: "Orders",
            });

    }
})();