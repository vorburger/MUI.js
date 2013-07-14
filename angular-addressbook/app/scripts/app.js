'use strict';

angular.module('mui.jsAngularAddressbookApp', ['ui.date', 'ngGrid'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
      .otherwise({ redirectTo: '/' });
  });
