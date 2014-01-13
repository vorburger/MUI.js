'use strict';

// TODO this is bad, right, because it pollutes the global namespace? check book or other code re. how to do this right..
function muiReplaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

// TODO this helper ultimately shouldn't be a global function, but I don't quite know where to put it, yet..
function addFieldsModelDerrivedState(fields, base) {
    for (var i = 0; i < fields.length; i++) {
        var resolvedModelProperty = base;
        if (!fields[i].model)
            return; // if undefined, which can happen during live editing, just return
        var remainingPath = fields[i].model;
        while (remainingPath.indexOf('.') > -1) {
            var nextPathSlice = remainingPath.substr(0, remainingPath.indexOf('.'));
            resolvedModelProperty = resolvedModelProperty[nextPathSlice];
            remainingPath = remainingPath.substr(remainingPath.indexOf('.') + 1);
        }
        fields[i].$modelB = resolvedModelProperty;
        fields[i].$modelL = remainingPath;

        // Unique ID is required because 'model' (path) cannot be used for <input name> (and ID), as it contains dots, and span ng-show wouldn't work
        // Unique ID is prefixed by numeric i for the off chance that two fields have same model binding
        // NOT USED fields[i].uid = i.toString() + muiReplaceAll('\\.', '_', fields[i].model);
    }
}

