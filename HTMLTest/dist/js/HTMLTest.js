angular.module('qjCommunity.app.config', [
    'ionic'
])

//contants
.constant('ApiBaseUrl', 'http://hxsq.hxsq2016.com:8080/')
    // .constant('ApiBaseUrl', 'http://172.16.1.19:8080/')
    // .constant('AppDefaultRootUrl', '/blankPage')
    .constant('AppDefaultRootUrl', '/home/index')
    .constant('HTTP_COMMON_ERROR_MESSAGE', '服务器请求返回错误!')

//configs
.config(['$ionicConfigProvider', function($ionicConfigProvider) {
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.navBar.positionPrimaryButtons('left')
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.icon('backBtn');
        $ionicConfigProvider.scrolling.jsScrolling(true);
        //防止ios滑跑
        $ionicConfigProvider.views.swipeBackEnabled(false);
    }])
    .config(['$urlRouterProvider', 'AppDefaultRootUrl', function($urlRouterProvider, AppDefaultRootUrl) {
        $urlRouterProvider.otherwise(AppDefaultRootUrl);
    }])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
angular.module('qjCommunity.app', [
    'maxrocky.framework',
    'qjCommunity.common',
    'qjCommunity.app.config',
    'ionic',
    'qjCommunity.templates',
    'qjCommunity.home',
    'qjCommunity.userServers',
    "qjCommunity.login",
    'qjCommunity.workOrderDetails',
    'qjCommunity.sendOrders',
    'qjCommunity.selectServiceman',
    'qjCommunity.wordOrderHistory',
    'qjCommunity.myPerformance',
    'qjCommunity.fitness',
    'qjCommunity.workNoticeDetails',
    'qjCommunity.otherNoticeDetails',
    'qjCommunity.myRota',
    'qjCommunity.visivorPassageHis',
    'qjCommunity.outTapeHis',
    'qjCommunity.outTapeDetails',
    'qjCommunity.app.mock'
])

.run(['$rootScope', 'CurrentUserService',
    function($rootScope, CurrentUserService, $ionicLoading, $httpBackend) {
        $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
            CurrentUserService.usrAuth(evt, toState, toParams, fromState, fromParams);
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
angular.module('qjCommunity.app.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenGET('/workbench/staffVersion/1').passThrough();
    $httpBackend.whenGET('/workbench/staffVersion/2').passThrough();
}])

angular.module('maxrocky.framework.directives',[
	'maxrocky.framework.directives.rem',
	'maxrocky.framework.directives.navBar',
	'maxrocky.framework.directives.goback'
])
angular.module('maxrocky.framework',[
	'maxrocky.framework.directives'
	// 'maxrocky.framework.swiper',
	// 'maxrocky.framework.iscroll'
])


angular.module('qjCommunity.fitness', [
    'ionic',
    'qjCommunity.fitness.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('fitness', {
        url: '/fitness',
        controller: 'fitnessController',
        templateUrl: 'fitness/fitness.tpl.html',
        resolve: {
            resolvedData: ['$http', function($http) {
                return $http.get('/say/findIsayComplaint?pageIndex=1&pageSize=10');
            }]
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6"],

    })
}])

