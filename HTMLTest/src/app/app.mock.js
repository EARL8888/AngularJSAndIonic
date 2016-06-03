angular.module('qjCommunity.app.mock', [
    'ngMockE2E',
    'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenGET('/workbench/staffVersion/1').passThrough();
    $httpBackend.whenGET('/workbench/staffVersion/2').passThrough();
}])
