'use strict';

// angular.module('mui.stores', [])
// use it below?

/*global angular:true*/
angular.module('mui.jsAngularAddressbookApp', ['ui.state', 'ui.date', 'ngGrid'])
  .factory('ContactsStoreService', function () {
    // TODO read from *.json via $url or $resource or later http://ngmodules.org/modules/restangular
    var allData = [{id: 1, name: 'Moroni', age: 50, email: 'someone@place.org', country: 'Switzerland', phone: '78 837 31 33', since: '05/01/2013'},
                     {id: 2, name: 'Teancum', age: 43},
                     {id: 3, name: 'Jacob', age: 27},
                     {id: 4, name: 'Nephi', age: 29},
                     {id: 5, name: 'Enos', age: 34}];
    var indexedData = {};
    for (var i = 0; i < allData.length; i++) {
	    indexedData[allData[i].id] = allData[i];
    }
    
    var newContactsStoreService = {};
    // TODO Generic Store API... "Contact" as arg, not in func name.. switchable
    // TODO Date String formats?!?
    newContactsStoreService.allContacts = function () {
        return angular.copy(allData);
      };
    newContactsStoreService.getContact = function (id) {
        return angular.copy(indexedData[id]);
      };
    newContactsStoreService.put = function (model) {
        for (var i = 0; i < allData.length; i++) {
          if (allData[i].id === model.id) {
            allData[i] = model;
          }
        }
        indexedData[model.id] = model;
      };
    return newContactsStoreService;
  })
  
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
	.state('main.contacts', { url: '/contacts', title: 'Contacts', views: { 'main-body': { templateUrl: 'views/contacts.html', controller: 'ContactsCtrl' }}})
	.state('main.acontact', { url: '/contact/{id}', title: 'Edit/Add Contact', views: { 'main-body': { templateUrl: 'views/contact.html', controller: 'AContactCtrl' }}});
	// note, when gen. later: Alternately (i.e. instead of dot), you can specify the parent of a state via the 'parent' property.
  })
  
  // https://github.com/angular-ui/ui-router/wiki/Quick-Reference#note-about-using-state-within-a-template
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  .controller('AContactCtrl', function ($scope, $state, $stateParams, ContactsStoreService) {
    // 1. models
    $scope.model = {};
    $scope.model.contact = ContactsStoreService.getContact($stateParams.id);
    // 2. UI (JS widgets; as opposed to what's in the HTML)
    // -- None in this controller
    // 3. custom action handlers go here.. (MODEL: will probably only allow service call here, no real logic/code)
    $scope.save = function () {
        ContactsStoreService.put($scope.model.contact);
        $state.transitionTo('main.contacts', {});
      };
	// TBD build another example of a custom click handler here.. e.g. sendSMS()? ;) impl: just log!
  })

  .controller('ContactsCtrl', function ($scope, ContactsStoreService) {
    // 1. models
    $scope.ui = {};
    $scope.model = {};
    
    $scope.model.contacts = ContactsStoreService.allContacts();

    // 2. UI (JS widgets; as opposed to what's in the HTML)
    // TODO Better.. column chooser, instead showColumnMenu? Def. initially hidden cols, server-side persistence, etc. Wrap that in a new component.. contribute (OSS) as plugin to ng-grid.
    // This allows you to push/pop/splice/reassign column definitions and the changes will be reflected in the grid.
    $scope.myColumns = [{field: 'name', displayName: 'Name'},
                        {field: 'age', displayName: 'Age'},
                        // TODO create a CSS style for centering, and use cellClass & headerClass instead..
                        // TODO should better be <a ui-sref="main.acontact({{row.getProperty(\'id\')}})"> but cannot use that due to: https://github.com/angular-ui/ng-grid/issues/559
                        // Note the hard-coded "/#" - that wouldn't work if we were on HTML5 location mode..
                        {width: 30, cellTemplate: '<div style="vertical-align: middle; text-align: center;"><a href="/#{{$state.href(\'main.acontact\', {id: row.getProperty(\'id\')})}}"><i style="vertical-align: middle;" class="icon-edit"></i></a></div>' }];
    $scope.ui.myGrid = {};
    $scope.ui.myGrid.selections = [];
    $scope.ui.myGrid.options = { data: 'model.contacts', // you can also specify data as: $scope.myGridOptions = { data: $scope.myData }. However, updates to the underlying data will not be reflected in the grid
            selectedItems: $scope.ui.myGrid.selections,
            columnDefs: 'myColumns',
            enableRowSelection: true, multiSelect: false,
            enableColumnReordering: true, showColumnMenu: true
            // afterSelectionChange: function () { window.alert('yo'); }
            
    // 3. custom action handlers go here..
	// -- None in this controller
    };
  });