.controller('fitnessController', ['$scope', '$http', 'resolvedData', '$state', '$ionicViewSwitcher', '$ionicHistory', '$ionicPopup',
        function($scope, $http, resolvedData, $state, $ionicViewSwitcher, $ionicHistory, $ionicPopup) {
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
            $scope.refreshTwo = function(url) {
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
                //下拉刷新进行中
            $scope.doRefreshTwo = function() {
                return $scope.refreshTwo('/say/findIsayComplaint?pageIndex=1&pageSize=10');

            };


            $scope.loadMoreTwo = function() {
                $http.get('/say/findIsayComplaint', {
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
angular.module('qjCommunity.fitness.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {
            currentPage: "2", //当前页
            totalPages: "5", //总页数
            wordOrderList: [{
                name: "孟老师",
                time: "2015-09-08",
                content: "工作认真,必须来个大大的赞",
                src: "../images/fitness/head.png",
            }, {
                name: "孟老师",
                time: "2015-09-08",
                content: "工作认真,必须来个大大的赞工作认真,必须来个大大的赞工作认真,必须来个大大的赞工作认真,必须来个大大的赞工作认真,必须来个大大的赞工作认真,必须来个大大的赞工作认真,必须来个大大的赞工作认真,必须来个大大的赞",
                src: "../images/fitness/head.png",
            }, ],
        };
        var result = mocksData.resetData(data);
        // $httpBackend.whenGET(/\/workOrder\/fitness(\?type=(\d)?&size=(\d)?&number=(\d)?)?/).passThrough();
        $httpBackend.whenGET(/\/workOrder\/fitness(\?type=(\d)?&size=(\d)?&number=(\d)?)?/).respond(result);

        var data = {
            currentPage: "2", //当前页
            totalPages: "5", //总页数
            wordOrderList: [{
                name: "泰森森",
                time: "2015-09-08",
                content: "服务太差了",
                src: "../images/fitness/head.png",
            }, {
                name: "孟老师",
                time: "2015-09-08",
                content: "服务太差了服务太差了服务太差了服务太差了",
                src: "../images/fitness/head.png",
            }, ],
        };
        var result = mocksData.resetData(data);
        // $httpBackend.whenGET(/\/workOrder\/fitness(\?type=(\d)?&size=(\d)?&number=(\d)?)?/).passThrough();
        $httpBackend.whenGET(/\/say\/findIsayComplaint(\?size=(\d)?&number=(\d)?)?/).passThrough();

        //以下是post
        $httpBackend.whenPOST('/workOrder/repairsContinue').passThrough();
        $httpBackend.whenPOST('/workOrder/repairsScramble').passThrough();
    }])
angular.module('qjCommunity.home', [
    'ionic',
    'qjCommunity.home.index',
    'qjCommunity.home.workOrder',
    'qjCommunity.home.index.workNotice',
    'qjCommunity.home.index.otherNotice',
    'qjCommunity.home.mineWork',
    'qjCommunity.home.outTape',
    'qjCommunity.home.visivorPassage',
    'qjCommunity.home.cleanWorkOrder'
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
angular.module('qjCommunity.myPerformance', [
    'ionic',
    'qjCommunity.myPerformance.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('myPerformance', {
        url: '/myPerformance',
        controller: 'myPerformanceController',
        templateUrl: 'myPerformance/myPerformance.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', function($http) { //0:完成的报修，1:未完成的报修
                return $http.get('/propertyRepair/findProperRepositoryInfo?types=0&pageIndex=1&pageSize=10');
            }],
            resolvedDataTwo: ['$http', function($http) {
                return $http.get('/propertyRepair/findProperRepositoryInfo?types=1&pageIndex=1&pageSize=10');
            }]
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6"],

    })
}])

.controller('myPerformanceController', ['$scope', '$http', 'resolvedData', 'resolvedDataTwo', '$state', '$ionicViewSwitcher', '$ionicHistory', '$ionicPopup',
        function($scope, $http, resolvedData, resolvedDataTwo, $state, $ionicViewSwitcher, $ionicHistory, $ionicPopup) {
            if (resolvedData != null) {
                $scope.data = resolvedData.data;
            };
            if (resolvedDataTwo != null) {
                $scope.dataTwo = resolvedDataTwo.data;
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
                return $scope.refresh('/propertyRepair/findProperRepositoryInfo?types=0&pageIndex=1&pageSize=10');
            };

            $scope.loadMore = function() {
                var types = 0;
                $http.get('/propertyRepair/findProperRepositoryInfo', {
                    params: {
                        types: types,
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
                            $scope.pageInfo.pageNum = 1;
                            $scope.pageInfo.hasNextPage = hasNextPage($scope.data);
                        })
                        .finally(function() {
                            // 停止广播ion-refresher
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                }
                //下拉刷新进行中
            $scope.doRefreshTwo = function() {
                return $scope.refreshTwo('/propertyRepair/findProperRepositoryInfo?types=1&pageIndex=1&pageSize=10');

            };


            $scope.loadMoreTwo = function() {
                var types = 1;
                $http.get('/propertyRepair/findProperRepositoryInfo', {
                    params: {
                        types: types,
                        pageIndex: $scope.pageInfo.pageNum + 1,
                        pageSize: 10
                    }
                }).success(function(result) {
                    $scope.pageInfo.pageNum += 1;
                    $scope.pageInfo.hasNextPage = hasNextPage(result);
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
angular.module('qjCommunity.myPerformance.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {
            wordOrderList: [{
                type: '公区', 
                id: '201508119271', //报修单id
                owner: '唐小包 12345679', //业主信息(姓名、电话)
                content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
                createDate: "2015-10-13  12:39",
                address: "南京市建邺区万达广场8-A-3-1102",
                status: "0",// 当前状态
            }, {
                type: '户内', 
                id: '201508119273', //报修单id
                owner: '唐小包 12345679', //业主信息(姓名、电话)
                content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
                createDate: "2015-10-13  12:39",
                address: "南京市建邺区万达广场8-A-3-1102",
                status: "0",
            }, ],
        };
        var result = mocksData.resetData(data);
        // $httpBackend.whenGET(/\/workOrder\/myPerformance(\?type=(\d)?&size=(\d)?&number=(\d)?)?/).passThrough();
        $httpBackend.whenGET(/\/propertyRepair\/findProperRepositoryInfo(\?type=(\d)?&pageIndex=(\d)?&pageSize=(\d)?)?/).passThrough();
        var data = {
            wordOrderListTwo: [{
                type: '户内', 
                id: '201508119272', //报修单id
                owner: '唐小包 12345679', //业主信息(姓名、电话)
                content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
                createDate: "2015-10-13  12:39",
                address: "南京市建邺区万达广场8-A-3-1102",
                status: "0",
            }, {
                type: '公区', 
                id: '201508119273', //报修单id
                owner: '唐小包 12345679', //业主信息(姓名、电话)
                content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
                createDate: "2015-10-13  12:39",
                address: "南京市建邺区万达广场8-A-3-1102",
                status: "0",
            }, ],
        };
        var result = mocksData.resetData(data);
        // $httpBackend.whenGET(/\/workOrder\/myPerformance(\?type=(\d)?&size=(\d)?&number=(\d)?)?/).passThrough();
        $httpBackend.whenGET(/\/workOrderTwo\/myPerformanceTwo(\?type=(\d)?&size=(\d)?&number=(\d)?)?/).respond(result);

        //以下是post
        $httpBackend.whenPOST('/workOrder/repairsContinue').passThrough();
        $httpBackend.whenPOST('/workOrder/repairsScramble').passThrough();
    }])
angular.module('qjCommunity.myRota', [
    'ionic',
    'ionic-datepicker',
    'qjCommunity.myRota.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('myRota', {
        url: '/myRota',
        controller: 'myRotaController',
        templateUrl: 'myRota/myRota.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', function($http) {
                return $http.get('/user/userDutyOneDay/today'); //多人一天
            }],
            resolvedDataTwo: ['$http', function($http) {
                return $http.get('/user/userDuty/thisMonth'); //一人多天
            }],
            resolvedDataThree: ['$http', function($http) {
                return $http.get('/user/getAttendStatusToday'); //当前状态（是否签到）
            }]
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6"],

    })
}])

.controller('myRotaController', ['$scope', '$http', 'resolvedData', 'resolvedDataTwo', '$ionicPopup', '$ionicHistory', '$filter', 'ionicDatePicker', 'CurrentUserService', 'resolvedDataThree',

    function($scope, $http, resolvedData, resolvedDataTwo, $ionicPopup, $ionicHistory, $filter, ionicDatePicker, CurrentUserService, resolvedDataThree) {

        $scope.showSend = CurrentUserService.userSession().showSend;
        $scope.staffId = CurrentUserService.userSession().userInfoData.staffId;

        if (resolvedData != null) {
            $scope.data = resolvedData.data;
        }

        if (resolvedDataTwo != null) {
            $scope.dataTwo = resolvedDataTwo.data;
        }

        if (resolvedDataThree != null) {
            $scope.dataThree = resolvedDataThree.data;
        }

        // $scope.dataTwo.statusOne = '';
        $scope.sortShow = 0;
        $scope.changeItem = function(numType) {
            $scope.sortShow = numType;
        };

        var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];

        $scope.selectedDate1 = $filter('date')(new Date(), "yyyy-MM-dd");

        $scope.openDatePicker = function(val) {
            var ipObj1 = {
                callback: function(val) { //Mandatory
                    $scope.selectedDate1 = $filter('date')(val, "yyyy-MM-dd"); //new Date(val);
                },
                from: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 365),
                // to: new Date(),
                inputDate: new Date(),
                mondayFirst: true,
                weeksList: ["日", "一", "二", "三", "四", "五", "六"],
                monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                closeOnSelect: true,
                templateType: 'popup',
                dateFormat: "yyyy-MM-dd",
                closeLabel: '关闭'
            };
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.registration = function() {
            if ($scope.sortShow == 0) {
                $http.get('/user/userDutyOneDay/' + $scope.selectedDate1).then(
                    function(result) {
                        $scope.data = result.data;
                        if (result.data.length != 0) {
                            showConfirm("操作成功", '确定', 2);
                        } else {
                            showConfirm("暂无数据", '确定', 2);
                        }
                    },
                    function(msg) {
                        showConfirm("操作失败", '确定', 2);
                    }
                );
            } else if ($scope.sortShow == 1) {
                $http.get('/user/userDuty/' + $scope.selectedDate1).then(
                    function(result) {
                        $scope.dataTwo = result.data;
                        if (result.data.length != 0) {
                            showConfirm("操作成功", '确定', 2);
                        } else {
                            showConfirm("暂无数据", '确定', 2);
                        }
                    },
                    function(msg) {
                        showConfirm("操作失败", '确定', 2);
                    }
                );
            }
        }

        $scope.updateState = function(selectd, item) {
            if (item.staffId) {
                $scope.staffId = item.staffId;
            } else {
                $scope.staffId = CurrentUserService.userSession().userInfoData.staffId;
                var data = $scope.selectedDate1;
                data = data.substring(0, data.length - 2);
                data += item.strSignInDate;

                $scope.selectedDate1 = data;
            }
            var status = '';
            if (selectd == "正常") {
                status = 1;
            } else if (selectd == "调休") {
                status = 2;
            } else if (selectd == "请假") {
                status = 3;
            } else if (selectd == "旷工") {
                status = 4;
            }
            $http.get('/user/userDutyUpdate/' + status + '_' + $scope.staffId + '_' + $scope.selectedDate1).then(
                function(result) {
                    $scope.registration();
                },
                function(msg) {
                    showConfirm("操作失败", '确定', 2);
                }
            );
        }

        $scope.signIn = function() {
            $http.get('/user/userDutyOnOff/' + CurrentUserService.userSession().userInfoData.staffId).then(
                function(result) {
                    $http.get('/user/getAttendStatusToday').then(
                        function(result) {
                            $scope.dataThree = result.data;
                        },
                        function(msg) {}
                    );
                    showConfirm("操作成功", '确定', 2);
                },
                function(msg) {
                    showConfirm("操作失败", '确定', 2);
                }
            );
        }

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
angular.module('qjCommunity.myRota.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {
            state: "1", //未签到
            registrationList: [{
                name: "刘东",
                stuffTimeAm: "09:11",
                stuffTimePm: "09:11",
                signTimeAm: "09:11",
                signTimepm: "09:11",
                selectd: "",
                status: "正常"
            }, {
                name: "李连杰",
                stuffTimeAm: "12:12",
                stuffTimePm: "09:11",
                signTimeAm: "09:11",
                signTimepm: "09:11",
                selectd: "",
                status: "正常"
            }, {
                name: "刘浩伟",
                stuffTimeAm: "13:00",
                stuffTimePm: "09:11",
                signTimeAm: "09:11",
                signTimepm: "09:11",
                selectd: "",
                status: "旷工"
            }, {
                name: "刘浩伟",
                stuffTimeAm: "14:00",
                stuffTimePm: "09:11",
                signTimeAm: "09:11",
                signTimepm: "09:11",
                selectd: "",
                status: "调休"
            }]
        };
        var result = mocksData.resetData(data);
        // $httpBackend.whenGET(/\/workOrder\/myRota\/www\/wwww/).respond(result);
        $httpBackend.whenGET(/\/user\/userDutyOneDay/).passThrough();
        $httpBackend.whenGET(/\/user\/userDutyOneDay\/today/).passThrough();
        var data = {
            state: "2", //未签到
            registrationListTwo: [{
                date: "1",
                stuffTimeAm: "09:11",
                stuffTimePm: "09:11",
                signTimeAm: "09:11",
                signTimepm: "09:11",
                status: "旷工"
            }, {
                date: "2",
                stuffTimeAm: "12:12",
                stuffTimePm: "09:11",
                signTimeAm: "09:11",
                signTimepm: "09:11",
                status: "旷工"
            }, {
                date: "3",
                stuffTimeAm: "13:00",
                stuffTimePm: "09:11",
                signTimeAm: "09:11",
                signTimepm: "09:11",
                status: "旷工"
            }, {
                date: "4",
                stuffTimeAm: "14:00",
                stuffTimePm: "09:11",
                signTimeAm: "09:11",
                signTimepm: "09:11",
                status: "调休"
            }]
        };
        var result = mocksData.resetData(data);
        // $httpBackend.whenGET(/\/workOrder\/www\/wwww/).respond(result);
        $httpBackend.whenGET(/\/user\/userDuty\/thisMonth/).passThrough();
        $httpBackend.whenGET(/\/user\/userDuty/).passThrough();
        $httpBackend.whenGET(/\/user\/userDutyOnOff/).passThrough();
        $httpBackend.whenGET(/\/user\/getAttendStatusToday/).passThrough();
        $httpBackend.whenGET(/\/user\/userDutyUpdate\/d_\/[a-fA-F0-9]{32,32}_\/d{4}-\d{1,2}-\d{1,2}/).passThrough();
    }])
angular.module('qjCommunity.otherNoticeDetails', [
    'ionic',
    'qjCommunity.otherNoticeDetails.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('otherNoticeDetails', {
        url: '/otherNoticeDetails',
        controller: 'otherNoticeDetailsController',
        templateUrl: 'otherNoticeDetails/otherNoticeDetails.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', function($http) {

                return $http.get('/workOrder/getOtherNoticeDetails');
            }],
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6", "7", "9", "8"],
    })
}])

