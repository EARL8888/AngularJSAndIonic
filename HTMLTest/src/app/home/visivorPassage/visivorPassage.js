angular.module('qjCommunity.home.visivorPassage', [
        'ionic',
        'qjCommunity.home.visivorPassage.mock',
        'qjCommunity.common.cordova'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home/visivorPassage', {
            url: '/home/visivorPassage',
            controller: 'visivorPassageController',
            templateUrl: 'home/visivorPassage/visivorPassage.tpl.html',
            cache: 'false',
            resolve: {
                resolvedData: ['$http', function($http) {
                    return $http.get('/visitor/visitorInfos');
                }],
            },
            authorizedRuleType: ["1", "2", "3", "4", "5", "6"],

        })
    }])

.controller('visivorPassageController', ['$scope', '$http', 'resolvedData', '$ionicTabsDelegate', '$ionicHistory', 'MrDevice', '$ionicPopup', 'MrBarcodeScanner', 'CurrentUserService',
    function($scope, $http, resolvedData, $ionicTabsDelegate, $ionicHistory, MrDevice, $ionicPopup, MrBarcodeScanner, CurrentUserService) {

        $scope.showTabBaoan = CurrentUserService.userSession().showTabBaoan;
        $scope.showTabBaojie = CurrentUserService.userSession().showTabBaojie;
        $scope.showTabWeixiu = CurrentUserService.userSession().showTabWeixiu;

        $scope.$on('$ionicView.enter', function() {
            $scope.currentTab = 'home/visivorPassage';
            $ionicTabsDelegate.select(2);
        })
        if (resolvedData != null) {
            $scope.data = resolvedData.data;
        };
        $scope.showContent = false;
        $scope.barcode = function() {
            var device = MrDevice.getDevice();
            var platform = "WEB";
            var phoneUUID = "phoneUUID";
            if (!!device) {
                platform = device.platform;
                phoneUUID = device.uuid;
            }
            if (platform == 'iOS') {
                var str = "";
                ScannerPlugin.starScannerPlugin(function(dataShow) {
                    $scope.showContent = true;
                    $scope.data = eval("(" + dataShow + ")");
                    $scope.$digest();
                }, function(error) {
                    showConfirm('sorry', '请重新扫描', 2);
                }, str);

            } else {
                MrBarcodeScanner
                    .scan()
                    .then(function(barcodeData) {
                        if (barcodeData.text != "") {
                            $scope.showContent = true;
                            $scope.data = eval("(" + barcodeData.text + ")");
                        };
                    }, function(error) {
                        showConfirm('sorry', '请重新扫描', 2);
                    });
            }

        }

        $scope.release = function() {
                var params = {
                    "id": $scope.data.id
                };
                $http.post('/visitor/confirmation', params)
                    .then(
                        function(result) {
                            $scope.showContent = false;
                            showConfirm('确定', "操作成功", 1);
                        },
                        function(msg) {
                            showConfirm('确定', "操作失败", 2);
                        }
                    );
            }
            //弹出框
        var showConfirm = function(okText, template, num) {
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