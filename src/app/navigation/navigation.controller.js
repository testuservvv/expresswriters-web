(function ()
{
    'use strict';

    angular
        .module('app.navigation')
        .controller('NavigationController', NavigationController);

    /** @ngInject */
    function NavigationController($scope)
    {
        var vm = this;
        vm.imageUrl = "../../../../assets/images/logo-min.png";
        // Data
        vm.bodyEl = angular.element('body');
        vm.folded = false;
        vm.msScrollOptions = {
            suppressScrollX: true
        };

        // Methods
        vm.toggleMsNavigationFolded = toggleMsNavigationFolded;

        //////////
        vm.showfullimage = function (value) {
            if(value=='T')
            {
                vm.imageUrl = "../../../../assets/images/left_logo.png";
            }
            else {
                vm.imageUrl = "../../../../assets/images/logo-min.png";
            }
        }
        /**
         * Toggle folded status
         */
        function toggleMsNavigationFolded()
        {
            
            vm.folded = !vm.folded;
            if (vm.folded)
            {

            }
        }

        // Close the mobile menu on $stateChangeSuccess
        $scope.$on('$stateChangeSuccess', function ()
        {
           
            vm.bodyEl.removeClass('ms-navigation-horizontal-mobile-menu-active');
            vm.login = function () {
               
                $scope.$root.st = false;
                $scope.$root.classname = "randomstyle";
                var status = false;
                var id = window.localStorage['userid'];
                if (id!=null && id!=undefined && id!="")
                {
                    status = true;
                    $scope.$root.st = true;
                    $scope.$root.classname = "";

                }
                return status;
            }
        });
    }

})();