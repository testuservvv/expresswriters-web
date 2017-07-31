(function ()
{
    'use strict';

    angular
        .module('app.adminapplicanttestdetail', ['flow'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.adminapplicanttestdetail', {
                url: '/Test/Writer-Test',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/adminapplicanttestdetail/adminapplicanttestdetail.html',
                        controller: 'adminapplicanttestdetailController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('adminapplicanttestdetail@get');
                    },                  
                    Documents: function (msApi) {
                            return msApi.resolve('fileManager.documents@get');
                    }
                   
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/adminapplicanttestdetail');
       
        // Api
        msApiProvider.register('adminapplicanttestdetail', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
        
        msNavigationServiceProvider.saveItem('fuse', {
            title: 'Admin',
            group: true,
            weight: 1
        });


        msNavigationServiceProvider.saveItem('fuse.adminlist.server3', {
            title: 'Admin',
            icon: 'icon-file-outline',
            state: 'app.adminapplicant',
            //state: 'fuse.dashboards_server',
            translate: "Applicants",
            weight: 3
        });
    }
})();