'use strict';

/* Directives */

//(function () {

  var dragging = false,
    model,
    collection,
    target;

  angular.module('myApp.directives', []).
    directive('droppable', function ($compile) {
      return {
        restrict: 'E',
        scope: {
          val: 'evaluate'
        },
        link: function (scope, element, attrs) {
          element.bind('mouseup', function (ev) {
            //console.log('drop');
            if (dragging /*&& scope.val !== collection*/) {
              target = true;
              scope.val.push(model);
              scope.$apply();
            }
          });
          element.bind('mousedown', function (ev) {
            //console.log('drop');
            collection = scope.val;
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
            //console.log('drag');

            if (dragging && target) {
              var i;
              for (i = 0; i < collection.length; i++) {
                if (collection[i] === scope.thing) {
                  collection.splice(i, 1);
                  break;
                }
              }
              dragging = false;
              target = false;

              scope.$apply();
            }

            // reset
            element.css('position', null);
            element.css('left', null);
            element.css('top', null);

            doc.unbind('mousemove', onMove);
            doc.unbind('mouseup', onUp);
          };

          element.bind('mousedown', function (ev) {
            ev.preventDefault();
            dragging = true;
            model = scope.thing;

            //console.log('drag');

            doc.bind('mousemove', onMove);
            doc.bind('mouseup', onUp);
            
            element.css('position', 'absolute');
            //console.log(scope.$index);
          });

          //onMove({x: 0, y: 0});

        }
      };
    });

//}());
