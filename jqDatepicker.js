define([
    'jquery',
    'angular',
    'jqueryUI/i18n/datepicker-ja'
], function($) {
    var DATEPICKER_OPTION = {
        dateFormat: "yymmdd",
        showAnim: "slideDown",
        changeMonth: true,
        changeYear: true,
        regional: "ja",
        showButtonPanel: true,
        closeText: "クリア"
    };
    angular.module('jquery.datepicker', []).directive('jqdatepicker', function($parse) {
        return function(scope, element, attrs, controller) {
            var ngModel = $parse(attrs.ngModel);
            $(function() {
                var datepicker = element.datepicker($.extend({}, DATEPICKER_OPTION, {
                    onSelect: function(dateText, inst) {
                        scope.$apply(function(scope) {
                            element.trigger("blur");
                            ngModel.assign(scope, dateText);
                        });
                    }
                }));
            });
        };
    }).directive('jqdatepickerRange', function($parse) {
        return {
            restrict: 'EA',
            scope: {
                id: '=rangeId',
                dateFrom: '=',
                dateTo: '='
            },
            template: '<div class="inline-field">' +
                '<input type="text" class="ui left floated input" placeholder="YYYYMMDD" readonly="readonly">' +
                '<span class="center-aligned">~</span>' +
                '<input type="text" class="ui right floated input" placeholder="YYYYMMDD" readonly="readonly">' +
                '</div>',
            replace: true,
            link: function(scope, element, attrs, controller) {
                var vm = scope.$parent;
                var dateFrom = $parse(attrs.dateFrom);
                var dateTo = $parse(attrs.dateTo);
                $(function() {
                    var from = element.find('input').eq(0).attr("id", scope.id + "From");
                    var to = element.find('input').eq(1).attr("id", scope.id + "To");
                    var dpOtionFrom = $.extend({}, DATEPICKER_OPTION, {
                        onClose: function(selectedDate) {
                            to.datepicker("option", "minDate", selectedDate);
                        },
                        onSelect: function(dateText, inst) {
                            vm.$apply(function(scope) {
                                from.trigger("blur");
                                dateFrom.assign(scope, dateText);
                            });
                        }
                    });
                    var dpOtionTo = $.extend({}, DATEPICKER_OPTION, {
                        onClose: function(selectedDate) {
                            from.datepicker("option", "maxDate", selectedDate);
                        },
                        onSelect: function(dateText, inst) {
                            vm.$apply(function(scope) {
                                to.trigger("blur");
                                dateTo.assign(scope, dateText);
                            });
                        }
                    });
                    from.datepicker(dpOtionFrom);
                    to.datepicker(dpOtionTo);
                    scope.$watch('dateFrom', function(modelValue) {
                        if (modelValue) {
                            from.val(modelValue);
                        } else {
                            from.val("");
                        }
                    });
                    scope.$watch('dateTo', function(modelValue) {
                        if (modelValue) {
                            to.val(modelValue);
                        } else {
                            to.val("");
                        }
                    });
                });
            }
        };
    });
});
