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
                     
    $scope.myGridOptions = { data: 'myData',
            selectedItems: $scope.mySelections,
            columnDefs: [{field: 'name', displayName: 'Name'}, {field: 'age', displayName: 'Age'}],
            enableRowSelection: true, multiSelect: false };
            
    // you can also specify data as: $scope.myGridOptions = { data: $scope.myData }.
    // However, updates to the underlying data will not be reflected in the grid
    
  });