.controller('otherNoticeDetailsController', ['$scope', '$http', 'resolvedData', '$ionicHistory', function($scope, $http, resolvedData, $ionicHistory) {
    $scope.resolvedData = resolvedData.data;
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
    });
}])
angular.module('qjCommunity.otherNoticeDetails.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {
            title: "通告",
            time: "2015-10-13  12:39",
            content: "在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。如下：",
            imageList: //图片列表
                [{
                src: '../images/otherNoticeDetails/tonggao.png'
            }, {
                src: '../images/otherNoticeDetails/tonggao.png'
            }, {
                src: '../images/otherNoticeDetails/tonggao.png'
            }, {
                src: '../images/otherNoticeDetails/tonggao.png'
            }, {
                src: '../images/otherNoticeDetails/tonggao.png'
            }, {
                src: '../images/otherNoticeDetails/tonggao.png'
            }],
        };

        var result = mocksData.resetData(data);

        $httpBackend.whenGET('/workOrder/getOtherNoticeDetails').respond(result);

        // $httpBackend.whenGET('/workOrder/getWorkNoticeDetails').passThrough();
    }]);
angular.module('qjCommunity.outTapeDetails', [
    'ionic',
    'qjCommunity.outTapeDetails.mock',
    'ion-gallery'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('outTapeDetails', {
        url: '/outTapeDetails/:outTapeId',
        controller: 'outTapeDetailsController',
        templateUrl: 'outTapeDetails/outTapeDetails.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', 'CurrentUserService', '$stateParams', function($http, CurrentUserService, $stateParams) {

                return $http.get('/visitor/goBarDetail/' + $stateParams.outTapeId);
            }],
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6", "7", "9", "8"],
    })
}])

.controller('outTapeDetailsController', ['$scope', '$http', 'resolvedData', 'CurrentUserService', '$ionicPopup', '$ionicHistory', function($scope, $http, resolvedData, CurrentUserService, $ionicPopup, $ionicHistory) {

    if (resolvedData != null) {
        $scope.data = resolvedData.data;
    };
    $scope.allclear = function() {
        var params = {
            "id": $scope.data.id
        };
        $http.post('/visitor/goBar', params)
            .then(
                function(result) {
                    showConfirm("操作成功", '确定', 1);
                },
                function(msg) {
                    showConfirm("操作失败", '确定', 2);
                }
            );
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
}])
angular.module('qjCommunity.outTapeDetails.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {
            id: "1111111111",
            type: "刘德华",
            number: "012",
            department: '门卫',
            plateNumber: '车辆牌号：京A 000000',
            createDate: "2015-10-13  12:39",
            outDate: "2015-10-16  16:39",
            status: "未放行",
            googds: "自行车",
            size: "20*20",
            approver: "",
            imageList: //图片列表
                [{
                src: '../images/workOrderDetails/historyRepair.jpg'
            }, {
                src: '../images/workOrderDetails/historyRepair.jpg'
            }, {
                src: '../images/workOrderDetails/historyRepair.jpg'
            }, {
                src: '../images/workOrderDetails/historyRepair.jpg'
            }, {
                src: '../images/workOrderDetails/historyRepair.jpg'
            }, {
                src: '../images/workOrderDetails/historyRepair.jpg'
            }],
        }

        var result = mocksData.resetData(data);
        // $httpBackend.whenGET(/\/workOrder\/outTapeDetails(\?size=(\d)?&number=(\d)?)?/).passThrough();
        $httpBackend.whenGET(/\/visitor\/goBarDetail\/\d/).passThrough();
        $httpBackend.whenPOST("/visitor/goBar").passThrough();
    }]);
angular.module('qjCommunity.outTapeHis', [
    'ionic',
    'qjCommunity.outTapeHis.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('outTapeHis', {
        url: '/outTapeHis',
        controller: 'outTapeHisController',
        templateUrl: 'outTapeHis/outTapeHis.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', 'CurrentUserService', function($http, CurrentUserService) {

                return $http.get('/visitor/goBarHistories?pageIndex=0&pageSize=10');
            }],
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6", "7", "9", "8"],
    })
}])

.controller('outTapeHisController', ['$scope', '$http', 'resolvedData', 'CurrentUserService', function($scope, $http, resolvedData, CurrentUserService) {

    var userPower = 1;

    if (resolvedData != null) {
        $scope.data = resolvedData.data;
    };

    var hasNextPage = function(data) {
        return data ? data.length > 0 : false;
    }

    $scope.pageInfo = {
        hasNextPage: hasNextPage($scope.data),
        pageNum: 0
    };

    $scope.refresh = function(url) {
            $http.get(url)
                .success(function(result) {
                    $scope.data = result;
                    $scope.pageInfo.pageNum =0;
                    $scope.pageInfo.hasNextPage = hasNextPage($scope.data);
                })
                .finally(function() {
                    // 停止广播ion-refresher
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
        //下拉刷新待分配
    $scope.doRefresh = function() {
        return $scope.refresh('/visitor/goBarHistories?pageIndex=0&pageSize=10');
    };

    $scope.loadMore = function() {

        $http.get('/visitor/goBarHistories', {
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
}])

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
angular.module('qjCommunity.outTapeHis.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = [{
            id: '201508119273',
            type: "刘德华",
            plateNumber: '车辆牌号：京A 000000',
            content: '请放行',
            createDate: "2015-10-13  12:39",
            outDate: "2015-10-16  16:39",
            status: "0",
        }, {
            id: '201508119273',
            type: "周润发",
            plateNumber: '车辆牌号：京A 100000',
            content: '请放行',
            createDate: "2015-10-13  12:39",
            outDate: "2015-10-16  16:39",
            status: "0",
        }, ];

        var result = mocksData.resetData(data);
        // $httpBackend.whenGET(/\/workOrder\/outTapeHis(\?size=(\d)?&number=(\d)?)?/).passThrough();
        $httpBackend.whenGET(/\/visitor\/goBarHistories(\?size=(\d)?&number=(\d)?)?/).passThrough();
    }]);
angular.module('qjCommunity.selectServiceman', [
    'ionic',
    'qjCommunity.selectServiceman.selectServiceman.mock'
])

.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('selectServiceman', {
            url: '/selectServiceman',
            controller: 'selectServicemanController',
            templateUrl: 'selectServiceman/selectServiceman.tpl.html',
            resolve: {
                resolvedData: ['$http', function($http) {
                    return $http.get('/workOrder/telephoneBook');
                }]
            },
            authorizedRuleType: ["1", "3", "2", "5", "7"],
        })
    }])
    .controller('selectServicemanController', ['$scope', '$http', 'resolvedData', '$rootScope', 'SaveWordOrderIdService', '$ionicPopup', '$ionicHistory', function($scope, $http, resolvedData, $rootScope, SaveWordOrderIdService, $ionicPopup, $ionicHistory) {
        $scope.data = resolvedData.data;

        var workOrderArray = SaveWordOrderIdService.getWorkOrderArray();

        $scope.data.userId = "";



        $scope.sendServiceman = function() {
            var apportionList = [];
            for (var i = 0; SaveWordOrderIdService.arrSize(workOrderArray) > i; i++) {
                var paramsId = {
                    "id": SaveWordOrderIdService.getId(workOrderArray, i)
                };
                apportionList.push(paramsId);
            };

            var params = {
                "staffId": $scope.data.userId,
                "workOrders": apportionList
            }

            $http.post('/workOrder/assignWorkOrder', params)
                .then(
                    function(result) {
                        SaveWordOrderIdService.deleteArray();
                        showConfirm("操作成功", '确定', 1);
                    },
                    function(msg) {
                        if (msg.data == null || msg.data == '') {
                            showConfirm('操作失败', '确定', 2);
                        } else {
                            showConfirm(msg.data, '确定', 2);
                        }
                    }
                );
        }

        //弹出框
        var showConfirm = function(template, okText, num) {
            var confirmPopup = $ionicPopup.alert({
                template: template,
                okText: okText
            });
            confirmPopup.then(function(res) {
                if (res && num == 1) {
                    $ionicHistory.goBack(-2);
                }
            });
        };

    }])
