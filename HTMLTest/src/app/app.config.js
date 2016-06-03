angular.module('qjCommunity.app.config', [
    'ionic'
])

//contants
.constant('ApiBaseUrl', 'http://hxsq.hxsq2016.com:8080/')
    // .constant('ApiBaseUrl', 'http://172.16.1.19:8080/')
    .constant('AppDefaultRootUrl', '/blankPage')
    // .constant('AppDefaultRootUrl', '/home/index')
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
        $urlRouterProvider.otherwise(AppDefaultRootUrl);//默认加载的路由
    }])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])