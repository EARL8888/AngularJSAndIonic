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