angular.module('qjCommunity.selectServiceman.selectServiceman.mock', [
    'ngMockE2E', 'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = {
        groupList: [{
                groupName: '维修一部',
                memberList: [{
                    userId: '111',
                    name: '王建成',
                    mobile: '13222698555',
                    range: '公区1区',
                }, {
                    userId: '112',
                    name: '胡慧林',
                    mobile: '13755369877',
                    range: '公区1区',
                }, {
                    userId: '113',
                    name: '王军',
                    mobile: '15832364475',
                    range: '公区1区',
                }, {
                    userId: '114',
                    name: '陈志强',
                    mobile: '18855467771',
                    range: '公区1区',
                }]
            }, {
                groupName: '维修二部',
                memberList: [{
                    userId: '111',
                    name: '王建成',
                    mobile: '13222698555',
                    range: '公区1区',
                }, {
                    userId: '111',
                    name: '胡慧林',
                    mobile: '13755369877',
                    range: '公区1区',
                }, {
                    userId: '111',
                    name: '王军',
                    mobile: '15832364475',
                    range: '公区1区',
                }, {
                    userId: '111',
                    name: '陈志强',
                    mobile: '18855467771',
                    range: '公区1区',
                }]
            }, {
                groupName: '维修三部',
                memberList: [{
                    userId: '111',
                    name: '王建成',
                    mobile: '13222698555',
                    range: '公区 1 区',
                }, {
                    userId: '111',
                    name: '胡慧林',
                    mobile: '13755369877',
                    range: '1、2号楼',
                }, {
                    userId: '111',
                    name: '王军',
                    mobile: '15832364475',
                    range: 'A座、B座',
                }, {
                    userId: '111',
                    name: '陈志强',
                    mobile: '18855467771',
                    range: '公区 1 区',
                }]
            },

        ],

    };

    var result = mocksData.resetData(data);

    $httpBackend.whenGET('/workOrder/telephoneBook').passThrough();
    // $httpBackend.whenGET('/workOrder/telephoneBook').respond(result);

    $httpBackend.whenPOST("/workOrder/assignWorkOrder").passThrough();
}])
angular.module('qjCommunity.sendOrders', [
    'ionic',
    'qjCommunity.sendOrders.sendOrders.mock'
])

.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('sendOrders', {
            url: '/sendOrders',
            controller: 'sendOrdersController',
            templateUrl: 'sendOrders/sendOrders.tpl.html',
            cache: 'false',
            resolve: {
                resolvedData: ['$http', 'CurrentUserService', function($http, CurrentUserService) {
                    return $http.get('/workOrder/unDistributionWorkOrder?pageIndex=0&pageSize=10');
                }]
            },
            authorizedRuleType: ["1", "2", "3", "5", "6", "4"],
        })
    }])
    .controller('sendOrdersController', ['$scope', '$http', 'resolvedData', '$rootScope', 'SaveWordOrderIdService', '$state', '$ionicPopup', '$ionicHistory', 'CurrentUserService', function($scope, $http, resolvedData, $rootScope, SaveWordOrderIdService, $state, $ionicPopup, $ionicHistory, CurrentUserService) {

        if (resolvedData != null) {
            $scope.data = resolvedData.data;
        };

        $scope.workOrderArray = [];
        //选择id数组
        $scope.addId = function(id) {
            if (SaveWordOrderIdService.containsBool($scope.workOrderArray, id)) {
                $scope.workOrderArray.push(id);
            } else {
                $scope.workOrderArray.splice(SaveWordOrderIdService.containsIndex, 1);
            };

        }

        $scope.goSelectServiceman = function() {
            SaveWordOrderIdService.addArray($scope.workOrderArray);
            if (SaveWordOrderIdService.isEmpty(SaveWordOrderIdService.getWorkOrderArray())) {
                $state.go('selectServiceman');
            } else {
                showConfirm("请选择工单", '确定', 2);
            };
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
            return $scope.refresh('/workOrder/unDistributionWorkOrder?pageIndex=0&pageSize=10');
        };

        $scope.loadMore = function() {

            $http.get('/workOrder/unDistributionWorkOrder', {
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
    }])

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
});
angular.module('qjCommunity.sendOrders.sendOrders.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {
            wordOrderList: [{
                type: '0', //0:代表[户内]报修;1:代表[公区];2:代表[投诉]
                id: '201508119273', //报修单id
                owner: '唐小包 12345679011', //业主信息(姓名、电话)
                content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
                createDate: "2015-10-13  12:39",
                address: "南京市建邺区万达广场8-A-3-1102111111",
                status: "0",
            }, ],

        };

        var result = mocksData.resetData(data);

        // $httpBackend.whenGET(/\/workOrder\/unDistributionWorkOrder(\?size=(\d)?&number=(\d)?)?/).respond(result);
        $httpBackend.whenGET(/\/workOrder\/unDistributionWorkOrder(\?size=(\d)?&number=(\d)?)?/).passThrough();
    }])
angular.module('qjCommunity.userServers', [
    'qjCommunity.blankPage',
    'qjCommunity.login'
])

angular.module('qjCommunity.visivorPassageHis', [
    'ionic',
    'qjCommunity.visivorPassageHis.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('visivorPassageHis', {
        url: '/visivorPassageHis',
        controller: 'visivorPassageHisController',
        templateUrl: 'visivorPassageHis/visivorPassageHis.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', 'CurrentUserService', function($http, CurrentUserService) {

                return $http.get('/visitor/visitorLists?pageIndex=1&pageSize=10');
            }],
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6", "7", "9", "8"],
    })
}])

.controller('visivorPassageHisController', ['$scope', '$http', 'resolvedData', 'CurrentUserService', function($scope, $http, resolvedData, CurrentUserService) {

    var userPower = 1;

    if (resolvedData != null) {
        $scope.data = resolvedData.data;
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
        return $scope.refresh('/visitor/visitorLists?pageIndex=0&pageSize=10');
    };

    $scope.loadMore = function() {

        $http.get('/visitor/visitorLists', {
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
}])

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
angular.module('qjCommunity.visivorPassageHis.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = [{
            name: "胡拜泉 先生",
            people: "0",
            car: "1",
            owner: "唐小包 12345679",
            arriveTime: "2016-09-12 12:00",
            unit: "北京市海淀区春风里8号楼A座1008室",
            content: "在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。",
        }, {
            name: "胡拜泉 先生",
            people: "0",
            car: "1",
            owner: "唐小包 12345679",
            arriveTime: "2016-09-12 12:00",
            unit: "北京市海淀区春风里8号楼A座1008室",
            content: "在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。",
        }];
        var result = mocksData.resetData(data);
        // $httpBackend.whenGET(/\/workOrder\/visivorPassageHis(\?size=(\d)?&number=(\d)?)?/).passThrough();
        $httpBackend.whenGET(/\/visitor\/visitorLists(\?size=(\d)?&number=(\d)?)?/).passThrough();
    }]);
angular.module('qjCommunity.wordOrderHistory', [
    'ionic',
    'qjCommunity.wordOrderHistory.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('wordOrderHistory', {
        url: '/wordOrderHistory',
        controller: 'wordOrderHistoryController',
        templateUrl: 'wordOrderHistory/wordOrderHistory.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', 'CurrentUserService', function($http, CurrentUserService) {

                return $http.get('/workOrder/getHistory?pageIndex=0&pageSize=10');
            }],
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6", "7", "9", "8"],
    })
}])

.controller('wordOrderHistoryController', ['$scope', '$http', 'resolvedData', 'CurrentUserService', function($scope, $http, resolvedData, CurrentUserService) {

    var userPower = 1;

    if (resolvedData != null) {
        $scope.data = resolvedData.data;
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
        return $scope.refresh('/workOrder/getHistory?pageIndex=0&pageSize=10');
    };

    $scope.loadMore = function() {

        $http.get('/workOrder/getHistory', {
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
}])

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
angular.module('qjCommunity.wordOrderHistory.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        $httpBackend.whenGET(/\/workOrder\/getHistory(\?size=(\d)?&number=(\d)?)?/).passThrough();
    }]);
angular.module('qjCommunity.workNoticeDetails', [
    'ionic',
    'qjCommunity.workNoticeDetails.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('workNoticeDetails', {
        url: '/workNoticeDetails/:Id',
        controller: 'workNoticeDetailsController',
        templateUrl: 'workNoticeDetails/workNoticeDetails.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', '$stateParams', function($http, $stateParams) {

                return $http.get('/staffMessage/findMessageDetail?id='+$stateParams.Id);
            }],
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6", "7", "9", "8"],
    })
}])

.controller('workNoticeDetailsController', ['$scope', '$http', 'resolvedData', '$ionicHistory', function($scope, $http, resolvedData, $ionicHistory) {
    $scope.resolvedData = resolvedData.data;
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
    });
}])
angular.module('qjCommunity.workNoticeDetails.mock', [
        'ngMockE2E', 'qjCommunity.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {
        	title:"关于举办第7届员工运动会的通知",
        	time:"2015-10-13  12:39",
        	content:"在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。",
        };

        var result = mocksData.resetData(data);

        $httpBackend.whenGET(/\/staffMessage\/findMessageDetail\?id=/).passThrough();

        // $httpBackend.whenGET('/workOrder/getWorkNoticeDetails').passThrough();
    }]);
angular.module('qjCommunity.workOrderDetails', [
    'ionic',
    'ion-gallery',
    'qjCommunity.workOrderDetails.workOrderDetails.mock',
    'qjCommunity.common.cordova'
])

