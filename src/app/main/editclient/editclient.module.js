(function ()
{
    'use strict';
    angular
        .module('app.editclient', ['flow', 'nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.editclient', {
                url: '/EditClient',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/editclient/editclient.html',
                        controller: 'editclientController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('editclient@get');
                    },                  
                    Documents: function (msApi) {
                            return msApi.resolve('fileManager.documents@get');
                    }
                   
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/editclient');
       
        // Api
        msApiProvider.register('editclient', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
       

       
    }
})();