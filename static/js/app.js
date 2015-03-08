'use strict';

var myApp = angular.module('myApp', ['socket-io', 'highcharts-ng', 'ngRoute']);
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '/static/partials/index.html',
        controller: 'RedisCtl'
    }).
    when('/server/:serverid', {
        templateUrl: '/static/partials/index.html',
        controller: 'RedisCtl'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);