.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('workOrderDetails', {
            url: '/workOrderDetails/:workOrderId',
            controller: 'workOrderDetailsController',
            templateUrl: 'workOrderDetails/workOrderDetails.tpl.html',
            resolve: {

                resolvedData: ['$http', '$stateParams', function($http, $stateParams) {
                    return $http.get('/workOrder/workOrderDetailInfo/' + $stateParams.workOrderId);
                }],

                //获取维修提交信息
                repairConfirmData: ['$http', '$stateParams', function($http, $stateParams) {
                    return $http.get('/workOrder/getMessage/' + $stateParams.workOrderId);
                }],

                //获取报修完成后图片
                repairImgData: ['$http', '$stateParams', function($http, $stateParams) {
                    return $http.get('/workOrder/findfinishRepairImg?id=' + $stateParams.workOrderId);
                }],
            },
            authorizedRuleType: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        });
    }])
    .controller('workOrderDetailsController', ['$scope', '$http', '$stateParams', '$state', 'resolvedData', 'repairConfirmData', '$ionicPopup', '$ionicHistory', 'CurrentUserService', 'MrCamera', 'MrImagePicker', 'repairImgData',

        function($scope, $http, $stateParams, $state, resolvedData, repairConfirmData, $ionicPopup, $ionicHistory, CurrentUserService, MrCamera, MrImagePicker, repairImgData) {
            $scope.showTabBaojie = CurrentUserService.userSession().showTabBaojie;
            if (resolvedData != null) {
                $scope.resolvedData = resolvedData.data;
            }
            if (repairConfirmData != null) {
                $scope.repairConfirmData = repairConfirmData.data;
            }
            $scope.data = repairImgData.data;

            $scope.repairConfirmData.content = '';
            //更新任务进度内容
            $scope.addTaskContent = function() {
                if ($scope.repairConfirmData.content == '') {
                    showConfirm("内容不能为空", '确定', 2);
                } else {
                    var params = {
                        "repairId": $scope.resolvedData.id,
                        "describe": $scope.repairConfirmData.content
                    };
                    $http.post('/workOrder/addMessage', params)
                        .then(
                            function(result) {
                                $scope.refresh();
                                showConfirm("操作成功", '确定', 2);
                            },
                            function(msg) {
                                showConfirm("操作失败", '确定', 2);
                            }
                        );
                }

            };

            $scope.refresh = function() {
                $http.get('/workOrder/getMessage/' + $stateParams.workOrderId)
                    .success(function(result) {
                        $scope.repairConfirmData = result;
                    })
                    .finally(function() {
                        // 停止广播ion-refresher
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };

            $scope.over = function() {
                $http.get('/workOrder/finishRepair/' + $scope.resolvedData.id)
                    .then(
                        function(result) {
                            showConfirm("操作成功", '确定', 1);
                        },
                        function(msg) {
                            showConfirm("操作失败", '确定', 2);
                        }
                    );
            }

            $scope.chargeback = function() {
                chargebackConfirm("确认取消该工单？", "确定", "取消");
            }

            var chargebackConfirm = function(template, leftText, rightText) {
                var confirmPopup = $ionicPopup.confirm({
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $http.get('/workOrder/cancelRepair/' + $scope.resolvedData.id).then(
                            function(result) {
                                showConfirm("操作成功", '确定', 1);
                            },
                            function(msg) {
                                showConfirm("操作失败", '确定', 2);
                            }
                        );
                    }
                });
            }
            $scope.overVerifyConfirm = function() {
                showCommitConfirm("确认处理完成？", "确定", "取消");
            }

            var showCommitConfirm = function(template, leftText, rightText) {
                var confirmPopup = $ionicPopup.confirm({
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        commitMsg();
                        $scope.over();
                    }
                });
            };

            //如果是进行中，此处数据length==0是正常
            if ($scope.data.imageFinishList.length==0) {
                var imageFinishList = new Array();
                $scope.data.imageFinishList = imageFinishList;
            }
            $scope.addAttachment = function() {
                if ($scope.data.imageFinishList.length >= 9) {
                    showConfirm("最多上传9张照片", '确定', 2);
                    return;
                }
                takePicture();
            };
            var postImages = new Array();
            var postPicture = function(images) {
                for (var i = 0; i < images.length; i++) {
                    var pictureParams = {
                        "uploadFile": images[i],
                        "imageType": "20"
                    };
                    $http.post('/upload/uploadImage', pictureParams).then(function(result) {
                        var pictureUrl = { src: result.data.imgUrl };
                        postImages.push(pictureUrl);
                        $scope.data.imageFinishList.push(result.data.imgUrl);
                    }, function(msg) {
                        showConfirm("图片上传失败！", "确定", 2);
                    });
                }
            }
            var takePicture = function() {
                var options = {
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 1024,
                    targetHeight: 1024,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };
                MrCamera.getPicture(options).then(function(imageData) {
                    var imageUrl = "data:image/jpeg;base64," + imageData;
                    var images = new Array();
                    images[0] = imageUrl;
                    postPicture(images);
                }, function(err) {
                    // alert(err);
                });
            };
            $scope.addPic = function() {
                if ($scope.data.imageFinishList.length >= 9) {
                    showConfirm("最多上传9张照片", '确定', 2);
                    return;
                }
                var options = {
                    maximumImagesCount: 9 - $scope.data.imageFinishList.length,
                    width: 360,
                    height: 360,
                    quality: 100
                };
                MrImagePicker.getPictures(options).then(
                    function(results) {
                        convertToDataStream(results);
                    },
                    function(error) {
                        console.log(error);
                    });
            };
            $scope.deletePicture = function($index) {
                /*点击哪张图片，删除哪张图片*/
                showConfirmTwo("删除此图片？", "确定", "取消", $index);
            };

            var showConfirmTwo = function(template, leftText, rightText, index) {
                var confirmPopup = $ionicPopup.confirm({
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $scope.data.imageFinishList.splice(index, 1);
                        postImages.splice(index, 1);
                    }
                });
            };
            var convertToDataStream = function(picturesUrl) {
                MRBase64Image.convertToDataStream(successCallback, errorCallback, picturesUrl);

                function successCallback(content) {
                    var dataArray = new Array();
                    for (var i = 0; i < content.length; i++) {
                        var fullFile = "data:image/jpeg;base64," + content[i];
                        dataArray.push(fullFile);
                    }
                    postPicture(dataArray);
                }

                function errorCallback(message) {}
            };

            //提交报修后图片
            var commitMsg = function() {
                    var params = {
                        "imageFinishList": postImages,
                        "id": $stateParams.workOrderId
                    }
                    $http.post('/workOrder/finishRepairImg', params)
                        .then(
                            function(result) {},
                            function(msg) {}

                        );
                }
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
angular.module('qjCommunity.workOrderDetails.workOrderDetails.mock', [
    'ngMockE2E', 'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var progressData = {
        progressList: [{
            taskDate: "2016-1-11", //任务时间
            taskTime: "15:30:30",
            taskName: "提交报修", //任务名称
        }, {
            taskDate: "", //任务时间
            taskTime: "",
            taskName: "", //任务名称
        }, {
            taskDate: "2016-1-11", //任务时间
            taskTime: "17:30:30",
            taskName: "维修过程", //任务名称
        }, {
            taskDate: "2016-1-11", //任务时间
            taskTime: "18:30:30",
            taskName: "业主回访", //任务名称
        }, {
            taskDate: "2016-1-11", //任务时间
            taskTime: "19:30:30",
            taskName: "维修完成", //任务名称
        }, ],
    };
    var result = mocksData.resetData(progressData);
    // $httpBackend.whenGET(/\/workOrder\/repairsProgress\/\d{19}/).passThrough();
    $httpBackend.whenGET(/\/workOrder\/repairsProgress\/\d/).respond(result);
    //报修详情
    var repairData = {

        id: "222", //报修单id
        content: "在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。", //报修内容
        userAddress: "海淀区西二旗", //业主地址
        userName: "王先生", //业主姓名
        userPhone: "12345678902", //业主电话
        status: "0",
        imageList: //图片列表
            [{
            src: '../images/workOrderDetails/historyRepair.jpg'
        }, {
            src: '../images/workOrderDetails/historyRepair.jpg'
        }, {
            src: '../images/workOrderDetails/historyRepair.jpg'
        }, {
            src: '../images/workOrderDetails/historyRepair.jpg'
        }, {
            src: '../images/workOrderDetails/historyRepair.jpg'
        }, {
            src: '../images/workOrderDetails/historyRepair.jpg'
        }],
    };
    var result = mocksData.resetData(repairData);
    // $httpBackend.whenGET(/\/workOrder\/repairsDetail\/\d{19}/).passThrough();
    $httpBackend.whenGET(/\/workOrder\/repairsDetail\/\d{12}/).respond(result);
    //获取维修信息
    var repairConfirmData = {
        taskConentList: [{
            id: "1", //报修单id
            taskDate: "16-01-06 09:23", //维修时间
            taskConent: "已接单,正在往业主家中;", //内容
        }, {
            id: "1", //报修单id
            taskDate: "16-01-06 19:23",
            taskConent: "已抵达业家中;", //内容
        }, {
            id: "1", //报修单id
            taskDate: "16-01-07 09:23",
            taskConent: "进行中;", //内容
        }, ],
    };
    var result = mocksData.resetData(repairConfirmData);
    // $httpBackend.whenGET(/\/workOrder\/taskContent\/\d{19}/).passThrough();
    $httpBackend.whenGET(/\/workOrder\/taskContent\/\d/).respond(result);

    var evaluationData = {
        maintenanceQuality: "非常满意",
        serviceAttitude: "完美",
        maintenanceGrade: "1",
        serviceGrade: "4",
    };
    var result = mocksData.resetData(evaluationData);
    // $httpBackend.whenGET(/\/workOrder\/taskContent\/\d{19}/).passThrough();
    $httpBackend.whenGET(/\/workOrder\/evaluation\/\d/).respond(result);

    $httpBackend.whenGET(/\/workOrder\/workOrderDetailInfo\/\d/).passThrough();
    $httpBackend.whenGET(/\/workOrder\/getMessage\/\d/).passThrough();
    $httpBackend.whenGET(/\/workOrder\/cancelRepair\/\d/).passThrough();
    $httpBackend.whenGET(/\/workOrder\/finishRepair\/\d/).passThrough();
    $httpBackend.whenGET(/\/workOrder\/findfinishRepairImg\?id\=/).passThrough();

    //以下为添加post请求
    $httpBackend.whenPOST(/\/workOrder\/addMessage/).passThrough();
    $httpBackend.whenPOST(/\/workOrder\/finishRepairImg/).passThrough();
    $httpBackend.whenPOST(/\/upload\/uploadImage/).passThrough();
}])
angular.module('maxrocky.framework.directives.goback',[
])

