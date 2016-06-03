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