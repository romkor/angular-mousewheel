(function (factory) {
    'use strict';
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
    'use strict';
    // define eveWheel module
    var eveWheelModule = angular.module('eveWheel', []),

        // Directives generator, idea borrowed from ngSwipe module
        makeWheelDirective = function (directiveName, direction) {

            direction = direction || 0;

            eveWheelModule.directive(directiveName, ['$parse', function ($parse) {

                return function (scope, element, attr) {

                    var wheelHandler = $parse(attr[directiveName]),
                        onWheel = function (event) {
                            event = event || window.event;

                            var delta = (event.deltaY * -1 || event.detail * -1 || event.wheelDelta) > 0 ? 1 : -1;

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
                        },
                        wheelEvent;

                    if (document.hasOwnProperty('onwheel')) {
                        // IE9+, FF17+
                        wheelEvent = "wheel";
                    } else if (document.hasOwnProperty('onmousewheel')) {
                        // deprecated
                        wheelEvent = "mousewheel";
                    } else {
                        // 3.5 <= Firefox < 17
                        wheelEvent = "MozMousePixelScroll";
                    }

                    element.bind(wheelEvent, onWheel);

                    element.bind('$destroy', function() {
                        element.unbind(wheelEvent, onWheel);
                    });

                };

            }]);
        };

    makeWheelDirective('eveWheel');

    makeWheelDirective('eveWheelNext', 1);

    makeWheelDirective('eveWheelPrev', -1);

}));
