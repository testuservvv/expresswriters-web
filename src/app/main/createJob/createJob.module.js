(function ()
{
    'use strict';
    angular
        .module('app.createJob', ['flow'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.createJob', {
                url: '/createJob',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/createJob/createJob.html',
                        controller: 'createJobController as vm'
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
        $translatePartialLoaderProvider.addPart('app/main/createJob');
       
        // Api
        msApiProvider.register('createJob', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
        
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

      
    }
})();