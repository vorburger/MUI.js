'use strict';

angular.module('mui.jsAngularAddressbookApp', ['ui.state', 'ui.date', 'ngGrid'])
  .config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to / (TODO what does it do without this?!)
    $urlRouterProvider.otherwise('/a');

    $stateProvider
    .state('route1', { url: '/a', templateUrl: 'views/main.html', controller: 'MainCtrl' });
  });
