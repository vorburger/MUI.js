'use strict';

angular.module('mui.jsAngularAddressbookApp', ['ui.state', 'ui.date', 'ngGrid'])
  .config(function ($stateProvider, $urlRouterProvider) {
    // TODO how to read this configuration from a app.js.routes.json? (which will be slower.. how to inline it again, later?)
  
    // For any unmatched url, send to / (TODO what does it do without this?!)
    $urlRouterProvider.otherwise('/a');

    $stateProvider
    .state('route1', { url: '/a', views: { 'root': { templateUrl: 'views/main.html', controller: 'MainCtrl' }}});
  });
