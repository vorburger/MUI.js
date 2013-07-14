'use strict';

angular.module('mui.jsAngularAddressbookApp', ['ui.state', 'ui.date', 'ngGrid'])
  .config(function ($stateProvider, $urlRouterProvider) {
    // TODO how to read this configuration from a app.js.routes.json? (which will be slower.. how to inline it again, later?)
  
    // For any unmatched url, or when there is no when there is no route, send to default state URL
    $urlRouterProvider.otherwise('/main/contacts');
    $urlRouterProvider.when('', '/main/contacts');

    $stateProvider // nota bene: better to NOT (ever) use just url: '/' !
    .state('main', { url: '/main', views: { 'root': { templateUrl: 'views/main.html' /*, controller: 'MainCtrl' */}}})
	.state('main.contacts', { url: '/contacts', views: {
		  // 'root': { templateUrl: 'views/main.html' /*, controller: 'MainCtrl' */},
		  'main-body': { templateUrl: 'views/contacts.html', controller: 'MainCtrl' }}
		  });
	// note, when gen. later: Alternately (i.e. instead of dot), you can specify the parent of a state via the 'parent' property.
  });
