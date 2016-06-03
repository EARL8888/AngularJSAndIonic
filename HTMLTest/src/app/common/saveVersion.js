angular.module('qjCommunity.common.saveVersion', [])

.service('saveVersion', [function() {
    this.create = function(appVersion) {
        this.appVersion = appVersion;
    };
    return this;
}])

.factory('SaveVersionService', ['saveVersion', function(saveVersion) {
    var saveVersionExample = {};

    saveVersionExample.addVersion = function(appVersion) {
        saveVersion.create(appVersion);
    }

    saveVersionExample.getVersion = function() {
        return saveVersion;
    };
    return saveVersionExample;
}])