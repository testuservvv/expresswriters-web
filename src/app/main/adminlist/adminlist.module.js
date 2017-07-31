(function ()
{
    'use strict';

    angular
        .module('app.adminlist', ['nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.adminlist', {
                url: '/Jobs',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/adminlist/adminlist.html',
                        controller: 'adminlistController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('adminlist@get');
                    }
                },
                
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/adminlist');
       
        // Api
        msApiProvider.register('adminlist', ['app/data/sample/sample.json']);
       
        // Navigation
        
            msNavigationServiceProvider.saveItem('fuse', {
                title: 'Admin',
                group: true,
                weight: 2
            });

            msNavigationServiceProvider.saveItem('fuse.adminlist', {
                title: 'Admin',
                icon: 'icon-folder',
                //state: 'app.adminlist',
                /*stateParams: {
                    'param1': 'page'
                 },*/
                translate: "HR",
                weight: 6
            });

            msNavigationServiceProvider.saveItem('fuse.adminlist.server1', {
                title: 'Admin',
                icon: 'icon-file-outline',
                state: 'app.adminlist',
                //state: 'fuse.dashboards_server',
                translate: "Jobs",
                weight: 2
            });




           
        
    }
})();