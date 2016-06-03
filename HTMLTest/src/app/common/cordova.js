if (!isApp) {
    var module = angular.module('qjCommunity.common.cordova', [])
    module.factory('MrCamera', [function() {
        return {
            getPicture: function() {
                alert("没有硬件");
            },
        };
    }])
    module.factory('MrImagePicker', [function() {
        return {
            getPictures: function() {
                alert("没有硬件");
            },
        };
    }])
    module.factory('MrDevice', [function() {
        return {
            getDevice: function() {},
        };
    }])
    module.factory('MrBarcodeScanner', [function() {
        return {
            scan: function() {
                alert("没有硬件");
            },
        };
    }])
} else {
    var module = angular.module('qjCommunity.common.cordova', ['ngCordova'])
    module.factory('MrCamera', ['$cordovaCamera', function($cordovaCamera) {
        return $cordovaCamera;
    }])
    module.factory('MrImagePicker', ['$cordovaImagePicker', function($cordovaImagePicker) {
        return $cordovaImagePicker;
    }])

    module.factory('MrDevice', ['$cordovaDevice', function($cordovaDevice) {
        return $cordovaDevice;
    }])

    module.factory('MrBarcodeScanner', ['$cordovaBarcodeScanner', function($cordovaBarcodeScanner) {
        return $cordovaBarcodeScanner;
    }])
}