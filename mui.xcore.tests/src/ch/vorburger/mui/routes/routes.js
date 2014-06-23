'use strict';

/*global angular:true*/
angular.module('mui.jsAngularAddressbookApp') // NOTE: Do *NOT* ,[...]) here!! http://stackoverflow.com/questions/16771812/angularjs-seed-putting-javascript-into-separate-files-app-js-controllers-js
  .config(function ($stateProvider, $urlRouterProvider) {
	  
    // For any unmatched url, or when there is no when there is no route, send to default state URL
    $urlRouterProvider.otherwise('/main/home');
    $urlRouterProvider.when('', '/main/home');

    $stateProvider // nota bene: better to NOT (ever) use just url: '/' !
    .state('main', { url: '/main', abstract: true, views: { 'root': { templateUrl: 'views/main.html' }}})
	.state('main.home', { url: '/home', title: 'Welcome!', views: { 'mainBody': { templateUrl: 'views/home.html' }}})

	.state('main.contacts', { url: '/contacts', title: 'Contacts', views: { 'mainBody': { templateUrl: 'views/contacts.html', controller: 'ContactsCtrlClassic' }}})

    .state('main.contactsMUI', { url: '/contactsMUI', title: 'Contacts', views: { 'mainBody': { templateUrl: 'views/meta/datagrid.html', controller: 'ContactsCtrlMUI' }}})
	.state('main.contact', { url: '/contact/HTMLTemplate/{id}', title: 'Edit/Add Contact', views: { 'mainBody': { templateUrl: 'views/contact.html', controller: 'AContactCtrl' }}})


    .state('main.contactMUI', { url: '/contact/GenForm/{id}', title: 'Edit/Add Contact', views: { 'mainBody': { templateUrl: 'views/meta/simpleform.html', controller: 'AContactCtrl' }}});

	// note, when gen. later: Alternately (i.e. instead of dot), you can specify the parent of a state via the 'parent' property.
  });
