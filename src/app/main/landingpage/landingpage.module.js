(function ()
{
    'use strict';
    angular
        .module('app.landingpage', ['flow'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.landingpage', {
                url: '/Jobs/:titleselected',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/landingpage/landingpage.html',
                        controller: 'landingpageController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('landingpage@get');
                    },                  
                    Documents: function (msApi) {
                            return msApi.resolve('fileManager.documents@get');
                    }
                   
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/landingpage');
       
        // Api
        msApiProvider.register('landingpage', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
        
        // Navigation
        //msNavigationServiceProvider.saveItem('fuse', {
        //    title: 'createJob',
        //    group : true,
        //    weight: 1
        //});

        //msNavigationServiceProvider.saveItem('fuse.createJob', {
        //    title: 'createJob',
        //    icon     : 'icon-tile-four',
        //    state: 'app.createJob',
        //    /*stateParams: {
        //        'param1': 'page'
        //     },*/
        //    translate: "createJob",
        //    weight   : 1
        //});
    }
})();