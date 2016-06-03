angular.module('qjCommunity.app', [
    'maxrocky.framework',
    'qjCommunity.common',
    'qjCommunity.app.config',
    'ionic',
    'qjCommunity.templates',
    'qjCommunity.home',
    'qjCommunity.userServers',
    "qjCommunity.login",
    'qjCommunity.app.mock'
])

.run(['$rootScope', 'CurrentUserService',
    function($rootScope, CurrentUserService, $ionicLoading, $httpBackend) {
        $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {//每一次切换页面都会激发该方法
            CurrentUserService.usrAuth(evt, toState, toParams, fromState, fromParams);//当前页面权限判断
        });
        $rootScope.$on('tokenBug', function(event, mass) {
            CurrentUserService.tokenBug(event, mass);
        });
    }
])

.controller('AppController', ['$scope', '$ionicPopup', '$ionicHistory', 'MrDevice', '$http', 'SaveVersionService', function($scope, $ionicPopup, $ionicHistory, MrDevice, $http, SaveVersionService) {
    $scope.myGoBack = function() {
        $ionicHistory.goBack();
    }
    var device = MrDevice.getDevice();
    if (!!device) {
        platform = device.platform;
    } else {
        platform = "WEB";
    }
    if (platform == 'iOS') {
        $http.get('/workbench/staffVersion/1')
            .then(
                function(message) {
                    var parmars = {
                        "appVersionId": message.data.appVersionId,
                        "appVersionType": message.data.appVersionType,
                        "appVersion": message.data.appVersion,
                        "appVersionStatus": message.data.appVersionStatus,
                        "downUrl": message.data.downUrl,
                        "appVersionName": message.data.appVersionName,
                        "appRemark": message.data.appRemark,
                        "userType": message.data.userType,
                        "sign": "1"
                    }
                    MRUpdateApp.upadteAppVersion(function success(message) {

                        SaveVersionService.addVersion(message);

                    }, function failed(message) {
                        SaveVersionService.addVersion(1.0);
                    }, parmars);
                },
                function(msg) {}
            );
    } else if (platform == 'Android') {
        $http.get('/workbench/staffVersion/2')
            .then(
                function(message) {
                    var parmars = {
                        "appVersionId": message.data.appVersionId,
                        "appVersionType": message.data.appVersionType,
                        "appVersion": message.data.appVersion,
                        "appVersionStatus": message.data.appVersionStatus,
                        "downUrl": message.data.downUrl,
                        "appVersionName": message.data.appVersionName,
                        "appRemark": message.data.appRemark,
                        "userType": message.data.userType,
                        "sign": "1"
                    }
                    MRUpdateApp.upadteAppVersion(function success(message) {
                        SaveVersionService.addVersion(message);

                    }, function failed(message) {}, parmars);
                },
                function(msg) {
                    //++++++++++++++++++++++++要去掉
                    var parmars = {}
                    MRUpdateApp.upadteAppVersion(function success(message) {
                        // alert("测试缓存");
                        SaveVersionService.addVersion("1.0");

                    }, function failed(message) {}, parmars);

                }
            );
    };
}])