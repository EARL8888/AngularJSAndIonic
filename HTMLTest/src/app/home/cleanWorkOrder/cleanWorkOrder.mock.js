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