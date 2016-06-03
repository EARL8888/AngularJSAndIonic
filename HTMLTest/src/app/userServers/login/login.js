angular.module('qjCommunity.login', [
    'ionic',
    'qjCommunity.login.mock'
])

.controller('LoginController', ['$ionicHistory', '$http', '$ionicModal', '$rootScope', '$scope', '$ionicPopup', 'CurrentUserService', '$state', '$stateParams', '$ionicHistory',
    function($ionicHistory, $http, $ionicModal, $rootScope, $scope, $ionicPopup, CurrentUserService, $state, $stateParams, $ionicHistory) {
        $scope.pageShow = {
            login: true,
            guestLogin: false,
            register: false,
            forgotPwd: false
        };
        $scope.credentials = {
            username: "",
            password: "",
            form: "Android",
            phoneUUID: "uuid"
        }

        $scope.guestLoginMsg = {
            phoneNum: '',
            password: ''
        };

        $scope.showConfirm = function(title, template, rightText, leftText) {
            var confirmPopup = $ionicPopup.confirm({
                title: title,
                okText: leftText,
                template: template,
                cancelText: rightText
            });

            confirmPopup.then(function(res) {
                if (res) { //
                } else {}
            });
        };
        $scope.login = function(credentials, formName) {
            if (formName.$valid) {
                CurrentUserService.login(credentials)
                    .then(function(user) {
                        if (user) {
                            var rule = $scope.modal.nextState.toState.authorizedRuleType;//此方法应放到回调里，否则modal找不到
                            var isHasAuth = CurrentUserService.contains(rule, user.data.roleId);
                            if (isHasAuth) {
                                $scope.modal.remove();
                                if ($scope.modal.nextState.toState.name == "blankPage") {
                                    $ionicHistory.clearCache().then(function() {
                                        $state.go("home/index", {}, { location: 'replace' });
                                    });
                                    $ionicHistory.nextViewOptions({
                                        disableAnimate: true,
                                        disableBack: true
                                    });
                                } else {
                                    $ionicHistory.clearCache().then(function() {
                                        $state.go($scope.modal.nextState.toState, $scope.modal.nextState.toParams);
                                    });
                                };

                            };
                        } else {
                            formName.$submitted = false;
                        };
                    }, function() {});
            } else {
                $scope.showAlert('请输入用户名或密码', '请输入用户名或密码', '确认');
                formName.$submitted = false;
            };
        }

        $scope.showAlert = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {});
        };
        $scope.toLogin = function() {
            $scope.pageShow = {
                login: true,
                guestLogin: false,
                register: false,
                forgotPwd: false
            };
        };
        $scope.toGuestLogin = function() {
            $scope.pageShow = {
                login: false,
                guestLogin: true,
                register: false,
                forgotPwd: false
            };
        };
        $scope.toReg = function() {
            $scope.pageShow = {
                login: false,
                guestLogin: false,
                register: true,
                forgotPwd: false
            };
        };

        $scope.toForgotPwd = function() {
            $scope.pageShow = {
                login: false,
                guestLogin: false,
                register: false,
                forgotPwd: true
            };
        };

        $scope.getContentTpl = function(currentTab) {
            return currentTab + '.tpl.html';
        };
    }
])