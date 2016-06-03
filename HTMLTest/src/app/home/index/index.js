angular.module('qjCommunity.home.index', [
    'ionic',
    'qjCommunity.home.index.mock',
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home/index', {
        url: '/home/index',
        controller: 'HomeIndexController',
        templateUrl: 'home/index/index.tpl.html',
        cache: false,//禁止缓存
        resolve: {
            resolvedData: ['$http', function($http) {
                return $http.get('/staffMessage/staffMessageList?pageIndex=1&pageSize=10');
            }]
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6"],//权限列表
    })
}])

.controller('HomeIndexController', ['$scope', '$http', 'resolvedData', '$state', '$ionicViewSwitcher', '$ionicTabsDelegate', '$ionicHistory', 'CurrentUserService', '$interval', '$ionicPopup',
    function($scope, $http, resolvedData, $state, $ionicViewSwitcher, $ionicTabsDelegate, $ionicHistory, CurrentUserService, $interval, $ionicPopup) {

        $scope.showTabBaoan = CurrentUserService.userSession().showTabBaoan;
        $scope.showTabBaojie = CurrentUserService.userSession().showTabBaojie;
        $scope.showTabWeixiu = CurrentUserService.userSession().showTabWeixiu;

        $scope.$on('$ionicView.enter', function() {
            $scope.currentTab = 'home/index';
            $ionicTabsDelegate.select(0);
        })

        $scope.$on('$ionicView.beforeLeave', function() {
            $interval.cancel(stop);
        })

        if (resolvedData != null) {
            $scope.data = resolvedData.data;
        }
        $scope.getOwner = function(owner) {
            return owner.replace("null", "")
        }

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
            return $scope.refresh('/staffMessage/staffMessageList?pageIndex=0&pageSize=10');
        };

        $scope.loadMore = function() {
            $http.get('/staffMessage/staffMessageList', {
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
        $scope.delete = function(index, messageTargetId) {
            showConfirm('确定要删除这条消息？', '确定', '取消', index, messageTargetId);
        };
        var showConfirm = function(template, leftText, rightText, index, messageTargetId) {
            var confirmPopup = $ionicPopup.confirm({
                template: template,
                okText: leftText,
                cancelText: rightText
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $http.delete('/staffMessage/DelMessage/' + messageTargetId).success(function(result) {
                        // showAlert('删除成功！', '确定', 2);
                        $scope.data.splice(index, 1);
                    }).error(function(msg) {
                        showAlert('删除失败：' + msg, '确定', 2);
                    });
                }
            });

        };
        
        //轮询
        stop = $interval(function() {
            $http.get('/staffMessage/staffMessageList?pageIndex=1&pageSize=10')
                .success(function(result) {
                    $scope.data = result;
                }).finally(function() {});
        }, 6000);
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