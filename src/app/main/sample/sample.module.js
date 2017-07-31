(function ()
{
    'use strict';

    angular
        .module('app.sample', ['nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.sample', {
                url: '/Careers',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/sample/sample.html',
                        controller : 'SampleController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                },
                
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/sample');
        $translatePartialLoaderProvider.addPart('app/main/jobdetail');
        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);
        msApiProvider.register('jobdetail', ['app/data/sample/sample.json']);
        // Navigation
       
            msNavigationServiceProvider.saveItem('fuse', {
                title: 'User',
                group: true,
                weight:1,
                translate: "Careers",
            });

            msNavigationServiceProvider.saveItem('fuse.sample', {
                title: 'User',
                icon: 'icon-tile-four',
                state: 'app.sample',
                /*stateParams: {
                    'param1': 'page'
                 },*/
                translate: "Careers",
                weight:1
            });
        
    }
})();