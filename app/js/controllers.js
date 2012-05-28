'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function DragDropCtrl ($scope) {
  $scope.fromBin = [1,2,3,4];
  $scope.toBin = [5,6,7];
}
DragDropCtrl.$inject = ['$scope'];
