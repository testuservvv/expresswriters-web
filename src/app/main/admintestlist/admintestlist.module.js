(function ()
{
    'use strict';

    angular
        .module('app.admintestlist', ['nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.admintestlist', {
                url: '/Tests',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/admintestlist/admintestlist.html',
                        controller: 'admintestlistController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('admintestlist@get');
                    }
                },
                
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/admintestlist');
       
        // Api
        msApiProvider.register('admintestlist', ['app/data/sample/sample.json']);
       
        // Navigation
        
            msNavigationServiceProvider.saveItem('fuse', {
                title: 'Admin',
                group: true,
                weight: 2
            });

          
            msNavigationServiceProvider.saveItem('fuse.adminlist.server', {
                title: 'Admin',
                icon: 'icon-file-outline',
                state: 'app.admintestlist',
                //state: 'fuse.dashboards_server',
                translate: "Tests",
                weight: 1
            });
        
    }
})();