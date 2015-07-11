angular.module('form.singleCheckbox', []).directive('singleCheckbox', function($log) {
    return {
        restrict: 'EA',
        replace: false,
        scope: '@',
        link: function(scope, element, attr, ctrl) {
            if (scope.$last) {
                var inputs = element.parent().find("input");
                if (inputs.length > 1) {
                    inputs.each(function(i, v) {
                        $(v).on("click", function() {
                            if ($(this).is(":checked")) {
                                inputs.prop("checked", false);
                                $(this).prop("checked", true);
                            }
                        });
                    });
                }
            }
        }
    };
});
