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