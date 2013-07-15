'use strict';

angular.module('mui.jsAngularAddressbookApp')
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
                        // TODO don't use /1 but read id
                        // TODO don't use href but ui-sref= (does that work here?)
                        {width: 30, cellTemplate: '<div style="vertical-align: middle; text-align: center;"><a href="#/main/contact/1"><i style="vertical-align: middle; " class="icon-edit"></i></a></div>' }];
    
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
