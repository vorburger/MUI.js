'use strict';

// TODO this is bad, right, because it pollutes the global namespace? check book or other code re. how to do this right..
function muiReplaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

/*global angular:true*/
angular.module('mui.jsAngularAddressbookApp', ['ui.state', 'ui.date', 'ngGrid', 'ngResource'])
  .factory('ContactsStoreService', function () {
    // TODO read from *.json via $url or $resource or later http://ngmodules.org/modules/restangular
    var allData = [{id: 1, name: 'Moroni', age: 50, email: 'someone@place.org', country: 'Switzerland', phone: '78 837 31 33', since: '05/01/2013'},
                     {id: 2, name: 'Teancum', age: 4},
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
	.state('main.acontactHTML', { url: '/contact/HTMLTemplate/{id}', title: 'Edit/Add Contact', views: { 'main-body': { templateUrl: 'views/contact.html', controller: 'AContactCtrl' }}})
    .state('main.acontactGen', { url: '/contact/GenForm/{id}', title: 'Edit/Add Contact', views: { 'main-body': { templateUrl: 'views/meta/simpleform.html', controller: 'AContactCtrl' }}});
	// note, when gen. later: Alternately (i.e. instead of dot), you can specify the parent of a state via the 'parent' property.
  })
  
  // https://github.com/angular-ui/ui-router/wiki/Quick-Reference#note-about-using-state-within-a-template
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  .controller('AContactCtrl', function ($scope, $state, $stateParams, ContactsStoreService, $resource) {
    // 1. data models
    $scope.model = {};
    $scope.model.contact = ContactsStoreService.getContact($stateParams.id);
    // 2. UI models
    $scope.uimodel = $resource('models/contacts.muiv.json').get({}, function () {
    // TODO factor this out into a helper function, somehow..
      var fields = $scope.uimodel.fields;
      for (var i = 0; i < fields.length; i++) {
        var resolvedModelProperty = $scope;
        var remainingPath = fields[i].model;
        while (remainingPath.indexOf('.') > -1) {
          var nextPathSlice = remainingPath.substr(0, remainingPath.indexOf('.'));
          resolvedModelProperty = resolvedModelProperty[nextPathSlice];
          remainingPath = remainingPath.substr(remainingPath.indexOf('.') + 1);
        }
        // TODO keep this derrived info outside original struct! otherwise a pain to edit & write back later..
        fields[i].modelB = resolvedModelProperty;
        fields[i].modelL = remainingPath;
        // Unique ID is required because 'model' (path) cannot be used for <input name> (and ID), as it contains dots, and span ng-show wouldn't work
        // Unique ID is prefixed by numeric i for the off chance that two fields have same model binding
        fields[i].uid = i.toString() + muiReplaceAll('\\.', '_', fields[i].model);
      }
    });

    // 3. UI (JS widgets; as opposed to what's in the HTML)
    // -- None in this controller
    // 4. custom action handlers go here.. (MODEL: will probably only allow service call here, no real logic/code)
    $scope.save = function () {
        ContactsStoreService.put($scope.model.contact);
        $state.transitionTo('main.contacts', {});
      };
	// TBD build another example of a custom click handler here.. e.g. sendSMS()? ;) impl: just log!
  })

  .controller('ContactsCtrl', function ($scope, ContactsStoreService) {
    // 1. data models
    $scope.model = {};
    $scope.model.contacts = ContactsStoreService.allContacts();

	// 2. UI models
    $scope.ui = {};

    // 3. UI (JS widgets; as opposed to what's in the HTML)
    // TODO Better.. column chooser, instead showColumnMenu? Def. initially hidden cols, server-side persistence, etc. Wrap that in a new component.. contribute (OSS) as plugin to ng-grid.
    // This allows you to push/pop/splice/reassign column definitions and the changes will be reflected in the grid.
    $scope.myColumns = [{field: 'name', displayName: 'Name'},
                        {field: 'age', displayName: 'Age'},
                        // TODO create a CSS style for centering, and use cellClass & headerClass instead..
                        // TODO should better be <a ui-sref="main.acontact({{row.getProperty(\'id\')}})"> but cannot use that due to: https://github.com/angular-ui/ng-grid/issues/559
                        // Note the hard-coded "#" - that wouldn't work if we were on HTML5 location mode..
                        {width: 30, cellTemplate: '<div style="vertical-align: middle; text-align: center;"><a href="#{{$state.href(\'main.acontactHTML\', {id: row.getProperty(\'id\')})}}"><i style="vertical-align: middle;" class="icon-edit"></i></a></div>' },
                        {width: 30, cellTemplate: '<div style="vertical-align: middle; text-align: center;"><a href="#{{$state.href(\'main.acontactGen\', {id: row.getProperty(\'id\')})}}"><i style="vertical-align: middle;" class="icon-edit"></i></a></div>' }];
    $scope.ui.myGrid = {};
    $scope.ui.myGrid.selections = [];
    $scope.ui.myGrid.options = { data: 'model.contacts', // you can also specify data as: $scope.myGridOptions = { data: $scope.myData }. However, updates to the underlying data will not be reflected in the grid
            selectedItems: $scope.ui.myGrid.selections,
            columnDefs: 'myColumns',
            enableRowSelection: true, multiSelect: false,
            enableColumnReordering: true, showColumnMenu: true
            // afterSelectionChange: function () { window.alert('yo'); }
            
    // 4. custom action handlers go here..
	// -- None in this controller
    };
  })

    // http://stackoverflow.com/a/17904017/421602
    .directive('json', function() {
        return {
            restrict: 'A', // only activate on element attribute
            require: 'ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModelCtrl) {
                function fromUser(text) {
                    // Beware: trim() is not available in old browsers
                    if (!text || text.trim() === '')
                        return {}
                    else
                    // TODO catch SyntaxError, and set validation error..
                        return angular.fromJson(text);
                }

                function toUser(object) {
                    // better than JSON.stringify(), because it formats + filters $$hashKey etc.
                    return angular.toJson(object, true);
                }

                // push() if faster than unshift(), and avail. in IE8 and earlier (unshift isn't)
                ngModelCtrl.$parsers.push(fromUser);
                ngModelCtrl.$formatters.push(toUser);

                // $watch(attrs.ngModel) wouldn't work if this directive created a new scope;
                // see http://stackoverflow.com/questions/14693052/watch-ngmodel-from-inside-directive-using-isolate-scope how to do it then
                scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        ngModelCtrl.$setViewValue(toUser(newValue));
                        // TODO avoid this causing the focus of the input to be lost..
                        ngModelCtrl.$render();
                    }
                }, true); // MUST use objectEquality (true) here, for some reason..
            }
        };
    });

