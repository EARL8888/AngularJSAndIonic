angular.module('qjCommunity.login.mock', [
    'ngMockE2E', 'qjCommunity.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenGET('/workOrder/getUserRole').passThrough();

    $httpBackend.whenPOST('/user/loginForStaff').passThrough();

}])