.directive('mrGoBack',['$ionicHistory','$parse', '$filter', function($ionicHistory,$parse, $filter){
	return {
		restrict:'C',
		link: function(scope, element, attrs){
            element.on('click',function(){
             	$ionicHistory.goBack();
            });
		}
	};
}])
angular.module('maxrocky.framework.directives.navBar',[
])

.directive('mrNavBar',['$parse', '$filter', function($parse, $filter){

	return {
		restrict:'C',
		scope:{
			opacity:"="
		},
		link: function(scope, element, attrs){
			scope.$watch('opacity',function(newValue){
				newValue=newValue||0;
				element.css('opacity',newValue);
			})
		}
	};
}])
angular.module('maxrocky.framework.directives.rem',[
])

.directive('mrRem',['$parse', '$filter', function($parse, $filter){

	return {
		restrict:'A',
		link: function(scope, element, attrs){
	    var _size = 50;
        var p = (document.body && document
            .body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / 375;
        _size = p * 50; 
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _size + "px!important");
   
		}
	};
}])
angular.module('qjCommunity.common', [
    'qjCommunity.common.httpTransform',
    'qjCommunity.common.httpBaseUrlSupport',
    'qjCommunity.common.httpMockBaseUrlSupport',
    'qjCommunity.common.login',
    'qjCommunity.common.pageInit',
    'qjCommunity.common.saveData',
    'qjCommunity.common.saveVersion',
    'qjCommunity.common.cordova',
    'qjCommunity.common.savePopShowFrist'
])
if (!isApp) {
    var module = angular.module('qjCommunity.common.cordova', [])
    module.factory('MrCamera', [function() {
        return {
            getPicture: function() {
                alert("没有硬件");
            },
        };
    }])
    module.factory('MrImagePicker', [function() {
        return {
            getPictures: function() {
                alert("没有硬件");
            },
        };
    }])
    module.factory('MrDevice', [function() {
        return {
            getDevice: function() {},
        };
    }])
    module.factory('MrBarcodeScanner', [function() {
        return {
            scan: function() {
                alert("没有硬件");
            },
        };
    }])
} else {
    var module = angular.module('qjCommunity.common.cordova', ['ngCordova'])
    module.factory('MrCamera', ['$cordovaCamera', function($cordovaCamera) {
        return $cordovaCamera;
    }])
    module.factory('MrImagePicker', ['$cordovaImagePicker', function($cordovaImagePicker) {
        return $cordovaImagePicker;
    }])

    module.factory('MrDevice', ['$cordovaDevice', function($cordovaDevice) {
        return $cordovaDevice;
    }])

    module.factory('MrBarcodeScanner', ['$cordovaBarcodeScanner', function($cordovaBarcodeScanner) {
        return $cordovaBarcodeScanner;
    }])
}
angular.module('qjCommunity.common.httpBaseUrlSupport', [
    'ionic',
    'qjCommunity.app.config'
])

.config(['$provide', 'ApiBaseUrl', function($provide,ApiBaseUrl){
	function combineUrl(baseUrl,url){
		while(url.indexOf('/')===0) url=url.substring(1);
		return baseUrl+url;
	}

	$provide.decorator('$http',['$delegate', function($delegate) {
        var $http = $delegate;
 
	    var wrapper = function () {
	      	return $http.apply($http, arguments);
	    };
	 
	    Object.keys($http).filter(function (key) {
	      	return (typeof $http[key] === 'function');
	    }).forEach(function (key) {
	      	wrapper[key] = function () {
	      		var url=arguments[0];
	      		if(url.match('.tpl.html')||url.indexOf('http://')===0){
	        		return $http[key].apply($http, arguments);
	      		}
	      		else{
	      			url=combineUrl(ApiBaseUrl,url);
	      			arguments[0]=url;
	        		return $http[key].apply($http, arguments);
	      		}
	      	};
	    });
	 
	    return wrapper;
    }]);
}])
angular.module('qjCommunity.common.httpMockBaseUrlSupport', [
    'ionic',
    'ngMockE2E',
    'qjCommunity.app.config'
])

.config(['$provide', 'ApiBaseUrl', function($provide,ApiBaseUrl){
	function combineUrl(baseUrl,url){
		while(baseUrl.lastIndexOf('/')===baseUrl.length-1) baseUrl=baseUrl.substring(0,baseUrl.length-1);
		return baseUrl+url;
	}

	$provide.decorator('$httpBackend', ['$delegate',function($delegate) {
        var $httpBackend = $delegate;
 		var when=$httpBackend.when;
	    $httpBackend.when=function(){
	    	var url=arguments[1];
      		if(typeof url ==='string' && url.indexOf('http://')!==0 && (url.indexOf('.tpl.html')===-1||url.indexOf('.tpl.html')!==url.length-9)){
      			url=combineUrl(ApiBaseUrl,url);
      			arguments[1]=url;
	      		return when.apply($httpBackend, arguments);
      		}
      		else if(url instanceof RegExp && url.source.indexOf('http:\\/\\/')!==0){
      			url=new RegExp(combineUrl(ApiBaseUrl,url.source));
      			arguments[1]=url;
	      		return when.apply($httpBackend, arguments);
      		}
      		else{
      			return when.apply($httpBackend, arguments);
      		}
	    }
	 
	    return $httpBackend;
    }]);
}])
angular.module('qjCommunity.common.httpTransform', [
    'ionic',
    'qjCommunity.app.config'
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('commonResponseParser');
}])

.factory('commonResponseParser', ['$q', 'HTTP_COMMON_ERROR_MESSAGE', '$rootScope', function($q, HTTP_COMMON_ERROR_MESSAGE, $rootScope) {
    return {
        response: function(response) {
            if (!!response.config.url.match('.tpl.html'))
                return response;
            if (response.data && response.data.code === 0 && response.data.data.roleId != "9" && response.data.data.roleId != "10" && response.data.data.roleId != "11" && response.data.data.roleId != "12") {
                response.data = response.data.data;
                return response;
            } else if (response.data.msg) {
                if (response.data.msg == "当前未登录" || response.data.msg == "您的账号已在其他地方登录。") {
                    $rootScope.$broadcast('tokenBug', [response.data.msg]);
                };
                if (response.data.data.roleId == "9" || response.data.data.roleId == "10" || response.data.data.roleId == "11" || response.data.data.roleId == "12") {
                    response.data.msg="用户名或密码错误";
                    return $q.reject({
                        data: response.data.msg,
                        status: response.status,
                        headers: response.headers,
                    });
                } else {
                    return $q.reject({
                        data: response.data.msg,
                        status: response.status,
                        headers: response.headers
                    });
                }
            } else {
                return $q.reject(response);
            }
        },
        responseError: function(rejection) {
            return $q.reject(HTTP_COMMON_ERROR_MESSAGE);
        }
    };
}])
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
            var rule = toState.authorizedRuleType;
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
                                $ionicModal.fromTemplateUrl('userServers/login/login.tpl.html', {
                                        nextState: {
                                            toState: toState,
                                            toParams: toParams
                                        },
                                        backdropClickToClose: false,
                                        animation: 'slide-in-right'
                                    })
                                    .then(function(modal) {
                                        modal.show();
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
angular.module('qjCommunity.common.mocksData',[
])

.factory('mocksData', [function(){
	return {
		resetData: function(data){
			var result={code:0};
			result.data=data;
				return result;
			
		}
	};
}])




angular.module('qjCommunity.common.pageInit', [])

.factory('pageInitService', ['$q','$http','$ionicLoading',
    function($q, $http,  $ionicLoading) {
        var pageInit = {};
        pageInit.pageInit = function(apis) {
            $ionicLoading.show();
            var data = [];
            for (var i = 0; i < apis.length; i++) {
                data[i] = (function() {
                    return $http.get(apis[i]); })();
            };
            return $q.all(data).finally(function() {
                $ionicLoading.hide();
            });
        };
        return pageInit;
    }
])
angular.module('qjCommunity.common.saveData', [])

.service('addIdService', [function() {
    this.create = function(workOrderArray) {
        this.workOrderArray = workOrderArray;
    };
    this.destroy = function() {
        this.workOrderArray = [];
    };
    return this;
}])

.factory('SaveWordOrderIdService', ['addIdService', function(addIdService) {
    var saveWordOrderId = {};
    saveWordOrderId.containsBool = function(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return false;
            }
        }
        return true;
    }

    saveWordOrderId.containsIndex = function(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return i;
            }
        }
    }
    saveWordOrderId.isEmpty = function(arr) {
        return arr ? arr.workOrderArray.length > 0 : false;
    }

    saveWordOrderId.arrSize = function(arr) {
        return arr.workOrderArray.length;
    }

    saveWordOrderId.getId = function(arr, i) {
        return arr.workOrderArray[i];
    }

    saveWordOrderId.addArray = function(workOrderArray) {
        addIdService.create(workOrderArray);
    }

    saveWordOrderId.deleteArray = function() {
        addIdService.destroy();
    }

    saveWordOrderId.getWorkOrderArray = function() {
        return addIdService;
    };
    return saveWordOrderId;
}])


