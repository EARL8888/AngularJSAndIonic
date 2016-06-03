angular.module('qjCommunity.home.cleanWorkOrder', [
        'ionic',
        'qjCommunity.home.cleanWorkOrder.mock',
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home/cleanWorkOrder', {
            url: '/home/cleanWorkOrder',
            controller: 'cleanWorkOrderController',
            templateUrl: 'home/cleanWorkOrder/cleanWorkOrder.tpl.html',
            cache: 'false',
            resolve: {
                resolvedData: ['$http', function($http) {
                    return $http.get('/workOrder/workOrderList?pageIndex=0&pageSize=10');
                }]
            },
            authorizedRuleType: ["1", "2", "3", "4", "5", "6"],

        })
    }])

.controller('cleanWorkOrderController', ['$scope', '$http', 'resolvedData', '$state', '$ionicViewSwitcher', '$ionicTabsDelegate', '$ionicHistory', '$ionicPopup', 'CurrentUserService',
        function($scope, $http, resolvedData, $state, $ionicViewSwitcher, $ionicTabsDelegate, $ionicHistory, $ionicPopup, CurrentUserService) {

            $scope.showTabBaoan = CurrentUserService.userSession().showTabBaoan;
            $scope.showTabBaojie = CurrentUserService.userSession().showTabBaojie;
            $scope.showTabWeixiu = CurrentUserService.userSession().showTabWeixiu;
            $scope.showSend = CurrentUserService.userSession().showSend;

            $scope.$on('$ionicView.enter', function() {
                $scope.currentTab = 'home/cleanWorkOrder';
                $ionicTabsDelegate.select(1);
            })
            if (resolvedData != null) {
                $scope.data = resolvedData.data;
            };

            $scope.sortShow = 1;
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
                return $scope.refresh('/workOrder/workOrderList?pageIndex=0&pageSize=10');
            };

            $scope.loadMore = function() {
                $http.get('/workOrder/workOrderList', {
                    params: {
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