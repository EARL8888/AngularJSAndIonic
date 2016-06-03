angular.module('qjCommunity.home.workOrder', [
        'ionic',
        'qjCommunity.home.workOrder.mock',
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home/workOrder', {
            url: '/home/workOrder',
            controller: 'workOrderController',
            templateUrl: 'home/workOrder/workOrder.tpl.html',
            cache: 'false',
            resolve: {
                resolvedData: ['$http', function($http) {
                    return $http.get('/workOrder/workOrderList?type=1&pageIndex=1&pageSize=10');
                }],
                resolvedDataTwo: ['$http', function($http) {
                    return $http.get('/workOrder/workOrderList?type=2&pageIndex=1&pageSize=10');
                }]
            },
            authorizedRuleType: ["1", "2", "3", "4", "5", "6"],

        })
    }])

.controller('workOrderController', ['$scope', '$http', 'resolvedData', 'resolvedDataTwo', '$state', '$ionicViewSwitcher', '$ionicTabsDelegate', '$ionicHistory', '$ionicPopup', 'CurrentUserService', 'MrDevice',
        function($scope, $http, resolvedData, resolvedDataTwo, $state, $ionicViewSwitcher, $ionicTabsDelegate, $ionicHistory, $ionicPopup, CurrentUserService, MrDevice) {

            $scope.showTabBaoan = CurrentUserService.userSession().showTabBaoan;
            $scope.showTabBaojie = CurrentUserService.userSession().showTabBaojie;
            $scope.showTabWeixiu = CurrentUserService.userSession().showTabWeixiu;
            $scope.showSend = CurrentUserService.userSession().showSend;

            $scope.$on('$ionicView.enter', function() {
                $scope.currentTab = 'home/workOrder';
                $ionicTabsDelegate.select(1);
            })

            var platform = "WEB";
            $scope.showTabStyle = "false";
            var deviceInfo = MrDevice.getDevice();
            if (!!deviceInfo) {
                platform = deviceInfo.platform;
            } else {
                platform = "WEB";
            }
            if (platform == 'WEB') {
                $scope.showTabStyle = true;
            } else if (platform == 'iOS') {
                $scope.showTabStyle = false;
            } else if (platform == 'Android') {
                $scope.showTabStyle = true;
            }

            if (resolvedData != null) {
                $scope.data = resolvedData.data;
            };
            if (resolvedDataTwo != null) {
                $scope.dataTwo = resolvedDataTwo.data;
            };
            $scope.sortShow = 0;
            $scope.changeItem = function(numType) {
                $scope.sortShow = numType;
            };
            var hasNextPage = function(data) {
                return data ? data.length > 0 : false;
            }
            $scope.pageInfo = {
                hasNextPage: hasNextPage($scope.data),
                pageNum: 1
            };
            $scope.pageInfoTwo = {
                hasNextPage: hasNextPage($scope.dataTwo),
                pageNum: 1
            };

            $scope.refresh = function(url) {
                    $http.get(url)
                        .success(function(result) {
                            $scope.data = result;
                            $scope.pageInfo.pageNum = 1;
                            $scope.pageInfo.hasNextPage = hasNextPage($scope.data);
                        })
                        .finally(function() {
                            // 停止广播ion-refresher
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                }
                //下拉刷新待分配
            $scope.doRefresh = function() {
                return $scope.refresh('/workOrder/workOrderList?type=1&pageIndex=0&pageSize=10');
            };

            $scope.loadMore = function() {
                var type = 1;
                $http.get('/workOrder/workOrderList', {
                    params: {
                        type: type,
                        pageIndex: $scope.pageInfo.pageNum + 1,
                        pageSize: 10
                    }
                }).success(function(result) {
                    $scope.pageInfo.pageNum += 1;
                    $scope.pageInfo.hasNextPage = hasNextPage(result);
                    if (result.length) {
                        for (var i = 0; i < result.length; i++) {
                            $scope.data.push(result[i]);
                        }
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }).finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            $scope.refreshTwo = function(url) {
                    $http.get(url)
                        .success(function(result) {
                            $scope.dataTwo = result;
                            $scope.pageInfoTwo.pageNum = 1;
                            $scope.pageInfoTwo.hasNextPage = hasNextPage($scope.data);
                        })
                        .finally(function() {
                            // 停止广播ion-refresher
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                }
                //下拉刷新进行中
            $scope.doRefreshTwo = function() {
                return $scope.refreshTwo('/workOrder/workOrderList?type=2&pageIndex=0&pageSize=10');

            };


            $scope.loadMoreTwo = function() {
                var type = 2;
                $http.get('/workOrder/workOrderList', {
                    params: {
                        type: type,
                        pageIndex: $scope.pageInfoTwo.pageNum + 1,
                        pageSize: 10
                    }
                }).success(function(result) {
                    $scope.pageInfoTwo.pageNum += 1;
                    $scope.pageInfoTwo.hasNextPage = hasNextPage(result);
                    if (result.length) {
                        for (var i = 0; i < result.length; i++) {
                            $scope.dataTwo.push(result[i]);
                        }
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }).finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };
        }
    ])
    //字数控制过滤器
    .filter('characters', function() {
        return function(input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                } else {
                    while (input.charAt(input.length - 1) === ' ') {
                        input = input.substr(0, input.length - 1);
                    }
                }
                return input + '…';
            }
            return input;
        };
    })