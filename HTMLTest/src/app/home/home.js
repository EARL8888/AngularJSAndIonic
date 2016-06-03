angular.module('qjCommunity.home', [
    'ionic',
    'qjCommunity.home.index',
    'qjCommunity.home.workOrder',
    'qjCommunity.home.visivorPassage',
    'qjCommunity.home.outTape',
    'qjCommunity.home.mineWork'
])

.controller('HomeTabController', ['$scope', '$http', '$state', '$ionicViewSwitcher', '$ionicHistory',
    function($scope, $http, $state, $ionicViewSwitcher, $ionicHistory) {

        $scope.getContentTpl = function() {
            return $scope.currentTab + '/content.tpl.html';
        }
        $scope.isActived = function(tabName) {
            return tabName == $scope.currentTab;
        }
        $scope.goTab = function(tabName) {
            if (tabName != $scope.currentTab) {
                $ionicViewSwitcher.nextDirection('none');
                $ionicHistory.nextViewOptions({ historyRoot: true });
                $ionicHistory.clearHistory();
                $state.go(tabName, {}, {
                    location: 'replace'
                });
            }
        }
    }
])