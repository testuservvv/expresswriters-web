(function ()
{
    'use strict';

    angular
        .module('app.users', ['nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.users', {
                url: '/Users',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/users/users.html',
                        controller: 'usersController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('users@get');
                    }
                },
                
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/users');
       
        // Api
        msApiProvider.register('users', ['app/data/sample/sample.json']);
       
        // Navigation
        
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