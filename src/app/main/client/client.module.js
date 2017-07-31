(function ()
{
    'use strict';

    angular
        .module('app.client', ['nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.client', {
                url: '/Client',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/client/client.html',
                        controller: 'clientController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('users@get');
                    }
                },
                
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/client');
       
        // Api
        msApiProvider.register('client', ['app/data/sample/sample.json']);
       
        // Navigation
        
          
          
            msNavigationServiceProvider.saveItem('fuse.users.server', {
            title: 'Admin',
            icon: 'icon-file-outline',
            state: 'app.client',
            translate: "Clients",
            weight: 2
        });

            




           
        
    }
})();