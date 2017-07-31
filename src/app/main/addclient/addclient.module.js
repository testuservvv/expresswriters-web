(function ()
{
    'use strict';
    angular
        .module('app.addclient', ['flow', 'nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.addclient', {
                url: '/AddClient',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/addclient/addclient.html',
                        controller: 'addclientController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('addclient@get');
                    },                  
                    Documents: function (msApi) {
                            return msApi.resolve('fileManager.documents@get');
                    }
                   
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/addclient');
       
        // Api
        msApiProvider.register('addclient', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
       

        msNavigationServiceProvider.saveItem('fuse.users.server', {
            title: 'Admin',
            icon: 'icon-file-outline',
            state: 'app.client',
            translate: "Clients",
            weight: 2
        });
    }
})();