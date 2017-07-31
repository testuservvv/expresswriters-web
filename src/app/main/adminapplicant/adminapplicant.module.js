(function ()
{
    'use strict';

    angular
        .module('app.adminapplicant', ['nvd3', 'datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
       
        $stateProvider
            .state('app.adminapplicant', {
                url: '/Applicants',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/adminapplicant/adminapplicant.html',
                        controller: 'adminapplicantController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('adminapplicant@get');
                    }
                },
                
            });
       
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/adminapplicant');
       
        // Api
        msApiProvider.register('adminapplicant', ['app/data/sample/sample.json']);
       
        // Navigation
        
            msNavigationServiceProvider.saveItem('fuse', {
                title: 'Admin',
                group: true,
                weight: 1
            });
           

            msNavigationServiceProvider.saveItem('fuse.adminlist.server3', {
                title: 'Admin',
                icon: 'icon-file-outline',
                state: 'app.adminapplicant',
                //state: 'fuse.dashboards_server',
                translate: "Applicants",
                weight: 3
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant1', {
                title: 'Admin',
                icon: 'icon-folder',
                //state: 'fuse.adminapplicant1',
                /*stateParams: {
                    'param1': 'page'
                 },*/
                translate: "Work",
                weight: 4
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant1.project', {
                title: 'Admin',
                state: 'app.orderslist',
                icon: 'icon-file-outline',
                translate: "Orders",
            });

            msNavigationServiceProvider.saveItem('fuse.adminapplicant1.server', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Tasks",
            });

         
            
            msNavigationServiceProvider.saveItem('fuse.adminapplicant4', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "PayRoll",
                weight: 7
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant5', {
                title: 'Admin',
                icon: 'icon-folder',
                //state: 'fuse.adminapplicant2',
                /*stateParams: {
                    'param1': 'page'
                 },*/
                translate: "Main Settings",
                weight: 8
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant5.server1', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Permissions",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant5.server2', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Notifications",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant5.server3', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "API",
            });



            //msNavigationServiceProvider.saveItem('fuse.adminapplicant6', {
            //    title: 'Admin',
            //    icon: 'icon-folder',
            //    //state: 'fuse.adminapplicant2',
            //    /*stateParams: {
            //        'param1': 'page'
            //     },*/
            //    translate: "User Settings",
            //    weight: 9
            //});
            //msNavigationServiceProvider.saveItem('fuse.adminapplicant6.server1', {
            //    title: 'Admin',
            //    icon: 'icon-file-outline',
            //    //state: 'fuse.dashboards_server',
            //    translate: "Writers",
            //});
            //msNavigationServiceProvider.saveItem('fuse.adminapplicant6.server1.s1', {
            //    title: 'Admin',
            //    icon: 'icon-file-outline',
            //    //state: 'fuse.dashboards_server',
            //    translate: "Styles",
            //});
            //msNavigationServiceProvider.saveItem('fuse.adminapplicant6.server1.s2', {
            //    title: 'Admin',
            //    icon: 'icon-file-outline',
            //    //state: 'fuse.dashboards_server',
            //    translate: "Categories & Tags",
            //});
            //msNavigationServiceProvider.saveItem('fuse.adminapplicant6.server2', {
            //    title: 'Admin',
            //    icon: 'icon-file-outline',
            //    //state: 'fuse.dashboards_server',
            //    translate: "Editors",
            //});



            msNavigationServiceProvider.saveItem('fuse.adminapplicant10', {
                title: 'Admin',
                icon: 'icon-folder',
                //state: 'fuse.adminapplicant2',
                /*stateParams: {
                    'param1': 'page'
                 },*/
                translate: "Ecommerce",
                weight: 10
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant10.server1', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Services",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant10.server2', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Categories",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant10.server3', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Coupons",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant10.server4', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Addons",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant10.server5', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Input Forms",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant10.server6', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Samples",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant10.server7', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "FAQs",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant10.server8', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Notifications",
            });
            msNavigationServiceProvider.saveItem('fuse.adminapplicant10.server9', {
                title: 'Admin',
                icon: 'icon-file-outline',
                //state: 'fuse.dashboards_server',
                translate: "Settings",
            });
            
           
    }
})();