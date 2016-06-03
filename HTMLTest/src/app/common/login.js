angular.module('qjCommunity.common.login', [])
    .service('Session', [function() {
        this.userInfoData = null;
        this.validTime = null;
        this.showTabBaoan = false;
        this.showTabBaojie = false;
        this.showTabWeixiu = false;
        this.showSend = false;
        this.create = function(userInfoData, validTime) {
            this.userInfoData = userInfoData;
            this.validTime = validTime;
            if (userInfoData.roleId == 1 || userInfoData.roleId == 4) {
                this.showTabBaoan = true;
            } else if (userInfoData.roleId == 5 || userInfoData.roleId == 2) {
                this.showTabBaojie = true;
            } else if (userInfoData.roleId == 3 || userInfoData.roleId == 6) {
                this.showTabWeixiu = true;
            }

            if (userInfoData.roleId == 1 || userInfoData.roleId == 2 || userInfoData.roleId == 3) {
                this.showSend = true;
            };
        };
        this.destroy = function() {
            this.userInfoData = null;

            this.validTime = null;
        }
        return this;
    }])

.factory('CurrentUserService', ['$rootScope', '$timeout', '$ionicHistory', '$http', 'Session', '$filter', '$state', '$ionicModal', '$ionicPopup', 'SavePopShowFristService',
    function($rootScope, $timeout, $ionicHistory, $http, Session, $filter, $state, $ionicModal, $ionicPopup, SavePopShowFristService) {
        var currentUser = {};
        currentUser.login = function(credentials) {
            return $http
                .post('/user/loginForStaff', credentials)
                .then(function(res) {
                        SavePopShowFristService.setPopShowBlr(true);
                        var validTime = parseInt($filter('date')(new Date(), 'yyyyMMdd')) + 2;
                        Session.create(res.data, validTime);
                        return res;
                    },
                    function(data) {
                        var alertPopup = $ionicPopup.alert({
                            title: data.data || data,
                            okText: '取消',
                            template: data.data || data
                        });
                    });
        };
        currentUser.userSession = function() {
            return Session;
        };
        currentUser.destroyUserSession = function() {
            Session.destroy();
            return Session;
        };
        currentUser.contains = function(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        };
        currentUser.usrAuth = function(evt, toState, toParams, fromState, fromParams) {
            var rule = toState.authorizedRuleType;//获取页面权限
            pageAuth(rule, evt, toState, toParams);
            if (!Session.userInfoData) {
                $http.get('workOrder/getUserRole').then(
                    function(data) { //有cookie 更新用户信息
                        usr = currentUser.updateSession(data.data).userInfoData.roleId;
                        blankPageToHomeIndex(toState);
                    },
                    function() {
                        if (!!rule) { //没有cookie 重新登录
                            if (!Session.userInfoData) {
                                $ionicModal.fromTemplateUrl('userServers/login/login.tpl.html', {//弹出登录页
                                        nextState: {
                                            toState: toState,
                                            toParams: toParams
                                        },
                                        backdropClickToClose: false,
                                        animation: 'slide-in-right'
                                    })
                                    .then(function(modal) {
                                        modal.show();//显示
                                    });
                                return;
                            };
                        };

                    });
            } else {
                blankPageToHomeIndex(toState);
            };
        };
        var pageAuth = function(rule, evt, toState, toParams) {
            var showConfirm = function(template, okText, num) {
                var alertPopup = $ionicPopup.alert({
                    template: template,
                    okText: okText
                });
                alertPopup.then(function(res) {
                    if (res && num == 1) { $ionicHistory.goBack(); }
                });
            };
            if (!Session.userInfoData) return;
            var usr = Session.userInfoData.roleId;
            var isHasAuth = currentUser.contains(rule, usr);
            if (!isHasAuth) {
                evt.preventDefault();
                showConfirm('权限不足', '确定', '2');
            } else {}
        };
        var blankPageToHomeIndex = function(toState) {
            if (toState.name == "blankPage") {
                $state.go("home/index", {}, { location: 'replace' });
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
            }
        };
        currentUser.tokenBug = function(event, mass) {
            if (SavePopShowFristService.getPopShowBlr().popShowBlr) {
                if ($state.current.name != "blankPage") {
                    if ($rootScope.tokenBugThenFn) {
                        $timeout.cancel($rootScope.tokenBugThenFn);
                    }
                    $rootScope.tokenBugThenFn = $timeout(function() {
                        SavePopShowFristService.setPopShowBlr(false);
                        $rootScope.tokenBugThenFn = null;
                        showAlert("提示", mass, "确定");
                    }, 50);
                }
            }
        };
        var showAlert = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                currentUser.destroyUserSession();
                if (isApp) {
                    MRClearCache.finshCache(function success() {}, function failed(message) {});
                } else {
                    $state.go("blankPage", {}, { location: 'replace' });
                }
            });
        };
        currentUser.updateSession = function(data) {
            var validTime = parseInt($filter('date')(new Date(), 'yyyyMMdd')) + 2;
            Session.create(data, validTime);
            return Session;
        };
        return currentUser;
    }
])