(function ()
{
    'use strict';

    angular
        .module('app.createtest', ['flow'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.createtest', {
                url: '/createtest',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/createtest/createtest.html',
                        controller: 'createtestController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('createJob@get');
                    },                  
                    Documents: function (msApi) {
                            return msApi.resolve('fileManager.documents@get');
                    }
                   
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/createtest');
       
        // Api
        msApiProvider.register('createtest', ['app/data/sample/sample.json']);
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