angular.module('jquery.datepicker', []).directive('jqdatepicker', function($parse) {
    return function(scope, element, attrs, controller) {
        var ngModel = $parse(attrs.ngModel);
        $(function() {
            element.datepicker({
                dateFormat: "yymmdd",
                showAnim: "slideDown",
                changeMonth: true,
                changeYear: true,
                regional: "ja",
                onSelect: function(dateText, inst) {
                    scope.$apply(function(scope) {
                        element.trigger("blur");
                        ngModel.assign(scope, dateText);
                    });
                }
            });
        });
    };
}).directive('jqdatepickerRange', function($parse) {
    return {
        restrict: 'EA',
        scope: {
            id: '=rangeId',
            ngModel: '='
        },
        template: '<div class="inline-field">' +
            '<input type="text" class="ui left floated input" placeholder="YYYYMMDD" readonly="readonly">' +
            '<span class="center-aligned">~</span>' +
            '<input type="text" class="ui right floated input" placeholder="YYYYMMDD" readonly="readonly">' +
            '</div>',
        replace: true,
        link: function(scope, element, attrs, controller) {
            var vm = scope.$parent;
            var ngModel = $parse(attrs.ngModel);
            var start = "";
            var end = "";
            $(function() {
                var from = element.find('input').eq(0).attr("id", scope.id + "From");
                var to = element.find('input').eq(1).attr("id", scope.id + "To");
                var dpOtionFrom = {
                    dateFormat: "yymmdd",
                    showAnim: "slideDown",
                    changeMonth: true,
                    changeYear: true,
                    regional: "ja",
                    onClose: function(selectedDate) {
                        to.datepicker("option", "minDate", selectedDate);
                    },
                    onSelect: function(dateText, inst) {
                        vm.$apply(function(scope) {
                            from.trigger("blur");
                            start = dateText;
                            ngModel.assign(scope, start + "~" + end);
                        });
                    }
                };
                var dpOtionTo = {
                    dateFormat: "yymmdd",
                    showAnim: "slideDown",
                    changeMonth: true,
                    changeYear: true,
                    regional: "ja",
                    onClose: function(selectedDate) {
                        from.datepicker("option", "maxDate", selectedDate);
                    },
                    onSelect: function(dateText, inst) {
                        vm.$apply(function(scope) {
                            to.trigger("blur");
                            end = dateText;
                            ngModel.assign(scope, start + "~" + end);
                        });
                    }
                };
                from.datepicker(dpOtionFrom);
                to.datepicker(dpOtionTo);
                scope.$watch('ngModel', function(modelValue) {
                    if (modelValue && modelValue.indexOf("~") != -1) {
                        from.val(modelValue.split("~")[0]);
                        to.val(modelValue.split("~")[1]);
                    }
                });
            });
        }
    };
});
