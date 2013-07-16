'use strict';

// angular.module('mui.stores', [])
// use it below?

angular.module('mui.jsAngularAddressbookApp', ['ui.state', 'ui.date', 'ngGrid'])
  .config(function ($stateProvider, $urlRouterProvider) {
    // TODO how to read this configuration from a app.js.routes.json? (which will be slower.. how to inline it again, later?)
  
    // For any unmatched url, or when there is no when there is no route, send to default state URL
    $urlRouterProvider.otherwise('/main/home');
    $urlRouterProvider.when('', '/main/home');
    // when is also useful for "aliases":
    $urlRouterProvider.when('/main/kontakte', '/main/contacts');

    $stateProvider // nota bene: better to NOT (ever) use just url: '/' !
    .state('main', { url: '/main', abstract: true, views: { 'root': { templateUrl: 'views/main.html' }}})
	.state('main.home', { url: '/home', title: 'Welcome!', views: { 'main-body': { templateUrl: 'views/home.html' }}})
	.state('main.contacts', { url: '/contacts', title: 'Contacts', views: { 'main-body': { templateUrl: 'views/contacts.html', controller: 'MainCtrl' }}})
	.state('main.acontact', { url: '/contact/{id}', title: 'Edit/Add Contact', views: { 'main-body': { templateUrl: 'views/contact.html' }}});
	// note, when gen. later: Alternately (i.e. instead of dot), you can specify the parent of a state via the 'parent' property.
  })
  
  // https://github.com/angular-ui/ui-router/wiki/Quick-Reference#note-about-using-state-within-a-template
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  .controller('MainCtrl', function ($scope) {
    $scope.mySelections = [];
    
    // TODO Date String formats?!?
    $scope.myData = [{id: 1, name: 'Moroni', age: 50, email: 'moron@blue.com', country: 'Switzerland', phone: '78 837 31 33', since: '05/01/2013'},
                     {id: 2, name: 'Teancum', age: 43},
                     {id: 3, name: 'Jacob', age: 27},
                     {id: 4, name: 'Nephi', age: 29},
                     {id: 5, name: 'Enos', age: 34}];

    // TODO Better.. column chooser, instead showColumnMenu? Def. initially hidden cols, server-side persistence, etc. Wrap that in a new component.. contribute (OSS) as plugin to ng-grid.
    // This allows you to push/pop/splice/reassign column definitions and the changes will be reflected in the grid.
    $scope.myColumns = [{field: 'name', displayName: 'Name'},
                        {field: 'age', displayName: 'Age'},
                        // TODO create a CSS style for centering, and use cellClass & headerClass instead..
                        // TODO don't use /1 but read id; https://github.com/angular-ui/ng-grid/issues/559
                        {width: 30, cellTemplate: '<div style="vertical-align: middle; text-align: center;"><a ui-sref="main.acontact({id: 1})"><i style="vertical-align: middle; " class="icon-edit"></i></a></div>' }];
    
    $scope.myGridOptions = { data: 'myData',
            selectedItems: $scope.mySelections,
            columnDefs: 'myColumns',
            enableRowSelection: true, multiSelect: false,
            enableColumnReordering: true, showColumnMenu: true
            // afterSelectionChange: function () { window.alert('yo'); }
    };
            
    // you can also specify data as: $scope.myGridOptions = { data: $scope.myData }.
    // However, updates to the underlying data will not be reflected in the grid
    
  });
