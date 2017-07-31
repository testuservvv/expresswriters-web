(function () {
    'use strict';

    angular
        .module('app.tags', ['flow', 'ngMaterial']).
    filter('highlight', function ($sce) {
        return function (text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
              '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    })
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State

        $stateProvider
            .state('app.tags', {
                url: '/Tags/:tag?',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/tags/tags.html',
                        controller: 'tagsController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi) {
                        return msApi.resolve('tags@get');
                    },
                    Documents: function (msApi) {
                        return msApi.resolve('fileManager.documents@get');
                    }

                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/tags');

        // Api
        msApiProvider.register('tags', ['app/data/sample/sample.json']);
        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
        msNavigationServiceProvider.saveItem('fuse.adminapplicant6.server1.s3', {
            title: 'Admin',
            icon: 'icon-file-outline',
            state: 'app.tags',
            translate: "Tag Classification",
        });

    }
})();