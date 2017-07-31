(function ()
{
    'use strict';

    angular
        .module('app.orderslist', ['nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.orderslist', {
                url: '/Orders',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/orderslist/orderslist.html',
                        controller: 'orderslistController as vm'
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
        $translatePartialLoaderProvider.addPart('app/main/orderslist');
       
        // Api
        msApiProvider.register('orderslist', ['app/data/sample/sample.json']);
       
        // Navigation
        
           

            
            msNavigationServiceProvider.saveItem('fuse.adminapplicant1.project', {
                title: 'Admin',
                state: 'app.orderslist',
                icon: 'icon-file-outline',
                translate: "Orders",
            });

           
    }
})();