/*global angular:true*/
angular.module('mui.jsAngularAddressbookApp', ['ui.state', 'ui.date', 'ngGrid', 'ngResource', 'contenteditable'])
  .factory('ModelRespositoryService', function () {
    var newModelRespositoryService = {};
    newModelRespositoryService.getModel = function(modelNamePath) {

    };
    newModelRespositoryService.getActiveModels = function() {

    };
    return newModelRespositoryService;
  })

  .factory('ContactsStoreService', function () {
    // TODO read from *.json via $url or $resource or later http://ngmodules.org/modules/restangular
    var allData = [{id: 1, name: 'Jack', age: 50, email: 'someone@place.org', country: 'Switzerland', phone: '78 837 31 33', since: '05/01/2013'},
                     {id: 2, name: 'Jill', age: 4},
                     {id: 3, name: 'Anna', age: 27},
                     {id: 4, name: 'Philippe', age: 29},
                     {id: 5, name: 'Leana', age: 34}];
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
	.state('main.contactsAng', { url: '/contacts', title: 'Contacts', views: { 'main-body': { templateUrl: 'views/contacts.html', controller: 'ContactsCtrlClassic' }}})
    .state('main.contactsGen', { url: '/contactsMUI', title: 'Contacts', views: { 'main-body': { templateUrl: 'views/meta/datagrid.html', controller: 'ContactsCtrlMUI' }}})
	.state('main.acontactHTML', { url: '/contact/HTMLTemplate/{id}', title: 'Edit/Add Contact', views: { 'main-body': { templateUrl: 'views/contact.html', controller: 'AContactCtrl' }}})
    .state('main.acontactGen', { url: '/contact/GenForm/{id}', title: 'Edit/Add Contact', views: { 'main-body': { templateUrl: 'views/meta/simpleform.html', controller: 'AContactCtrl' }}});
	// note, when gen. later: Alternately (i.e. instead of dot), you can specify the parent of a state via the 'parent' property.
  })

  // https://github.com/angular-ui/ui-router/wiki/Quick-Reference#note-about-using-state-within-a-template
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  .controller('MUI', function ($rootScope) {
        $rootScope.mui = {};
        $rootScope.mui.designer = {};
        $rootScope.mui.designer.preferences = { "lhsPanelWidth": 300 };
        $rootScope.mui.designer.uimodel = {};
  })

  .controller('AContactCtrl', function ($scope, $state, $stateParams, ContactsStoreService, $resource, $rootScope) {
    // 1. data models
    $scope.model = {};
    $scope.model.contact = ContactsStoreService.getContact($stateParams.id);
    // 2. UI models (JS widgets; as opposed to what's in the HTML) -- no programmatic widgets here, just dynamic meta view
    $scope.uimodel = $resource('models/contact-form.json').get({}, function () {
      // $rootScope.mui.designer.uimodel = $scope.uimodel; // hm.. how to better? what if several on a page?!?
      // TODO factor this out into a helper function, somehow..
      addFieldsModelDerrivedState($scope.uimodel.fields, $scope);
    });

    // 3. custom action handlers go here.. (MODEL: will probably only allow service call here, no real logic/code)
    $scope.save = function () {
        ContactsStoreService.put($scope.model.contact);
        $state.transitionTo('main.contacts', {});
      };
	// TBD build another example of a custom click handler here.. e.g. sendSMS()? ;) impl: just log!
  })

  .controller('ContactsCtrlMUI', function ($scope, ContactsStoreService, $resource) {
        // 1. data models
        $scope.model = {};
        $scope.model.contacts = ContactsStoreService.allContacts();

        // 2. UI models (incl. JS widgets; as opposed to what's in the HTML)
        $scope.ui = {};
        $scope.ui.gen = {};
        $scope.ui.gen.grid = {};
        $scope.ui.gen.grid.options = { columnDefs: 'ui.gen.grid.columns' };
        // TODO one problem with this approach is that the list (grid) is first rendered with all columns.. and then redrawn with what's configured here after load of the JSON uimodel
        // TODO review this later.. contrary to the simpleform, this is probably NOT causing a 2-way binding.. so you couldn't edit the uimodel JSON in-browser for the Grid, yet.
        $scope.uimodel = $resource('models/contacts.muiv.json').get({}, function () {
            $scope.ui.gen.grid.columns = [];
            var columns = $scope.uimodel.columns;
            for (var iCol = 0; iCol < columns.length; iCol++) {
                var uimodel = columns[iCol];
                var column = {};
                column.displayName = uimodel.label;
                column.field = uimodel.model;

/* TODO review careful.. this seems to cause some high-CPU Chrome hanging issues?!?
                if (uimodel.action && uimodel.cell) {
                    column.width = 30;
                    var uiModelParams = uimodel.action.params;
                    var params = '';
                    for (var iParam = 0; iParam < uiModelParams.length; iParam+2) {
                        // e.g. 'id: row.getProperty(\'id\')'
                        params += uiModelParams[iParam]; // parameterName
                        params += ':';
                        var parameterValue = uiModelParams[iParam + 1];
                        if (parameterValue.substring(0,1) == '$') {
                            params += 'row.getProperty(\'';
                            params += uiModelParams[iParam + 1].substring(1);
                            params += '\')';
                        } else {
                            params += uiModelParams[iParam + 1];
                        }
                    }
                    column.cellTemplate = '<div style="vertical-align: middle; text-align: center;"><a href="#{{$state.href(\''
                        + uimodel.action.state + '\', {' + params + '}"><i style="vertical-align: middle;" class="icon-edit"></i></a></div>';
                }
 */

                $scope.ui.gen.grid.columns.push(column);
            }
            //$scope.ui.gen.grid.options.data = $scope.uimodel.model;
            //$scope.ui.gen.grid.options.data = 'model.contacts';
        });
        // TODO HIGH urgh! why does setting data above (deferred) not work, only works if it's here?
        $scope.ui.gen.grid.options.data = 'model.contacts';
    })

  .controller('ContactsCtrlClassic', function ($scope, ContactsStoreService) {
    // 1. data models
    $scope.model = {};
    $scope.model.contacts = ContactsStoreService.allContacts();

	// 2. UI models (JS widgets; as opposed to what's in the HTML)
    $scope.ui = {};
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

    // 3. custom action handlers go here..
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
                        var obj = angular.fromJson(text);
                        // TODO not ideal that this specific behaviour is hard-coded in this generic directive.. how to best do differently?
                        addFieldsModelDerrivedState(obj.fields, scope);
                        return obj;
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
    })

 /* .directive('splitter', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                // $(element).split(scope.$eval(attrs.splitter));
            }
        };
    }) */
;
