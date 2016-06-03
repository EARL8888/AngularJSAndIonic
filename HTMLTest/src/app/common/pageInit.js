angular.module('qjCommunity.common.pageInit', [])

.factory('pageInitService', ['$q','$http','$ionicLoading',
    function($q, $http,  $ionicLoading) {
        var pageInit = {};
        pageInit.pageInit = function(apis) {
            $ionicLoading.show();
            var data = [];
            for (var i = 0; i < apis.length; i++) {
                data[i] = (function() {
                    return $http.get(apis[i]); })();
            };
            return $q.all(data).finally(function() {
                $ionicLoading.hide();
            });
        };
        return pageInit;
    }
])