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