angular.module('qjCommunity.common.savePopShowFrist', [])

.service('savePopShowFrist', [function() {
    this.popShowBlr = false;
    this.create = function(popShowBlr) {
        this.popShowBlr = popShowBlr;
    };
     this.destroy = function(popShowBlr) {
        this.popShowBlr = popShowBlr;
    };
    return this;
}])

.factory('SavePopShowFristService', ['savePopShowFrist', function(savePopShowFrist) {
    var savePopShowFristExample = {};

    savePopShowFristExample.setPopShowBlr = function(popShowBlr) {
        savePopShowFrist.create(popShowBlr);
    }

    savePopShowFristExample.getPopShowBlr = function() {
        return savePopShowFrist;
    };
    return savePopShowFristExample;
}])
angular.module('qjCommunity.common.saveVersion', [])

.service('saveVersion', [function() {
    this.create = function(appVersion) {
        this.appVersion = appVersion;
    };
    return this;
}])

.factory('SaveVersionService', ['saveVersion', function(saveVersion) {
    var saveVersionExample = {};

    saveVersionExample.addVersion = function(appVersion) {
        saveVersion.create(appVersion);
    }

    saveVersionExample.getVersion = function() {
        return saveVersion;
    };
    return saveVersionExample;
}])
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
angular.module('qjCommunity.home.cleanWorkOrder.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = {
        currentPage: "2", //当前页
        totalPages: "5", //总页数
        wordOrderList: [{
            type: '户内',
            id: '201508119273', //报修单id
            owner: '唐小包 12345679', //业主信息(姓名、电话)
            content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
            createDate: "2015-10-13  12:39",
            address: "南京市建邺区万达广场8-A-3-1102",
            status: "0", //0:未分配；1：继续；2：投诉;3:抢单
        }, {
            type: '户内', //0:代表[户内]报修;1:代表[公区];2:代表[投诉]
            id: '201508119273', //报修单id
            owner: '唐小包 12345679', //业主信息(姓名、电话)
            content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
            createDate: "2015-10-13  12:39",
            address: "南京市建邺区万达广场8-A-3-1102",
            status: "0",
        }, ],
    };
    var result = mocksData.resetData(data);
    // $httpBackend.whenGET('/cleanWorkOrder/cleanWorkOrderList?type=户内&pageIndex=0&pageSize=10').respond(result);
     $httpBackend.whenGET(/\/workOrder\/workOrderList(\?pageIndex=(\d)?&pageSize=(\d)?)?/).passThrough();
}]);
angular.module('qjCommunity.home.index', [
    'ionic',
    'qjCommunity.home.index.mock',
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home/index', {
        url: '/home/index',
        controller: 'HomeIndexController',
        templateUrl: 'home/index/index.tpl.html',
        cache: false,
        resolve: {
            resolvedData: ['$http', function($http) {
                return $http.get('/staffMessage/staffMessageList?pageIndex=1&pageSize=10');
            }]
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6"],
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
angular.module('qjCommunity.home.index.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = [{
        typeOne: '0',
        type: '公区', //0:代表[户内]1:代表[公区]
        id: '201508119273', //单子标记
        owner: '唐小包 11111111111',
        content: '在楼前新小区建设听证会上',
        createDate: "2015-10-13  12:39",
        address: "南京市建邺区万达广场8-A-3-1102",
        latestState: "0",
    }, {
        typeOne: '0',
        type: '户内', //0:代表[户内]1:代表[公区]
        id: '201508119273', //单子标记
        owner: '唐小包 12345679',
        content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
        createDate: "2015-10-13  12:39",
        address: "南京市建邺区万达广场8-A-3-1102",
        latestState: "1",
    }, {
        typeOne: '1',
        id: '201508119273', //单子标记
        tit: '恭喜，你得到一份小区表扬',
        content: '在楼前新小区建设听证会上',
        createDate: "2015-10-13  12:39",
        latestState: "0",
    }, {
        typeOne: '1',
        id: '201508119273', //单子标记
        tit: '中奖了，中大奖了',
        content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
        createDate: "2015-10-13  12:39",
        latestState: "1",
    }, ];

    var result = mocksData.resetData(data);

    $httpBackend.whenGET(/\/staffMessage\/staffMessageList(\?pageIndex=(\d)?&pageSize=(\d)?)?/).passThrough();
    $httpBackend.whenDELETE(/\/staffMessage\/DelMessage\/[a-fA-F0-9]{32,32}/).passThrough();

}])
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
angular.module('qjCommunity.home.mineWork.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    // $httpBackend.whenGET('/mineWorkbench/staffVersion/1').passThrough();
    // $httpBackend.whenGET('/mineWorkbench/staffVersion/2').passThrough();
    // $httpBackend.whenGET('/mineWorkbench/mineWorkbench/1').passThrough();
    // $httpBackend.whenPOST('/user/exitForStaff').passThrough();

    var data = {
        workBenchDTO: {
            staffId: "earl",
            userName: "w_earl",
            logo: "../images/mineWork/head.png",
            countPraise: "1",
            version: "1.0",
        },
    };
    var result = mocksData.resetData(data);

    $httpBackend.whenGET('/workbench/workbench/1').passThrough();
    $httpBackend.whenGET('/mineWorkbench/staffVersion/1').passThrough();
    $httpBackend.whenGET('/mineWorkbench/staffVersion/2').passThrough();
    $httpBackend.whenPOST('/user/exitForStaff').passThrough();
}])
angular.module('qjCommunity.home.outTape', [
        'ionic',
        'qjCommunity.home.outTape.mock',
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home/outTape', {
            url: '/home/outTape',
            controller: 'outTapeController',
            templateUrl: 'home/outTape/outTape.tpl.html',
            cache: 'false',
            resolve: {
                resolvedData: ['$http', function($http) {
                    return $http.get('/visitor/goBarList?pageIndex=0&pageSize=10');
                }],
            },
            authorizedRuleType: ["1", "2", "3", "4", "5"],
        })
    }])

