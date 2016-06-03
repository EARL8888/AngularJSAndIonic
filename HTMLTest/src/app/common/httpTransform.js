angular.module('qjCommunity.common.httpTransform', [
    'ionic',
    'qjCommunity.app.config'
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('commonResponseParser');
}])

.factory('commonResponseParser', ['$q', 'HTTP_COMMON_ERROR_MESSAGE', '$rootScope', function($q, HTTP_COMMON_ERROR_MESSAGE, $rootScope) {
    return {
        response: function(response) {
            if (!!response.config.url.match('.tpl.html'))
                return response;
            if (response.data && response.data.code === 0 && response.data.data.roleId != "9" && response.data.data.roleId != "10" && response.data.data.roleId != "11" && response.data.data.roleId != "12") {
                response.data = response.data.data;
                return response;
            } else if (response.data.msg) {
                if (response.data.msg == "当前未登录" || response.data.msg == "您的账号已在其他地方登录。") {
                    $rootScope.$broadcast('tokenBug', [response.data.msg]);
                };
                if (response.data.data.roleId == "9" || response.data.data.roleId == "10" || response.data.data.roleId == "11" || response.data.data.roleId == "12") {
                    response.data.msg="用户名或密码错误";
                    return $q.reject({
                        data: response.data.msg,
                        status: response.status,
                        headers: response.headers,
                    });
                } else {
                    return $q.reject({
                        data: response.data.msg,
                        status: response.status,
                        headers: response.headers
                    });
                }
            } else {
                return $q.reject(response);
            }
        },
        responseError: function(rejection) {
            return $q.reject(HTTP_COMMON_ERROR_MESSAGE);
        }
    };
}])