(function ()
{
    'use strict';

    angular
        .module('app.clientorderlist', ['nvd3', 'datatables', 'ui.router'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.clientorderlist', {
                url: '/ClientOrders/:ClientID',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/clientorderlist/clientorderlist.html',
                        controller: 'clientorderlistController as vm'
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
        $translatePartialLoaderProvider.addPart('app/main/clientorderlist');
       
        // Api
        msApiProvider.register('clientorderlist', ['app/data/sample/sample.json']);
       
        // Navigation
        
           
            msNavigationServiceProvider.saveItem('fuse.adminapplicant1.project', {
                title: 'Admin',
                state: 'app.orderslist',
                icon: 'icon-file-outline',
                translate: "Orders",
            });

    }
})();