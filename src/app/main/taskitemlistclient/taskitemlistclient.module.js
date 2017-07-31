(function ()
{
    'use strict';

    angular
        .module('app.taskitemlistclient', ['nvd3', 'datatables', 'ui.router'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.taskitemlistclient', {
                url: '/TaskItems/:OrderID/:ClientID',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/taskitemlistclient/taskitemlistclient.html',
                        controller: 'taskitemlistclientController as vm'
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
        $translatePartialLoaderProvider.addPart('app/main/taskitemlistclient');
       
        // Api
        msApiProvider.register('taskitemlistclient', ['app/data/sample/sample.json']);
       
        // Navigation
        
           
            msNavigationServiceProvider.saveItem('fuse.adminapplicant1.project', {
                title: 'Admin',
                state: 'app.orderslist',
                icon: 'icon-file-outline',
                translate: "Orders",
            });

    }
})();