.controller('outTapeController', ['$scope', '$http', 'resolvedData', '$ionicTabsDelegate', '$ionicHistory', 'CurrentUserService',
        function($scope, $http, resolvedData, $ionicTabsDelegate, $ionicHistory, CurrentUserService) {

            $scope.showTabBaoan = CurrentUserService.userSession().showTabBaoan;
            $scope.showTabBaojie = CurrentUserService.userSession().showTabBaojie;
            $scope.showTabWeixiu = CurrentUserService.userSession().showTabWeixiu;

            $scope.$on('$ionicView.enter', function() {
                $scope.currentTab = 'home/outTape';
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
                pageNum: 0
            };

            $scope.refresh = function(url) {
                    $http.get(url)
                        .success(function(result) {
                            $scope.data = result;
                            $scope.pageInfo.pageNum = 0;
                            $scope.pageInfo.hasNextPage = hasNextPage($scope.data);
                        })
                        .finally(function() {
                            // 停止广播ion-refresher
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                }
                //下拉刷新待分配
            $scope.doRefresh = function() {
                return $scope.refresh('/visitor/goBarList?pageIndex=0&pageSize=10');
            };

            $scope.loadMore = function() {
                $http.get('/visitor/goBarList', {
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
angular.module('qjCommunity.home.outTape.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = [{
        id: '201508119273',
        type: "刘德华",
        plateNumber: '车辆牌号：京A 000000',
        content: '请放行',
        createDate: "2015-10-13  12:39",
        outDate: "2015-10-16  16:39",
        status: "0",
    }, {
        id: '201508119273',
        type: "周润发",
        plateNumber: '车辆牌号：京A 100000',
        content: '请放行',
        createDate: "2015-10-13  12:39",
        outDate: "2015-10-16  16:39",
        status: "0",
    }, ];

    var result = mocksData.resetData(data);
    // $httpBackend.whenGET('/outTape/outTapeList?type=户内&pageIndex=0&pageSize=10').respond(result);
    $httpBackend.whenGET(/\/visitor\/goBarList(\?&pageIndex=(\d)?&pageSize=(\d)?)?/).passThrough();

}])
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
angular.module('qjCommunity.home.visivorPassage.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = [{
        id: '201508119273',
        plateNumber: '车辆牌号：京A 000000',
        content: '请放行',
        createDate: "2015-10-13  12:39",
        outDate: "2015-10-16  16:39",
        status: "0",
    }, {
        id: '201508119273',
        plateNumber: '车辆牌号：京A 100000',
        content: '请放行',
        createDate: "2015-10-13  12:39",
        outDate: "2015-10-16  16:39",
        status: "0",
    }, ];

    var result = mocksData.resetData(data);
    // $httpBackend.whenGET(/\/visitor\/visitorInfos/).respond(result);
    $httpBackend.whenGET(/\/visitor\/visitorInfos/).passThrough();
    $httpBackend.whenPOST(/\/visitor\/confirmation/).passThrough();
}])
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
angular.module('qjCommunity.home.workOrder.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = {
        currentPage: "2", //当前页
        totalPages: "5", //总页数
        wordOrderList: [{
            type: '户内',
            id: '201508119273', //报修单id
            owner: '唐小包 12345679', //业主信息(姓名、电话)
            content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
            createDate: "2015-10-13  12:39",
            address: "南京市建邺区万达广场8-A-3-1102",
            status: "0", //0:未分配；1：继续；2：投诉;3:抢单
        }, {
            type: '户内', //0:代表[户内]报修;1:代表[公区];2:代表[投诉]
            id: '201508119273', //报修单id
            owner: '唐小包 12345679', //业主信息(姓名、电话)
            content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
            createDate: "2015-10-13  12:39",
            address: "南京市建邺区万达广场8-A-3-1102",
            status: "0",
        }, ],
    };
    var result = mocksData.resetData(data);
    // $httpBackend.whenGET('/workOrder/workOrderList?type=户内&pageIndex=0&pageSize=10').respond(result);
    $httpBackend.whenGET(/\/workOrder\/workOrderList(\?type=(\d)?&pageIndex=(\d)?&pageSize=(\d)?)?/).passThrough();

    var data = {
        currentPage: "1", //当前页
        totalPages: "5", //总页数
        wordOrderList: [{
            type: '公区',
            id: '201508119272', //报修单id
            owner: '唐小包 12345679', //业主信息(姓名、电话)
            content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
            createDate: "2015-10-13  12:39",
            address: "南京市建邺区万达广场8-A-3-1102",
            status: "0",
        }, {
            type: '公区', //0:代表[户内]报修;1:代表[公区];2:代表[投诉]
            id: '201508119273', //报修单id
            owner: '唐小包 12345679', //业主信息(姓名、电话)
            content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
            createDate: "2015-10-13  12:39",
            address: "南京市建邺区万达广场8-A-3-1102",
            status: "0",
        }, ],
    };
    var result = mocksData.resetData(data);
    // $httpBackend.whenGET('/workOrder/workOrderList?type=公区&pageIndex=0&pageSize=10').respond(result);
    // $httpBackend.whenGET('/workOrder/workOrderList?type=公区&pageIndex=0&pageSize=10').passThrough();
    // $httpBackend.whenGET(/\/workOrder\/workOrderList(\?type=(\d)?&pageIndex=(\d)?&pageSize=(\d)?)?/).passThrough();

}])
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
            username: "zweixiu",
            password: "123456",
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
                            var rule = $scope.modal.nextState.toState.authorizedRuleType;
                            var isHasAuth = CurrentUserService.contains(rule, user.data.roleId);
                            if (isHasAuth) {
                                //新添加的
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
angular.module('qjCommunity.login.mock', [
    'ngMockE2E', 'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenGET('/workOrder/getUserRole').passThrough();

    $httpBackend.whenPOST('/user/loginForStaff').passThrough();

}])
angular.module('qjCommunity.home.index.otherNotice', [
    'ionic',
    'qjCommunity.home.index.otherNotice.mock',
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home/index/otherNotice', {
        url: '/home/index/otherNotice',
        controller: 'OtherNoticeController',
        templateUrl: 'home/index/otherNotice/otherNotice.tpl.html',
        cache: false,
        resolve: {
            resolvedData: ['$http', function($http) {
                return $http.get('/home/otherNotice');
            }]
        },
        authorizedRuleType: ["1", "2", "3", "4", "5"],
    })
}])

.controller('OtherNoticeController', ['$scope', '$http', 'resolvedData', '$state', '$ionicViewSwitcher', '$ionicTabsDelegate', '$ionicHistory', 'CurrentUserService',
    function($scope, $http, resolvedData, $state, $ionicViewSwitcher, $ionicTabsDelegate, $ionicHistory, CurrentUserService) {

        $scope.showTabBaoan = CurrentUserService.userSession().showTabBaoan;
        $scope.showTabBaojie = CurrentUserService.userSession().showTabBaojie;
        $scope.showTabWeixiu = CurrentUserService.userSession().showTabWeixiu;

        $scope.$on('$ionicView.enter', function() {
            $scope.currentTab = 'home/index';
            $ionicTabsDelegate.select(0);
        })

        $scope.data = resolvedData.data;

        // var hasNextPage = function(data) {
        //     return data ? data.length > 0 : false;
        // }
        // $scope.pageInfo = {
        //     hasNextPage: hasNextPage($scope.data),
        //     pageNum: 1
        // };

        // $scope.refresh = function(url) {
        //         $http.get(url)
        //             .success(function(result) {
        //                 $scope.data = result;
        //                 $scope.pageInfo.pageNum = 1;
        //                 $scope.pageInfo.hasNextPage = hasNextPage($scope.data);
        //             })
        //             .finally(function() {
        //                 // 停止广播ion-refresher
        //                 $scope.$broadcast('scroll.refreshComplete');
        //             });
        //     }
        //     //下拉刷新待分配
        // $scope.doRefresh = function() {
        //     return $scope.refresh('/home/otherNotice?type=0&p=0&c=10');
        // };

        // $scope.loadMore = function() {

        //     var type = '0';

        //     $http.get('/home/otherNotice', {
        //         params: {
        //             type: type,
        //             p: $scope.pageInfo.pageNum + 1,
        //             c: 10
        //         }
        //     }).success(function(result) {
        //         $scope.pageInfo.pageNum += 1;
        //         $scope.pageInfo.hasNextPage = hasNextPage(result);
        //         if (result.length) {
        //             for (var i = 0; i < result.length; i++) {
        //                 $scope.data.push(result[i]);
        //             }
        //         }
        //         $scope.$broadcast('scroll.infiniteScrollComplete');
        //     }).finally(function() {
        //         $scope.$broadcast('scroll.refreshComplete');
        //     });
        // };
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
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
angular.module('qjCommunity.home.index.otherNotice.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = [{
        id: '201508119273', //单子标记
        tit: '恭喜，你得到一份小区表扬',
        content: '在楼前新小区建设听证会上',
        createDate: "2015-10-13  12:39",
        latestState: "0",
    }, {
        id: '201508119273', //单子标记
        tit: '中奖了，中大奖了',
        content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
        createDate: "2015-10-13  12:39",
        latestState: "1",
    }, ];

    var result = mocksData.resetData(data);

    $httpBackend.whenGET(/\/home\/otherNotice/).respond(result);

}])
angular.module('qjCommunity.home.index.workNotice', [
    'ionic',
    'qjCommunity.home.index.workNotice.mock',
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('workNotice', {
        url: '/home/index/workNotice',
        controller: 'workNoticeController',
        templateUrl: 'home/index/workNotice/workNotice.tpl.html',
        cache: false,
        resolve: {
            resolvedData: ['$http', function($http) {
                return $http.get('/home/workNotice');
            }]
        },
        authorizedRuleType: ["1", "2", "3", "4", "5", "6"],
    })
}])

.controller('workNoticeController', ['$scope', '$http', 'resolvedData', '$state', '$ionicViewSwitcher', '$ionicTabsDelegate', '$ionicHistory', 'CurrentUserService',
    function($scope, $http, resolvedData, $state, $ionicViewSwitcher, $ionicTabsDelegate, $ionicHistory, CurrentUserService) {

        $scope.showTabBaoan = CurrentUserService.userSession().showTabBaoan;
        $scope.showTabBaojie = CurrentUserService.userSession().showTabBaojie;
        $scope.showTabWeixiu = CurrentUserService.userSession().showTabWeixiu;

        $scope.$on('$ionicView.enter', function() {
            $scope.currentTab = 'home/index';
            $ionicTabsDelegate.select(0);
        })

        $scope.data = resolvedData.data;

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
            return $scope.refresh('/home/workNotice?type=0&p=0&c=10');
        };

        $scope.loadMore = function() {

            var type = '0';

            $http.get('/home/workNotice', {
                params: {
                    type: type,
                    p: $scope.pageInfo.pageNum + 1,
                    c: 10
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
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
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
angular.module('qjCommunity.home.index.workNotice.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = {
        currentPage: "2", //当前页
        totalPages: "5", //总页数
        workNoticeList: [{
            id: '201508119273', //单子标记
            tit: '关于举办第7届员工运动会的通知', 
            content: '在楼前新小区建设听证会上',
            createDate: "2015-10-13  12:39",
            latestState: "0",
        }, {
            id: '201508119273', //单子标记
            tit: '关于举办第6届员工运动会的通知', 
            content: '在楼前新小区建设听证会上得知我楼前道路已被修改到这一项目前方，相邻单位及住户一致强烈反对。两个多月了，规划局还未同意施工的情况下，施工方每天干活，现已开槽挖出搂基一米多深了，业主跑遍市政府各职能部门都得不到制止。现院墙已出现开裂，工地宽度七十米多一点还包括这条单行道。',
            createDate: "2015-10-13  12:39",
            latestState: "1",
        }, ],
    };

    var result = mocksData.resetData(data);

    $httpBackend.whenGET(/\/home\/workNotice/).respond(result);

}])
//# sourceMappingURL=../maps/HTMLTest.js.map
