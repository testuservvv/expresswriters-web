(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            // Sample
            'app.sample',

              // jobs
            'app.jobdetail',
            //create job
             'app.createJob',
             'app.register',
             'app.login',
             'app.reset-password',
             'app.adminlist',
             'app.editjob',
             'app.admintestlist',
             'app.createtest',
             'app.edittest',
             'app.landingpage',
             'app.adminapplicant',
             'app.adminapplicanttestdetail',
             'app.users',
             'app.adduser',
             'app.client',
             'app.addclient',
             'app.createstyle',
             'app.createcategories',
             'app.tags',
             'app.edituser',
             'app.editclient',
             'app.orderslist',
             'app.clientorderlist',
             'app.taskitemlistclient',
             'app.taskdetail',

        ]);
})();