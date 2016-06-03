angular.module('qjCommunity.home.mineWork', [
    'ionic',
    'qjCommunity.home.mineWork.mock',
    'qjCommunity.common.cordova'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home/mineWork', {
        url: '/home/mineWork',
        controller: 'MineWorkController',
        templateUrl: 'home/mineWork/mineWork.tpl.html',
        cache: false,
        resolve: {
            resolvedData: ['$http', function($http) {
                return $http.get('/workbench/workbench/1');
            }]
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    })
}])

.controller('MineWorkController', ['$state', '$ionicHistory', '$scope', '$http', 'resolvedData', '$ionicTabsDelegate', '$ionicPopup', 'CurrentUserService', 'MrDevice', 'SaveVersionService', 'SavePopShowFristService',
    function($state, $ionicHistory, $scope, $http, resolvedData, $ionicTabsDelegate, $ionicPopup, CurrentUserService, MrDevice, SaveVersionService, SavePopShowFristService) {

        $scope.showTabBaoan = CurrentUserService.userSession().showTabBaoan;
        $scope.showTabBaojie = CurrentUserService.userSession().showTabBaojie;
        $scope.showTabWeixiu = CurrentUserService.userSession().showTabWeixiu;

        var deviceInfo = MrDevice.getDevice();
        if (!!deviceInfo) {
            platform = deviceInfo.platform;
        } else {
            platform = "WEB";
        }

        $scope.$on('$ionicView.enter', function() {
            $scope.currentTab = 'home/mineWork';
            $ionicTabsDelegate.select(4);
        })
        $scope.data = resolvedData.data;
        $scope.changeNumber = function() {
            $scope.data.countPraise = 0;
        };


        $scope.version = SaveVersionService.getVersion().appVersion;

        $scope.dropOut = function() {
            showConfirmDis('确定要退出么？', '确定', '取消');
        };
        var showConfirmDis = function(template, leftText, rightText) {
            var confirmPopup = $ionicPopup.confirm({
                template: template,
                okText: leftText,
                cancelText: rightText
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $http.post('/user/exitForStaff').success(function(result) {
                        showAlert('退出成功', '确定', '1');
                    }).error(function(msg) {
                        showAlert('退出失败', '确定', '2');
                    });
                }
            });
        };
        $scope.checkVersion = function() {
            if (platform == 'iOS') {
                $http.get('/mineWorkbench/staffVersion/1')
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
                                "sign": "2"
                            }
                            MRUpdateApp.upadteAppVersion(function success(message) {}, function failed(message) {}, parmars);
                        },
                        function(msg) {
                            showConfirm("版本检测失败", '确定', 2);
                        }
                    );
            } else if (platform == 'Android') {
                $http.get('/mineWorkbench/staffVersion/2')
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
                                "sign": "2"
                            }
                            MRUpdateApp.upadteAppVersion(function success(message) {}, function failed(message) {}, parmars);
                        },
                        function(msg) {
                            showConfirm("版本检测失败", '确定', 2);
                        }
                    );
            } else if (platform == 'WEB') {
                showConfirm("请使用移动设备检测版本", '确定', 2);
            }
        }
        var showAlert = function(template, btnText, num) {
            var confirmPopup = $ionicPopup.alert({
                template: template,
                okText: btnText
            });
            confirmPopup.then(function(res) {
                if (res && 1 == num) {
                    SavePopShowFristService.setPopShowBlr(false);
                    CurrentUserService.destroyUserSession();
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache().then(function() {
                        if (isApp) {
                            MRClearCache.finshCache(function success() {}, function failed(message) {});
                        } else {
                            $state.go("blankPage", {}, { location: 'replace' });
                        }

                    });
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                }
            });
        };
        //弹出框
        var showConfirm = function(template, okText, num) {
            var confirmPopup = $ionicPopup.alert({
                template: template,
                okText: okText
            });
            confirmPopup.then(function(res) {
                if (res && num == 1) {
                    $ionicHistory.goBack();
                }
            });
        };
    }
])