(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/cleanWorkOrder/cleanWorkOrder.tpl.html',
    '<ion-view>\n' +
    '    <ion-nav-buttons side="left">\n' +
    '        <a href="/sendOrders">\n' +
    '            <button ng-if="showSend" class="button">派单</button>\n' +
    '        </a>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <a href="/wordOrderHistory">\n' +
    '            <button class="button">历史记录</button>\n' +
    '        </a>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-nav-title>保洁工单</ion-nav-title>\n' +
    '    <div ng-if="showTabWeixiu" ng-include="\'home/tab/weixiutab/weiXiuTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaojie" ng-include="\'home/tab/baojietab/baojieTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaoan" ng-include="\'home/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/cleanWorkOrder/content.tpl.html',
    '<ion-view class="cleanWorkOrderStyle">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                    <div>\n' +
    '                        <div class="hardInfo">\n' +
    '                            <span class="left">工单单号： {{item.id}}</span>\n' +
    '                            <span class="right">{{item.owner}}</span>\n' +
    '                        </div>\n' +
    '                        <div class="content">\n' +
    '                            <span>{{ item.content | characters:50}}</span>\n' +
    '                        </div>\n' +
    '                        <div class="infoBar">\n' +
    '                            <p class="left">{{item.createDate}}</p>\n' +
    '                            <p class="right">{{item.address}}</p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </ion-item>\n' +
    '            </div>\n' +
    '        </ion-list>\n' +
    '        <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMore()" distance="1%" immediate-check="false">\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/mineWork/content.tpl.html',
    '<ion-view class="WorkStyle">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="banner">\n' +
    '            <p class="head"><img ng-src="{{data.workBenchDTO.logo}}" mr-img-convert imgw="1.9" imgh="1.9" /></p>\n' +
    '            <p class="info">{{data.workBenchDTO.userName}}</p>\n' +
    '        </div>\n' +
    '        <div class="list card menuList">\n' +
    '            <a href="/myPerformance" nav-direction="forward" class="item item-icon-left" ng-if="!showTabBaoan">\n' +
    '                <i class="icon ion-data"></i><span class="handText">我的业绩</span>\n' +
    '            </a>\n' +
    '            <a href="/fitness" ng-click="changeNumber()" nav-direction="forward" class="item item-icon-left">\n' +
    '                <i class="icon ion-commend"></i><span class="handText">我的投诉</span>\n' +
    '                <!-- <span ng-if="data.workBenchDTO.countPraise>0" class="remindOne">{{data.workBenchDTO.countPraise}}</span> -->\n' +
    '            </a>\n' +
    '            <a href="/myRota" nav-direction="forward" class="item item-icon-left">\n' +
    '                <i class="icon ion-contact"></i><span class="handText">我的值班表</span>\n' +
    '            </a>\n' +
    '            <div nav-direction="forward" class="item item-icon-left" ng-click="checkVersion()">\n' +
    '                <i class="icon ion-version"></i><span class="handText">版本信息</span>\n' +
    '                <div class="versionTwo">\n' +
    '                    <span ng-if="data.workBenchDTO.version>version" class="remindTwo">\n' +
    '                    </span class="handText">V {{version}}\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="list card menuList">\n' +
    '            <div nav-direction="forward" class="item item-icon-left">\n' +
    '                <i class="icon ion-quit"></i>\n' +
    '                <div class="quit" ng-click="dropOut()"><span class="handText">退出登录</span></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/mineWork/mineWork.tpl.html',
    '<ion-view>\n' +
    '    <ion-nav-title>我的工作台</ion-nav-title>\n' +
    '    <div ng-if="showTabWeixiu" ng-include="\'home/tab/weixiutab/weiXiuTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaojie" ng-include="\'home/tab/baojietab/baojieTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaoan" ng-include="\'home/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/index/content.tpl.html',
    '<ion-view class="IndexPageStyle" hide-nav-bar="true">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                    <div ng-if="item.messageType==105 || item.messageType==106">\n' +
    '                        <div>\n' +
    '                            <div class="hardInfo">\n' +
    '                                <span class="left" ng-class="{hong : item.messageTitle==\'公区\'||item.messageTitle==\'户内\',huang:item.messageTitle==\'报污\'}">[{{item.messageTitle}}] 工单单号： {{item.messagePropertId}}</span>\n' +
    '                                <span class="right">{{getOwner(item.messageSenderName)}} {{item.messagePhone}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="content">\n' +
    '                                <span>{{ item.messageContent | characters:50}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="infoBar">\n' +
    '                                <p class="left">{{item.messageCreateTime}}</p>\n' +
    '                                <p class="right">{{item.address}}</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div ng-if="item.messageType==103" || ng-if="item.messageType==104">\n' +
    '                        <!-- <a href="/workNoticeDetails/{{item.messageTargetId}}"> -->\n' +
    '                        <div>\n' +
    '                            <div class="hardInfo">\n' +
    '                                <span class="left">{{item.messageTitle}}</span>\n' +
    '                                <span class="right">{{item.messageCreateTime}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="content">\n' +
    '                                <span>{{ item.messageContent | characters:50}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="infoBar">\n' +
    '                                <p class="rightTwo">{{item.address}}</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- </a> -->\n' +
    '                    </div>\n' +
    '                    <ion-option-button class="button-positive" ng-click="delete($index,item.messageTargetId)">删除</ion-option-button>\n' +
    '                </ion-item>\n' +
    '            </div>\n' +
    '        </ion-list>\n' +
    '        <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMore()" distance="1%" immediate-check="false">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/index/index.tpl.html',
    '<ion-view>\n' +
    '    <ion-nav-title>消息通知</ion-nav-title>\n' +
    '    <div ng-if="showTabWeixiu" ng-include="\'home/tab/weixiutab/weiXiuTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaojie" ng-include="\'home/tab/baojietab/baojieTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaoan" ng-include="\'home/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/outTape/content.tpl.html',
    '<ion-view class="outTapeStyle">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item class="com_list" ng-repeat="item in data">\n' +
    '<!--                     <a href="/outTapeDetails/{{item.id}}"> -->\n' +
    '                        <div>\n' +
    '                            <div class="hardInfo">\n' +
    '                                <span class="left">{{item.ownerName}} 出门条</span>\n' +
    '                                <span class="right">出门时间：{{item.leaveTime}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="content">\n' +
    '                                <span>{{ item.carNumber | characters:15}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="infoBar">\n' +
    '                                <p class="left">{{item.createTime}}</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    <!-- </a> -->\n' +
    '                </ion-item>\n' +
    '            </div>\n' +
    '        </ion-list>\n' +
    '        <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMore()" distance="0.5%" immediate-check="false">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/outTape/outTape.tpl.html',
    '<ion-view>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <a href="/outTapeHis">\n' +
    '            <button class="button">出门记录</button>\n' +
    '        </a>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-nav-title>出门条</ion-nav-title>\n' +
    '    <div ng-if="showTabWeixiu" ng-include="\'home/tab/weixiutab/weiXiuTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaojie" ng-include="\'home/tab/baojietab/baojieTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaoan" ng-include="\'home/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/tab/tab.tpl.html',
    '<ion-view ng-controller="HomeTabController">\n' +
    '    <ion-tabs class="tabs-icon-top tabs-color-active-positive tabs-icon-only footTabs">\n' +
    '        <ion-tab title="" icon-off="ion-index" icon-on="ion-index-active" ng-click="goTab(\'home/index\')" href="/home/index">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/index\')" ng-if="isActived(\'home/index\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-contact" icon-on="ion-contact-active" ng-click="goTab(\'home/outTape\')" href="/home/outTape">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/outTape\')" ng-if="isActived(\'home/outTape\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-groupBuy" icon-on="ion-groupBuy-active" ng-click="goTab(\'home/visivorPassage\')" href="/home/visivorPassage">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/visivorPassage\')" ng-if="isActived(\'home/visivorPassage\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-mine" icon-on="ion-mine-active" ng-click="goTab(\'home/mineWork\')" href="/home/mineWork">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/mineWork\')" ng-if="isActived(\'home/mineWork\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/visivorPassage/content.tpl.html',
    '<ion-view class="visivorPassageStyle">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="barcodeIcon" ng-click="barcode()"></div>\n' +
    '        <div ng-if="showContent">\n' +
    '            <div class="content">\n' +
    '                <p>资料扫描成功,访客信息如下:</p>\n' +
    '                <div class="headInfor">\n' +
    '                    <span class="head">访客:</span>\n' +
    '                    <span class="headContent">{{data.visitor}} {{data.sex}}</span>\n' +
    '                    <br/>\n' +
    '                    <span class="head">到访:</span>\n' +
    '                    <span class="headContent">{{data.address}}</span>\n' +
    '                    <br/>\n' +
    '                    <span class="head">业主:</span>\n' +
    '                    <span class="headContent">{{data.owner}}</span>\n' +
    '                    <br/>\n' +
    '                    <span class="head">访客车牌:</span>\n' +
    '                    <span class="headContent">{{data.number}}</span>\n' +
    '                    <br/>\n' +
    '                    <span class="head">到访时间:</span>\n' +
    '                    <span class="headContent">{{data.date}}</span>\n' +
    '                    <br/>\n' +
    '                </div>\n' +
    '                <div class="footInfor">\n' +
    '                    <span>同行:</span>\n' +
    '                    <span>{{data.count}}人</span>\n' +
    '                    <br/>\n' +
    '                    <br/>\n' +
    '                    <span>{{data.mobile}}</span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="release">\n' +
    '                <div class="releaseIcon" ng-click="release()">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/visivorPassage/visivorPassage.tpl.html',
    '<ion-view>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <a href="/visivorPassageHis">\n' +
    '            <button class="button">访客记录</button>\n' +
    '        </a>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-nav-title>访客通行</ion-nav-title>\n' +
    '    <div ng-if="showTabWeixiu" ng-include="\'home/tab/weixiutab/weiXiuTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaojie" ng-include="\'home/tab/baojietab/baojieTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaoan" ng-include="\'home/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/workOrder/content.tpl.html',
    '<ion-view class="workOrderStyle">\n' +
    '    <div ng-class="{tabTopAndroid:showTabStyle,tabTopIOS:!showTabStyle}">\n' +
    '        <ul>\n' +
    '            <li ng-class="{\'active\':sortShow == 0}" ng-click="changeItem(0);">户内报修</li>\n' +
    '            <span class="borderRight"></span>\n' +
    '            <li ng-class="{\'active\':sortShow == 1}" ng-click="changeItem(1);">公区报修</li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <div ng-if="sortShow == 0">\n' +
    '            <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '            </ion-refresher>\n' +
    '            <ion-list>\n' +
    '                <div ng-class="{listBottomHeightAndroid:showTabStyle,listBottomHeightIOS:!showTabStyle}">\n' +
    '                    <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                        <!-- <a href="/workOrderDetails/{{item.id}}"> -->\n' +
    '                        <div>\n' +
    '                            <div class="hardInfo">\n' +
    '                                <span class="left" ng-class="{yellow:item.type==\'户内\'}">[{{item.type}}] 工单单号： {{item.id}}</span>\n' +
    '                                <span class="right">{{item.owner}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="content">\n' +
    '                                <span>{{ item.content | characters:50}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="infoBar">\n' +
    '                                <p class="left">{{item.createDate}}</p>\n' +
    '                                <p class="right">{{item.address}}</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- </a> -->\n' +
    '                    </ion-item>\n' +
    '                </div>\n' +
    '            </ion-list>\n' +
    '            <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMore()" distance="1%" immediate-check="false">\n' +
    '            </ion-infinite-scroll>\n' +
    '        </div>\n' +
    '        <div ng-if="sortShow == 1">\n' +
    '            <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefreshTwo()">\n' +
    '            </ion-refresher>\n' +
    '            <ion-list>\n' +
    '                <div ng-class="{listBottomHeightAndroid:showTabStyle,listBottomHeightIOS:!showTabStyle}">\n' +
    '                    <ion-item class="com_list" ng-repeat="item in dataTwo">\n' +
    '                        <!-- <a href="/workOrderDetails/{{item.id}}"> -->\n' +
    '                        <div>\n' +
    '                            <div class="hardInfo">\n' +
    '                                <span class="left" ng-class="{red:item.type==\'公区\'}">[{{item.type}}] 工单单号： {{item.id}}</span>\n' +
    '                                <span class="right">{{item.owner}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="content">\n' +
    '                                <span>{{ item.content | characters:50}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="infoBar">\n' +
    '                                <p class="left">{{item.createDate}}</p>\n' +
    '                                <p class="right">{{item.address}}</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- </a> -->\n' +
    '                    </ion-item>\n' +
    '                </div>\n' +
    '            </ion-list>\n' +
    '            <ion-infinite-scroll ng-if="pageInfoTwo.hasNextPage" on-infinite="loadMoreTwo()" distance="1%" immediate-check="false">\n' +
    '            </ion-infinite-scroll>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/workOrder/workOrder.tpl.html',
    '<ion-view>\n' +
    '    <ion-nav-buttons side="left">\n' +
    '        <a href="/sendOrders">\n' +
    '            <button ng-if="showSend" class="button">派单</button>\n' +
    '        </a>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <a href="/wordOrderHistory">\n' +
    '            <button class="button">历史记录</button>\n' +
    '        </a>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-nav-title>报修接单</ion-nav-title>\n' +
    '    <div ng-if="showTabWeixiu" ng-include="\'home/tab/weixiutab/weiXiuTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaojie" ng-include="\'home/tab/baojietab/baojieTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaoan" ng-include="\'home/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userServers/blankPage/blankPage.tpl.html',
    '<ion-view class="blankPageStyle">\n' +
    '	\n' +
    ' </ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userServers/login/login.tpl.html',
    '<ion-modal-view hide-nav-bar="true" ng-controller="LoginController" class="LoginPagesStyle">\n' +
    '    <ion-content has-bouncing="false" ng-show="pageShow.login" class="LoginPageStyle">\n' +
    '        <div class="head"></div>\n' +
    '        <form name="loginForm" ng-submit="login(credentials,loginForm);" novalidate>\n' +
    '            <div class="list">\n' +
    '                <label class="item item-input">\n' +
    '                    <span class="inputName">账号</span>\n' +
    '                    <input type="text" id="username" ng-model="credentials.username" required>\n' +
    '                </label>\n' +
    '                <label class="item item-input">\n' +
    '                    <span class="inputName">密码</span>\n' +
    '                    <input type="password" id="password" ng-model="credentials.password" required>\n' +
    '                </label>\n' +
    '            </div>\n' +
    '            <button type="submit" ng-disabled="loginForm.$submitted" class="button">登录</button>\n' +
    '        </form>\n' +
    '    </ion-content>\n' +
    '</ion-modal-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/tab/baojietab/baojieTab.tpl.html',
    '<ion-view ng-controller="HomeTabController">\n' +
    '    <ion-tabs class="tabs-icon-top tabs-color-active-positive tabs-icon-only footTabs">\n' +
    '        <ion-tab title="" icon-off="ion-index" icon-on="ion-index-active" ng-click="goTab(\'home/index\')" href="/home/index">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/index\')" ng-if="isActived(\'home/index\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-groupBuy_baojie" icon-on="ion-groupBuy-active_baojie" ng-click="goTab(\'home/cleanWorkOrder\')" href="/home/cleanWorkOrder">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/cleanWorkOrder\')" ng-if="isActived(\'home/cleanWorkOrder\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-mine_weixiu" icon-on="ion-mine-active_weixiu" ng-click="goTab(\'home/mineWork\')" href="/home/mineWork">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/mineWork\')" ng-if="isActived(\'home/mineWork\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/tab/weixiutab/otherNoticeTab.tpl.html',
    '<ion-view ng-controller="HomeTabController">\n' +
    '    <ion-tabs class="tabs-icon-top tabs-color-active-positive tabs-icon-only footTabs">\n' +
    '        <ion-tab title="" icon-off="ion-index" icon-on="ion-index-active" ng-click="goTab(\'otherNotice\')" href="/home/index/otherNotice">\n' +
    '            <div ng-include="\'home/index/otherNotice/content.tpl.html\'">\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-groupBuy_weixiu" icon-on="ion-groupBuy-active_weixiu" ng-click="goTab(\'home/workOrder\')" href="/home/workOrder">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/workOrder\')" ng-if="isActived(\'home/workOrder\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-mine_weixiu" icon-on="ion-mine-active_weixiu" ng-click="goTab(\'home/mineWork\')" href="/home/mineWork">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/mineWork\')" ng-if="isActived(\'home/mineWork\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/tab/weixiutab/weiXiuTab.tpl.html',
    '<ion-view ng-controller="HomeTabController">\n' +
    '    <ion-tabs class="tabs-icon-top tabs-color-active-positive tabs-icon-only footTabs">\n' +
    '        <ion-tab title="" icon-off="ion-index" icon-on="ion-index-active" ng-click="goTab(\'home/index\')" href="/home/index">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/index\')" ng-if="isActived(\'home/index\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-groupBuy_weixiu" icon-on="ion-groupBuy-active_weixiu" ng-click="goTab(\'home/workOrder\')" href="/home/workOrder">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/workOrder\')" ng-if="isActived(\'home/workOrder\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-mine_weixiu" icon-on="ion-mine-active_weixiu" ng-click="goTab(\'home/mineWork\')" href="/home/mineWork">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/mineWork\')" ng-if="isActived(\'home/mineWork\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('qjCommunity.templates');
} catch (e) {
  module = angular.module('qjCommunity.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/tab/weixiutab/workNoticeTab.tpl.html',
    '<ion-view ng-controller="HomeTabController">\n' +
    '    <ion-tabs class="tabs-icon-top tabs-color-active-positive tabs-icon-only footTabs">\n' +
    '        <ion-tab title="" icon-off="ion-index_weixiu" icon-on="ion-index-active_weixiu" ng-click="goTab(\'workNotice\')" href="/home/index/workNotice">\n' +
    '            <div ng-include="\'home/index/workNotice/content.tpl.html\'">\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-groupBuy_weixiu" icon-on="ion-groupBuy-active_weixiu" ng-click="goTab(\'home/workOrder\')" href="/home/workOrder">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/workOrder\')" ng-if="isActived(\'home/workOrder\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="" icon-off="ion-mine_weixiu" icon-on="ion-mine-active_weixiu" ng-click="goTab(\'home/mineWork\')" href="/home/mineWork">\n' +
    '            <ion-view ng-include="getContentTpl(\'home/mineWork\')" ng-if="isActived(\'home/mineWork\')"></ion-view>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '</ion-view>');
}]);
})();

//# sourceMappingURL=../maps/qjCommunity.templates.js.map
