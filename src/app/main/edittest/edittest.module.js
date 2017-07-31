(function ()
{
    'use strict';

    angular
        .module('app.edittest', ['flow', 'nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.edittest', {
                url: '/edittest',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/edittest/edittest.html',
                        controller: 'edittestController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('edittest@get');
                    },                  
                    Documents: function (msApi) {
                            return msApi.resolve('fileManager.documents@get');
                    }
                   
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/edittest');
       
        // Api
        msApiProvider.register('edittest', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
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