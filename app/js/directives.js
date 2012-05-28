'use strict';

/* Directives */

(function () {

  var dragging = false,
    model;

  angular.module('myApp.directives', []).
    directive('droppable', function ($compile) {
      return {
        restrict: 'E',
        scope: {
          val:'evaluate'
        },
        link: function (scope, element, attrs) {
          element.bind('mouseup', function (ev) {
            console.log('up');
          });

          element.append('<draggable ng-repeat="thing in val">{{thing}}</draggable>');

          $compile(element.contents())(scope.$new());
        }
      };
    }).
    directive('draggable', function () {

      var doc = angular.element(document);

      return {
        restrict: 'E',
        /*
        scope: {
          thing:'evaluate'
        },
        */
        link: function (scope, element, attrs) {

          var onMove = function (ev) {
            element.css('left', ev.x + 'px');
            element.css('top', ev.y + 'px');
            //console.log(ev, element);
          };

          var onUp = function (ev) {
            ev.preventDefault();

            // reset
            element.css('position', null);
            element.css('left', null);
            element.css('top', null);

            doc.unbind('mousemove', onMove);
            doc.unbind('mouseup', onUp);
          };

          element.bind('mousedown', function (ev) {
            ev.preventDefault();

            doc.bind('mousemove', onMove);
            doc.bind('mouseup', onUp);
            
            element.css('position', 'absolute');
          });

          //onMove({x: 0, y: 0});
          console.log(scope);

        }
      };
    });

}());
