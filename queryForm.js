define(['angular'], function(angular) {
    angular.module('form.queryForm', [])
        .directive('queryForm', function() {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    queryTable: "=",
                    queryParams: "=",
                    originQueryParams: "=?",
                    preSearch: "=?",
                    afterReset: "=?"
                },
                template: '<form class="ui form" name="form">' +
                    '<fieldset ng-transclude style="margin-top:0;"></fieldset>' +
                    '<button type="button" class="ui primary button" ng-click="search()">検索</button>' +
                    '<button type="reset" class="ui button">リセット</button>' +
                    '<div class="ui divider"></div>' +
                    '</form>',
                link: function(scope, element, attr) {
                    var master = {};
                    if (scope.originQueryParams) {
                        master = angular.copy(scope.originQueryParams);
                    }

                    scope.search = function() {
                        if (scope.preSearch && angular.isFunction(scope.preSearch)) {
                            scope.preSearch();
                        }
                        if (scope.queryTable) {
                            scope.queryTable.ajax.reload();
                        }
                    };

                    scope.$watch('queryParams', function() {
                        $(".error").remove();
                    }, true);

                    element.bind('reset', function(event) {
                        scope.$apply(function(scope) {
                            angular.copy(master, scope.queryParams);
                            scope.form.$setPristine();
                            if (scope.afterReset && angular.isFunction(scope.afterReset)) {
                                scope.afterReset();
                            }
                        });
                        // TODO: memoize prevention method
                        if (event.preventDefault) {
                            return event.preventDefault();
                        } else {
                            return false;
                        }
                    });
                }
            };
        });
});
