(function ()
{
    'use strict';

    angular
        .module('app.jobdetail', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.jobdetail', {
                url: '/jobdetail',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/jobdetail/jobdetail.html',
                        controller: 'jobdetailController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('jobdetail@get');
                    }
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/jobdetail');
       
        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);
        
        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title: 'jobdetail',
            group : true,
            weight: 1
        });

        //msNavigationServiceProvider.saveItem('fuse.jobdetail', {
        //    title    : 'Jobs',
        //    icon     : 'icon-tile-four',
        //    state    : 'app.sample',
        //    /*stateParams: {
        //        'param1': 'page'
        //     },*/
        //    translate: "jobdetail",
        //    weight   : 1
        //});
    }
})();