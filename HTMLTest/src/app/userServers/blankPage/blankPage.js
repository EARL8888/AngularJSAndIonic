angular.module('qjCommunity.blankPage', [
    'ionic',
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('blankPage', {
        url: '/blankPage',
        controller: 'blankPageController',
        templateUrl: 'userServers/blankPage/blankPage.tpl.html',
        authorizedRuleType: ["1", "2", "3", "5", "6", "4"],
    })
}])

.controller('blankPageController', ['$scope', '$http', '$ionicListDelegate', '$ionicHistory',
    function($scope, $http, $ionicListDelegate, $ionicHistory) {}
])