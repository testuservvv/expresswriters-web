(function ($http, $scope, $location)
{
    'use strict';
    angular
        .module('app.sample')
        .controller('jobdetailController', jobdetailController);

    /** @ngInject */
    function jobdetailController(SampleData, $http, $scope, $location)
    {
       
        var id = $scope.$root.id;
        if (id != undefined && id != "") {
            var url = window.localStorage['APIURL'];
            //////////
            //Get Job detail
            $http.get(url + 'jobs/id/' + id).success(function (data, status) {

                $scope.user = data.user;
                console.log($scope.user);
            }).error(function () {

                console.log('error');
            });


            $scope.apply = function (jobid, testid, testtitle) {
                
                var chk = window.localStorage['storageName'];
                if (chk != undefined && chk != "") {
                   
                    console.log(testid);
                    testtitle = testtitle.replace(" ", "-");
                    $scope.$root.applyid = testid;
                    $scope.$root.applyjobid = jobid;
                    $location.path('Jobs/' + testtitle + "-test");
                }
                else {
                    
                    $location.path('register');
                }
            }
        }
        else {
            $location.path('Careers');
            
        }

    }
})();
