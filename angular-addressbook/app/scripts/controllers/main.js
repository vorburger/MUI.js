'use strict';

angular.module('mui.jsAngularAddressbookApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.mySelections = [];
    
    $scope.myData = [{name: 'Moroni', age: 50},
                     {name: 'Teancum', age: 43},
                     {name: 'Jacob', age: 27},
                     {name: 'Nephi', age: 29},
                     {name: 'Enos', age: 34}];
    $scope.myGridOptions = { data: 'myData',
            selectedItems: $scope.mySelections,
            columnDefs: [{field:'name', displayName:'Name'}, {field:'age', displayName:'Age'}],
            enableRowSelection: true, multiSelect: false };
    // you can also specify data as: $scope.myOptions = { data: $scope.myData }. 
    // However, updates to the underlying data will not be reflected in the grid
    
  });
