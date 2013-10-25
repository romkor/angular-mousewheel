'use strict';
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['angular'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(angular);
    }
}(function () {

    // define eveWheel module
    var eveWheelModule = angular.module('eveWheel', []);

    function makeWheelDirective(directiveName, direction) {

        direction = direction || 0;

        eveWheelModule.directive(directiveName, ['$parse', function ($parse) {

            return function (scope, element, attr) {

                var wheelHandler = $parse(attr[directiveName]);

                if ('onwheel' in document) {
                    // IE9+, FF17+
                    element.bind("wheel", onWheel)
                } else if ('onmousewheel' in document) {
                    // deprecated
                    element.bind("mousewheel", onWheel)
                } else {
                    // 3.5 <= Firefox < 17
                    element.bind("MozMousePixelScroll", onWheel)
                }

                function onWheel(event) {
                    event = event || window.event;

                    var delta = (event.deltaY || event.detail || event.wheelDelta) > 0 ? 1 : -1;

                    if (direction === 0 || direction === delta) {
                        scope.$apply(function () {
                            element.triggerHandler("evewheel");
                            wheelHandler(scope, {
                                $event: event,
                                $delta: delta
                            });
                        });
                    }

                    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                }
            }

        }])

    }


    makeWheelDirective('eveWheel');

    makeWheelDirective('eveWheelNext', 1);

    makeWheelDirective('eveWheelPrev', -1);

}));
