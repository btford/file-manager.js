'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function DragDropCtrl ($scope) {
  $scope.fromBin = [1,2,3,4];
}
DragDropCtrl.$inject = ['$scope'];
