(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('fitness/fitness.tpl.html',
    '<ion-view class="fitnessCSS">\n' +
    '    <ion-nav-title>我的投诉</ion-nav-title>\n' +
    '    <ion-nav-view>\n' +
    '        <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '            <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefreshTwo()">\n' +
    '            </ion-refresher>\n' +
    '            <ion-list>\n' +
    '                <div class="listBottomHeight">\n' +
    '                    <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                        <div class="contentStyle">\n' +
    '                            <div class="headIcon"><img ng-src="{{item.src}}" /></div>\n' +
    '                            <div class=\'contentInfo\'>\n' +
    '                                <span class="name">{{item.name}}</span>\n' +
    '                                <span ng-if="item.userType == \'3\' " class="renzhengIcon"></span>\n' +
    '                                <div class="time">{{item.time}}</div>\n' +
    '                                <div class="content">{{ item.content | characters:15}}</div>\n' +
    '                            </div>\n' +
    '                            <!-- <div class="handInfo">\n' +
    '                                            <span class="handGayIcon"></span>\n' +
    '                                            <span>详情</span>\n' +
    '                                            <span>删除</span>\n' +
    '                                        </div> -->\n' +
    '                        </div>\n' +
    '                    </ion-item>\n' +
    '                </div>\n' +
    '            </ion-list>\n' +
    '            <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMoreTwo()" distance="0.5%">\n' +
    '            </ion-infinite-scroll>\n' +
    '        </ion-content>\n' +
    '    </ion-nav-view>\n' +
    '    <!-- </ion-tab>\n' +
    '</ion-tabs> -->\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('myPerformance/myPerformance.tpl.html',
    '<ion-view class="myPerformanceCSS">\n' +
    '    <ion-nav-title>我的业绩</ion-nav-title>\n' +
    '    <ion-tabs class="tabs-icon-top tabs-color-active-positive tabs-icon-only tabs-top">\n' +
    '        <ion-tab title="完成" class="ion-undistribution titleTabOne" on-select="alertA()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '                <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '                </ion-refresher>\n' +
    '                <ion-list>\n' +
    '                    <div class="listBottomHeight">\n' +
    '                        <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                            <a href="/workOrderDetails/{{item.repairId}}">\n' +
    '                                <div>\n' +
    '                                    <div class="hardInfo">\n' +
    '                                        <span class="left" ng-class="{yellow:item.memo==\'户内\',red:item.memo==\'公区\'}">[{{item.memo}}] 工单单号： {{item.repairId}}</span>\n' +
    '                                        <span class="right">{{item.userName}}{{item.userPhone}}</span>\n' +
    '                                    </div>\n' +
    '                                    <div class="content">\n' +
    '                                        <span>{{ item.content | characters:50}}</span>\n' +
    '                                    </div>\n' +
    '                                    <div class="infoBar">\n' +
    '                                        <p class="left">{{item.createDate}}</p>\n' +
    '                                        <p class="right">{{item.userAddress}}</p>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </a>\n' +
    '                        </ion-item>\n' +
    '                    </div>\n' +
    '                </ion-list>\n' +
    '                <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMore()" distance="1%" immediate-check="false">\n' +
    '                </ion-infinite-scroll>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="未完成" class="ion-distribution titleTabTwo" on-select="alertA()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '                <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefreshTwo()">\n' +
    '                </ion-refresher>\n' +
    '                <ion-list>\n' +
    '                    <div class="listBottomHeightTwo">\n' +
    '                        <ion-item class="com_list" ng-repeat="item in dataTwo">\n' +
    '                            <a href="/workOrderDetails/{{item.repairId}}">\n' +
    '                                <div>\n' +
    '                                    <div class="hardInfo">\n' +
    '                                        <span class="left" ng-class="{yellow:item.memo==\'户内\',red:item.memo==\'公区\'}">[{{item.memo}}] 工单单号： {{item.repairId}}</span>\n' +
    '                                        <span class="right">{{item.userName}}{{item.userPhone}}</span>\n' +
    '                                    </div>\n' +
    '                                    <div class="content">\n' +
    '                                        <span>{{ item.content | characters:50}}</span>\n' +
    '                                    </div>\n' +
    '                                    <div class="infoBar">\n' +
    '                                        <p class="left">{{item.createDate}}</p>\n' +
    '                                        <p class="right">{{item.userAddress}}</p>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </a>\n' +
    '                        </ion-item>\n' +
    '                    </div>\n' +
    '                </ion-list>\n' +
    '                <ion-infinite-scroll ng-if="pageInfoTwo.hasNextPage" on-infinite="loadMoreTwo()" distance="1%" immediate-check="false">\n' +
    '                </ion-infinite-scroll>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('myRota/myRota.tpl.html',
    '<ion-view class="myRotaCSS">\n' +
    '    <ion-nav-title>我的值班表</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="imgContent" ng-if="dataThree!=\'已签退\' ">\n' +
    '            <span ng-class="{unRegistration:dataThree==\'已签到\',registration:dataThree==\'未签到\'}" ng-click="signIn()"></span>\n' +
    '        </div>\n' +
    '        <div class="tapStyle">\n' +
    '            <div class="tabTop">\n' +
    '                <ul>\n' +
    '                    <li ng-class="{\'active\':sortShow == 0}" ng-click="changeItem(0);">日值班表</li>\n' +
    '                    <li ng-class="{\'active\':sortShow == 1}" ng-click="changeItem(1);">月值班表</li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '            <div class="selectDate">\n' +
    '                <span class="dataStyle" ng-click="openDatePicker()">{{selectedDate1| date :"yyyy-MM-dd"}}</span>\n' +
    '                <span class="confirm" ng-click="registration()"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div ng-if="sortShow==0">\n' +
    '            <div class="row header">\n' +
    '                <div class="col1">姓名</div>\n' +
    '                <div class="col2">排班时间</div>\n' +
    '                <div class="col3">签到时间</div>\n' +
    '                <div class="col4">状态</div>\n' +
    '            </div>\n' +
    '            <div ng-if="!showSend" class="row bodyInfo" ng-repeat="item in data">\n' +
    '                <div class="col">{{item.staffName}}</div>\n' +
    '                <div class="col gry">{{item.strWorkStartSet}}</div>\n' +
    '                <div class="col gry">{{item.strWorkEndSet}}</div>\n' +
    '                <div class="col gry">{{item.strWorkStartAt}}</div>\n' +
    '                <div class="col gry">{{item.strWorkEndAt}}</div>\n' +
    '                <div class="col" ng-class="{kuanggong:item.attendStatus==\'旷工\',tiaoxiu:item.attendStatus==\'调休\',zhengchang:item.attendStatus==\'正常\'}">\n' +
    '                    {{item.attendStatus}}\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div ng-if="showSend" class="row bodyInfo" ng-repeat="item in data">\n' +
    '                <div class="col">{{item.staffName}}</div>\n' +
    '                <div class="col gry">{{item.strWorkStartSet}}</div>\n' +
    '                <div class="col gry">{{item.strWorkEndSet}}</div>\n' +
    '                <div class="col gry">{{item.strWorkStartAt}}</div>\n' +
    '                <div class="col gry">{{item.strWorkEndAt}}</div>\n' +
    '                <div class="col">\n' +
    '                    <label class="selectbox">\n' +
    '                        <select ng-model="item.selectd" name="selectd" id="selectd" class="selectText" ng-class="{kuanggong:item.attendStatus==\'旷工\',tiaoxiu:item.attendStatus==\'调休\',zhengchang:item.attendStatus==\'正常\'}" ng-change="updateState(item.selectd,item)">\n' +
    '                            <option value="" selected>{{item.attendStatus}}</option>\n' +
    '                            <option>正常</option>\n' +
    '                            <option>调休</option>\n' +
    '                            <option>请假</option>\n' +
    '                            <option>旷工</option>\n' +
    '                        </select>\n' +
    '                    </label>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div ng-if="sortShow==1">\n' +
    '            <div class="row header">\n' +
    '                <div class="col1">日期</div>\n' +
    '                <div class="col2">排班时间</div>\n' +
    '                <div class="col3">签到时间</div>\n' +
    '                <div class="col4" ng-click="test()">状态</div>\n' +
    '            </div>\n' +
    '            <div ng-if="!showSend" class="row bodyInfo" ng-repeat="item in dataTwo">\n' +
    '                <div class="col">{{item.strSignInDate}}</div>\n' +
    '                <div class="col gry">{{item.strWorkStartSet}}</div>\n' +
    '                <div class="col gry">{{item.strWorkEndSet}}</div>\n' +
    '                <div class="col gry">{{item.strWorkStartAt}}</div>\n' +
    '                <div class="col gry">{{item.strWorkEndAt}}</div>\n' +
    '                <div class="col" ng-class="{kuanggong:item.attendStatus==\'旷工\',tiaoxiu:item.attendStatus==\'调休\',zhengchang:item.attendStatus==\'正常\'}">\n' +
    '                    {{item.attendStatus}}\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div ng-if="showSend" class="row bodyInfo" ng-repeat="item in dataTwo">\n' +
    '                <div class="col">{{item.strSignInDate}}</div>\n' +
    '                <div class="col gry">{{item.strWorkStartSet}}</div>\n' +
    '                <div class="col gry">{{item.strWorkEndSet}}</div>\n' +
    '                <div class="col gry">{{item.strWorkStartAt}}</div>\n' +
    '                <div class="col gry">{{item.strWorkEndAt}}</div>\n' +
    '                <div class="col">\n' +
    '                    <label class="selectbox">\n' +
    '                        <select ng-model="item.selectd" name="selectd" id="selectd" class="selectText" ng-class="{kuanggong:item.attendStatus==\'旷工\',tiaoxiu:item.attendStatus==\'调休\',zhengchang:item.attendStatus==\'正常\'}" ng-change="updateState(item.selectd,item)">\n' +
    '                            <option selected>{{item.attendStatus}}</option>\n' +
    '                            <option>正常</option>\n' +
    '                            <option>调休</option>\n' +
    '                            <option>请假</option>\n' +
    '                            <option>旷工</option>\n' +
    '                        </select>\n' +
    '                    </label>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('otherNoticeDetails/otherNoticeDetails.tpl.html',
    '<ion-view class="otherNoticeDetailsCSS">\n' +
    '    <ion-nav-title>工作通知</ion-nav-title>\n' +
    '    <ion-nav-buttons side="left">\n' +
    '        <a nav-direction="back" href="/home/index/otherNotice">\n' +
    '            <button class="backBtn"></button>\n' +
    '        </a>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="titleStyle">{{resolvedData.title}}</div>\n' +
    '        <div class="timeStyle">{{resolvedData.time}}</div>\n' +
    '        <div class="contentStyle">{{resolvedData.content}}</div>\n' +
    '        <ion-list>\n' +
    '            <ion-item ng-repeat="item in resolvedData.imageList">\n' +
    '                <div>\n' +
    '                    <img ng-src="{{item.src}}" />\n' +
    '                </div>\n' +
    '            </ion-item>\n' +
    '        </ion-list>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('outTapeDetails/outTapeDetails.tpl.html',
    '<ion-view class="outTapeDetailsCSS">\n' +
    '    <ion-nav-title>出门记录</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <ion-list>\n' +
    '            <div class="content">\n' +
    '                <div class="hardInfo">\n' +
    '                    <span class="left">{{data.ownerName}} 出门条</span>\n' +
    '                    <span class="right">【编号】：{{data.id}}</span>\n' +
    '                </div>\n' +
    '                <hr/>\n' +
    '                <div class="contentInfo">\n' +
    '                    <p>经办部门：{{data.depart}}</p>\n' +
    '                    <p>状态：{{data.status}}</p>\n' +
    '                    <p>出门时间：{{data.leaveTime}}</p>\n' +
    '                    <p>发布时间：{{data.createTime}}</p>\n' +
    '                    <p>携带物品：{{data.baggage}}</p>\n' +
    '                    <p>规格：{{data.baggageSize}}</p>\n' +
    '                    <p>批准人：{{data.name}}</p>\n' +
    '                    <p>车辆数量：{{data.carCount}}</p>\n' +
    '                    <p>车辆牌号：{{data.carNumber}}</p>\n' +
    '                </div>\n' +
    '                <ion-scroll zooming="true" direction="x" scrollbar-x="false" scrollbar-y="false" min-zoom="1" max-zoom="1" has-bouncing="true" class="imgHeight">\n' +
    '                    <ion-gallery ion-gallery-items="data.srcs" ion-gallery-row="data.srcs.length"></ion-gallery>\n' +
    '                </ion-scroll>\n' +
    '                <div class="center" ng-if="data.status != \'已放行\'">\n' +
    '                    <div class="buttonIcon" ng-click="allclear()"></div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </ion-list>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('outTapeHis/outTapeHis.tpl.html',
    '<ion-view class="outTapeHisCSS">\n' +
    '    <ion-nav-title>出门记录</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                    <a href="/outTapeDetails/{{item.id}}">\n' +
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
    '                    </a>\n' +
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('selectServiceman/selectServiceman.tpl.html',
    '<ion-view class="selectServiceman">\n' +
    '    <ion-nav-title>选择维修员</ion-nav-title>\n' +
    '    <ion-content class="itm">\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item ng-repeat="item in data.groupList">\n' +
    '                    <h6 ng-class="{\'showDept\':isShow}" ng-click="isShow=!isShow" class="h6">{{item.groupName}}</h6>\n' +
    '                    <ul ng-class="{\'hideDept\':!isShow}" class="deptList">\n' +
    '                        <li ng-repeat="member in item.memberList">\n' +
    '                            <div class="button radioBox">\n' +
    '                                <ion-radio ng-model="data.userId" ng-value="member.userId" name="data.userId">\n' +
    '                                    <div class="nameLocation">\n' +
    '                                        <span>{{member.name}}</span>\n' +
    '                                    </div>\n' +
    '                                    <div class="textRight">\n' +
    '                                        <span class="textColor">{{member.mobile}}</span>\n' +
    '                                        <span class="pngSize"></span>\n' +
    '                                    </div>\n' +
    '                                </ion-radio>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </ion-item>\n' +
    '            </div>\n' +
    '        </ion-list>\n' +
    '    </ion-content>\n' +
    '    <div class="bar bar-footer footerA" ng-click="sendServiceman()">\n' +
    '        <div class="title "><span style="color:#fff">即将派给</span></div>\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('sendOrders/sendOrders.tpl.html',
    '<ion-view class="sendOrdersCSS">\n' +
    '    <ion-nav-title>派单</ion-nav-title>\n' +
    '    <ion-content class="itm">\n' +
    '        <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                    <ion-checkbox class="checkBox" ng-model="filter.blue" ng-Change="addId(item.id)">\n' +
    '                        <div class="hardInfo">\n' +
    '                            <span class="left" style="color: red;">工单单号： {{item.id}}</span>\n' +
    '                            <span class="right">{{item.owner}}</span>\n' +
    '                        </div>\n' +
    '                        <div class="content">\n' +
    '                            <span>{{ item.content | characters:50}}</span>\n' +
    '                        </div>\n' +
    '                        <div class="infoBar">\n' +
    '                            <p class="left">{{item.createDate}}</p>\n' +
    '                            <p class="right">{{item.address}}</p>\n' +
    '                        </div>\n' +
    '                    </ion-checkbox>\n' +
    '                </ion-item>\n' +
    '            </div>\n' +
    '        </ion-list>\n' +
    '        <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMore()" distance="0.5%" immediate-check="false">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '    <div class="bar bar-footer footerA" ng-click="goSelectServiceman()">\n' +
    '        <div class="title "><span style="color:#fff">即将派给</span></div>\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('visivorPassageHis/visivorPassageHis.tpl.html',
    '<ion-view class="visivorPassageHisCSS">\n' +
    '    <ion-nav-title>访客记录</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                    <div class="hardInfo">\n' +
    '                        <span class="cordIcon"></span>\n' +
    '                        <span class="titleBlack">访客姓名：</span>\n' +
    '                        <span class="left">{{item.visitorName}}</span>\n' +
    '                        <span ng-if="item.car" class="right">同行：{{item.visitorNumber}}人+车</span>\n' +
    '                        <span ng-if="!item.car" class="right">同行：{{item.visitorNumber}}人</span>\n' +
    '                    </div>\n' +
    '                    <hr/>\n' +
    '                    <div class="content">\n' +
    '                        <p>访问业主：{{item.ownerName}}</p>\n' +
    '                        <p>到访时间：{{item.visitorTime}}</p>\n' +
    '                        <p>到访单位：{{item.address}}</p>\n' +
    '                    </div>\n' +
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('wordOrderHistory/wordOrderHistory.tpl.html',
    '<ion-view class="wordOrderHistoryCSS">\n' +
    '    <ion-nav-title>历史记录</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                    <a href="/workOrderDetails/{{item.id}}">\n' +
    '                        <div class="hardInfo">\n' +
    '                            <span class="left" ng-class="{yellow:item.type==\'户内\',red:item.type==\'公区\'}">[{{item.type}}] 工单单号： {{item.id}}</span>\n' +
    '                            <span class="right">{{item.owner}}</span>\n' +
    '                        </div>\n' +
    '                        <div class="content">\n' +
    '                            <span>{{ item.content | characters:50}}</span>\n' +
    '                        </div>\n' +
    '                        <div class="grade">\n' +
    '                            <p>质量评分 <span ng-class="{\'star\':item.qualityGrade >= i}" ng-repeat="i in [1,2,3,4,5]"></span></p>\n' +
    '                            <p>态度评分 <span ng-class="{\'star\':item.manerGrade >= i}" ng-repeat="i in [1,2,3,4,5]"></span></p>\n' +
    '                        </div>\n' +
    '                        <div class="infoBar">\n' +
    '                            <p class="left">{{item.createDate}}</p>\n' +
    '                            <p class="right">{{item.address}}</p>\n' +
    '                        </div>\n' +
    '                    </a>\n' +
    '                </ion-item>\n' +
    '            </div>\n' +
    '        </ion-list>\n' +
    '        <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMore()" distance="0.5%" immediate-check="  false">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('workNoticeDetails/workNoticeDetails.tpl.html',
    '<ion-view class="workNoticeDetailsCSS">\n' +
    '    <ion-nav-title>工作通知</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <ion-list>\n' +
    '            <div class="titleStyle">{{resolvedData.messageTitle}}</div>\n' +
    '            <div class="headStyle">{{resolvedData.messageCreateTime}}</div>\n' +
    '            <div class="headStyle">业主信息: {{resolvedData.messageSenderName}} {{resolvedData.messagePhone}}</div>\n' +
    '            <div class="headStyle">地址: {{resolvedData.address}}</div>\n' +
    '            <div class="contentStyle">内容: {{resolvedData.messageContent}}</div>\n' +
    '        </ion-list>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('workOrderDetails/workOrderDetails.tpl.html',
    '<ion-view class="workOrderDetailsCSS">\n' +
    '    <ion-nav-title>工单详情</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button" ng-click="chargeback()" ng-if="resolvedData.state==\'进行中\'">退单</button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" crollbar-y="false" padding="false">\n' +
    '        <div class="userInfor">\n' +
    '            <div class="userName">\n' +
    '                <span nameTitle>业主姓名</span>\n' +
    '                <span class="name">{{resolvedData.userName}}</span>\n' +
    '            </div>\n' +
    '            <hr/>\n' +
    '            <div class="userPhone">\n' +
    '                <span phoneTitle>业主电话</span>\n' +
    '                <div class="phoneRight">\n' +
    '                    <a href="tel:{{resolvedData.userPhone}}">\n' +
    '                        <span class="phone">{{resolvedData.userPhone}}</span>\n' +
    '                        <span class="phoneIcon"></span>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <hr/>\n' +
    '            <div class="userTime">\n' +
    '                <span timeTitle>报修时间</span>\n' +
    '                <span class="name">{{resolvedData.createDate}}</span>\n' +
    '            </div>\n' +
    '            <hr/>\n' +
    '            <div class="userAddress">\n' +
    '                <span addressTitle>报修地址</span>\n' +
    '                <span class="name">{{resolvedData.userAddress}}</span>\n' +
    '            </div>\n' +
    '            <hr/>\n' +
    '            <div class="repairInfor">\n' +
    '                <span phoneTitle ng-if="!showTabBaojie">报修事项</span>\n' +
    '                <span phoneTitle ng-if="showTabBaojie">报污事项</span>\n' +
    '                <div class="range" ng-if="!showTabBaojie">\n' +
    '                    <span ng-class="{notSelectTwo:resolvedData.type == \'户内\',notSelect:resolvedData.type == \'公区\'}"></span>\n' +
    '                    <span class="mind">户内报修</span>\n' +
    '                    <span ng-class="{selectTwo:resolvedData.type == \'户内\',select:resolvedData.type == \'公区\'}"></span>\n' +
    '                    <span>公区报修</span>\n' +
    '                </div>\n' +
    '                <div class="description">\n' +
    '                    <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{resolvedData.content}}</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="repairPhoto" ng-if="resolvedData.imageList.length>0">\n' +
    '            <div class="photo">\n' +
    '                <span class="titleIcon"></span>\n' +
    '                <span ng-if="!showTabBaojie">报修照片</span>\n' +
    '                <span ng-if="showTabBaojie">报污照片</span>\n' +
    '            </div>\n' +
    '            <div class="greenLine"></div>\n' +
    '            <div class="imgContent">\n' +
    '                <ion-scroll zooming="true" direction="x" scrollbar-x="false" scrollbar-y="false" min-zoom="1" max-zoom="1" has-bouncing="true" class="imgHeight">\n' +
    '                    <ion-gallery ion-gallery-items="resolvedData.imageList" ion-gallery-row="resolvedData.imageList.length" class=\'picList\'></ion-gallery>\n' +
    '                </ion-scroll>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="repairProgress">\n' +
    '            <div class="progress">\n' +
    '                <span class="titleIcon"></span>\n' +
    '                <span>处理进展</span>\n' +
    '            </div>\n' +
    '            <div class="blueLine"></div>\n' +
    '            <div class="repairConfirmContent">\n' +
    '                <div ng-repeat="item in repairConfirmData">\n' +
    '                    <p ng-class="{black:item.messageSource==\'员工\',yellow:item.messageSource==\'业主\'}"><span>{{item.date}}</span> {{item.content}}</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="item item-input-inset" ng-if="resolvedData.state==\'进行中\'">\n' +
    '                <label class="item-input-wrapper">\n' +
    '                    <input type="text" ng-model="repairConfirmData.content" placeholder="在此更新维修进度">\n' +
    '                </label>\n' +
    '            </div>\n' +
    '            <div class="imgBox pictures" ng-if="resolvedData.state==\'进行中\'">\n' +
    '                <p>请添加处理后图片</p>\n' +
    '                <ion-scroll direction="x" scrollbar-x="false" scroll="true" class="scrollBox imgList">\n' +
    '                    <ul>\n' +
    '                        <li class="itemPicture" ng-click="deletePicture($index)" ng-repeat="pictureItem in data.imageFinishList">\n' +
    '                            <img ng-src="{{pictureItem}}" mr-img-convert imgw="1.2" imgh="1.2" />\n' +
    '                        </li>\n' +
    '                        <li class="cameraBtn" ng-click="addAttachment()"></li>\n' +
    '                        <li class="addImgBtn" ng-click="addPic()"></li>\n' +
    '                    </ul>\n' +
    '                </ion-scroll>\n' +
    '            </div>\n' +
    '            <div class="bottomHeight" ng-if="resolvedData.state==\'已结束\' && data.imageFinishList.length>0">\n' +
    '                <p>处理后图片</p>\n' +
    '                <ion-scroll zooming="true" direction="x" scrollbar-x="false" scrollbar-y="false" min-zoom="1" max-zoom="1" has-bouncing="true" class="imgHeight">\n' +
    '                    <ion-gallery ion-gallery-items="data.imageFinishList" ion-gallery-row="data.imageFinishList.length" class=\'picList\'></ion-gallery>\n' +
    '                </ion-scroll>\n' +
    '            </div>\n' +
    '            <div ng-if="resolvedData.state==\'进行中\' ">\n' +
    '                <!-- <div ng-if="true"> -->\n' +
    '                <div class="addButton" ng-click="addTaskContent()"></div>\n' +
    '                <div class="disposeOverButton" ng-click="overVerifyConfirm()"></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="evaluation" ng-if="resolvedData.qualityGrade!=null || resolvedData.manerGrade!=null && resolvedData.state==\'已评价\' ">\n' +
    '            <div class="evaluationTitle">\n' +
    '                <span class="titleIcon"></span>\n' +
    '                <span>业主已评价</span>\n' +
    '            </div>\n' +
    '            <div class="yellowLine"></div>\n' +
    '            <div class="finishStatus">\n' +
    '                <p class="mark">维修质量</p>\n' +
    '                <div class="finishDiv">\n' +
    '                    <p class="showPraise">\n' +
    '                        <span class=\'praise\' ng-class="{redFlower:resolvedData.qualityGrade>=i}" ng-repeat=" i in [1,2,3,4,5]"></span><span class=\'praiseMark\'>{{resolvedData.qualityGrade}}</span>\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="finishStatus">\n' +
    '                <p class="mark">服务态度</p>\n' +
    '                <div class="finishDiv">\n' +
    '                    <p class="showPraise">\n' +
    '                        <span class=\'praise\' ng-class="{redFlower:resolvedData.manerGrade>=i}" ng-repeat=" i in [1,2,3,4,5]"></span><span class=\'praiseMark\'>{{resolvedData.manerGrade}}</span>\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="evaluationContent">{{resolvedData.gradeContent}}</div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '    </ion-view');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
    '                    <a href="/workOrderDetails/{{item.id}}">\n' +
    '                        <div>\n' +
    '                            <div class="hardInfo">\n' +
    '                                <span class="left">工单单号： {{item.id}}</span>\n' +
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
    '                    </a>\n' +
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
    '                        <a href="/workOrderDetails/{{item.messagePropertId}}">\n' +
    '                            <div>\n' +
    '                                <div class="hardInfo">\n' +
    '                                    <span class="left" ng-class="{hong : item.messageTitle==\'公区\'||item.messageTitle==\'户内\',huang:item.messageTitle==\'报污\'}">[{{item.messageTitle}}] 工单单号： {{item.messagePropertId}}</span>\n' +
    '                                    <span class="right">{{getOwner(item.messageSenderName)}} {{item.messagePhone}}</span>\n' +
    '                                </div>\n' +
    '                                <div class="content">\n' +
    '                                    <span>{{ item.messageContent | characters:50}}</span>\n' +
    '                                </div>\n' +
    '                                <!-- <div class="button-center">\n' +
    '                                </div> -->\n' +
    '                                <div class="infoBar">\n' +
    '                                    <p class="left">{{item.messageCreateTime}}</p>\n' +
    '                                    <p class="right">{{item.address}}</p>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                    </div>\n' +
    '                    <div ng-if="item.messageType==103" || ng-if="item.messageType==104">\n' +
    '                        <a href="/workNoticeDetails/{{item.messageTargetId}}">\n' +
    '                            <div>\n' +
    '                                <div class="hardInfo">\n' +
    '                                    <span class="left">{{item.messageTitle}}</span>\n' +
    '                                    <span class="right">{{item.messageCreateTime}}</span>\n' +
    '                                </div>\n' +
    '                                <div class="content">\n' +
    '                                    <span>{{ item.messageContent | characters:50}}</span>\n' +
    '                                </div>\n' +
    '                                <div class="infoBar">\n' +
    '                                    <p class="rightTwo">{{item.address}}</p>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/index/index.tpl.html',
    '<!-- <ion-view>\n' +
    '    <ion-nav-title class="linkDiv">\n' +
    '        <span href="" class="fristlink" nav-direction="swap">派单通知</span>\n' +
    '        <a href="/home/index/workNotice" nav-direction="swap" class="mindlink">工作通知</a>\n' +
    '        <a href="/home/index/otherNotice" nav-direction="swap" class="lastlink">其他通知</a>\n' +
    '    </ion-nav-title>\n' +
    '    <div ng-if="showTabWeixiu" ng-include="\'home/tab/weixiutab/weiXiuTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaojie" ng-include="\'home/tab/baojietab/baojieTab.tpl.html\'">\n' +
    '    </div>\n' +
    '    <div ng-if="showTabBaoan" ng-include="\'home/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view> -->\n' +
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
    '                    <a href="/outTapeDetails/{{item.id}}">\n' +
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
    '                    </a>\n' +
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
    '                        <a href="/workOrderDetails/{{item.id}}">\n' +
    '                            <div>\n' +
    '                                <div class="hardInfo">\n' +
    '                                    <span class="left" ng-class="{yellow:item.type==\'户内\'}">[{{item.type}}] 工单单号： {{item.id}}</span>\n' +
    '                                    <span class="right">{{item.owner}}</span>\n' +
    '                                </div>\n' +
    '                                <div class="content">\n' +
    '                                    <span>{{ item.content | characters:50}}</span>\n' +
    '                                </div>\n' +
    '                                <div class="infoBar">\n' +
    '                                    <p class="left">{{item.createDate}}</p>\n' +
    '                                    <p class="right">{{item.address}}</p>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
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
    '                        <a href="/workOrderDetails/{{item.id}}">\n' +
    '                            <div>\n' +
    '                                <div class="hardInfo">\n' +
    '                                    <span class="left" ng-class="{red:item.type==\'公区\'}">[{{item.type}}] 工单单号： {{item.id}}</span>\n' +
    '                                    <span class="right">{{item.owner}}</span>\n' +
    '                                </div>\n' +
    '                                <div class="content">\n' +
    '                                    <span>{{ item.content | characters:50}}</span>\n' +
    '                                </div>\n' +
    '                                <div class="infoBar">\n' +
    '                                    <p class="left">{{item.createDate}}</p>\n' +
    '                                    <p class="right">{{item.address}}</p>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/index/otherNotice/content.tpl.html',
    '<ion-view class="otherNoticeStyle" hide-nav-bar="true">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <!-- <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '        </ion-refresher> -->\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item class="com_list" ng-repeat="item in data">\n' +
    '                    <a href="/otherNoticeDetails">\n' +
    '                       \n' +
    '                    </a>\n' +
    '                </ion-item>\n' +
    '            </div>\n' +
    '        </ion-list>\n' +
    '        <!-- <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMore()" distance="0.5%">\n' +
    '        </ion-infinite-scroll> -->\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/index/otherNotice/otherNotice.tpl.html',
    '<ion-view>\n' +
    '    <ion-nav-title class="linkDivOtherNotic">\n' +
    '        <a href="/home/index" nav-direction="swap" class="fristlink">派单通知</a>\n' +
    '        <a href="/home/index/workNotice" nav-direction="swap" class="mindlink">工作通知</a>\n' +
    '        <span href="" nav-direction="swap" class="lastlink">其他通知</span>\n' +
    '    </ion-nav-title>\n' +
    '    <div ng-if="showTabWeixiu" ng-include="\'home/tab/weixiutab/otherNoticeTab.tpl.html\'">\n' +
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/index/workNotice/content.tpl.html',
    '<ion-view class="workNoticeStyle" hide-nav-bar="true">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '        <ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <ion-list>\n' +
    '            <div class="listBottomHeight">\n' +
    '                <ion-item class="com_list" ng-repeat="item in data.workNoticeList">\n' +
    '                    <a href="/workNoticeDetails">\n' +
    '                        <span class="new" ng-if="item.latestState==0"></span>\n' +
    '                        <div class="hardInfo">\n' +
    '                            <span class="left" ng-class="{hong : item.latestState==0}">{{item.tit}}</span>\n' +
    '                            <span class="right">{{item.createDate}}</span>\n' +
    '                        </div>\n' +
    '                        <div class="content">\n' +
    '                            <span>{{ item.content | characters:50}}</span>\n' +
    '                        </div>\n' +
    '                    </a>\n' +
    '                </ion-item>\n' +
    '            </div>\n' +
    '        </ion-list>\n' +
    '        <ion-infinite-scroll ng-if="pageInfo.hasNextPage" on-infinite="loadMore()" distance="0.5%">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/index/workNotice/workNotice.tpl.html',
    '<ion-view>\n' +
    '    <ion-nav-title class="linkDivWorkNotic">\n' +
    '        <a href="/home/index" nav-direction="swap" class="fristlink">派单通知</a>\n' +
    '        <span href="" nav-direction="swap" class="mindlink">工作通知</span>\n' +
    '        <a href="/home/index/otherNotice" nav-direction="swap" class="lastlink">其他通知</a>\n' +
    '    </ion-nav-title>\n' +
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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
  module = angular.module('HTMLTest.templates');
} catch (e) {
  module = angular.module('HTMLTest.templates', []);
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

//# sourceMappingURL=../maps/HTMLTest.templates.js.map
