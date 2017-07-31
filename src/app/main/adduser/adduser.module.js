(function ()
{
    'use strict';
    angular
        .module('app.adduser', ['flow', 'nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.adduser', {
                url: '/AddUser',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/adduser/adduser.html',
                        controller: 'adduserController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('adduser@get');
                    },                  
                    Documents: function (msApi) {
                            return msApi.resolve('fileManager.documents@get');
                    }
                   
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/adduser');
       
        // Api
        msApiProvider.register('adduser', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
        
        msNavigationServiceProvider.saveItem('fuse', {
            title: 'Admin',
            group: true,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('fuse.users', {
            title: 'Admin',
            icon: 'icon-folder',

            translate: "People",
            weight: 5
        });
        msNavigationServiceProvider.saveItem('fuse.users.project', {
            title: 'Admin',
            state: 'app.users',
            icon: 'icon-file-outline',
            translate: "Users",
            weight: 1
        });

    }
})();