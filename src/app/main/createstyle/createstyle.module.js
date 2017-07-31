(function ()
{
    'use strict';

    angular
        .module('app.createstyle', ['flow', 'ngMaterial']).
    filter('highlight', function ($sce) {
        return function(text, phrase) {
            if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
              '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    })
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.createstyle', {
                url: '/Styles',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/createstyle/createstyle.html',
                        controller: 'createstyleController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('createstyle@get');
                    },                  
                    Documents: function (msApi) {
                            return msApi.resolve('fileManager.documents@get');
                    }
                   
                }
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/createstyle');
       
        // Api
        msApiProvider.register('createstyle', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
        
        msNavigationServiceProvider.saveItem('fuse.adminapplicant6', {
            title: 'Admin',
            icon: 'icon-folder',
           
            translate: "User Settings",
            weight: 9
        });
        msNavigationServiceProvider.saveItem('fuse.adminapplicant6.server1', {
            title: 'Admin',
            icon: 'icon-file-outline',
            //state: 'fuse.dashboards_server',
            translate: "Writers",
        });
        msNavigationServiceProvider.saveItem('fuse.adminapplicant6.server1.s1', {
            title: 'Admin',
            icon: 'icon-file-outline',
            state: 'app.createstyle',
            translate: "Styles",
        });
        //msNavigationServiceProvider.saveItem('fuse.adminapplicant6.server1.s2', {
        //    title: 'Admin',
        //    icon: 'icon-file-outline',
        //    //state: 'fuse.dashboards_server',
        //    translate: "Categories & Tags",
        //});
        msNavigationServiceProvider.saveItem('fuse.adminapplicant6.server2', {
            title: 'Admin',
            icon: 'icon-file-outline',
            //state: 'fuse.dashboards_server',
            translate: "Editors",
        });
    }
})();