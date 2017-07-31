(function ()
{
    'use strict';
    angular
        .module('app.edituser', ['flow', 'nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.edituser', {
                url: '/EditUser',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/edituser/edituser.html',
                        controller: 'edituserController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('edituser@get');
                    },                  
                    Documents: function (msApi) {
                            return msApi.resolve('fileManager.documents@get');
                    }
                   
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/edituser');
       
        // Api
        msApiProvider.register('edituser', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
        
       

    }
})();