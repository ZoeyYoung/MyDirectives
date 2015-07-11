angular.module('form.deleteConfirm', []).directive('deleteConfirm', function() {
    return {
        restrict: 'EA',
        scope: {
            deleteFn: "=",
            deleteKey: "=",
            ngModel: '='
        },
        template: '<div ng-switch on="isShowConfirm()">' +
            '<span ng-transclude ng-switch-default></span>' +
            '<button ng-switch-default ng-click="toggleConfirm()" class="ui orange button">削除</button>' +
            '<button ng-switch-when="true" ng-click="toggleConfirm()" class="ui button">キャンセル</button>' +
            '<button ng-switch-when="true" ng-click="doDelete()" class="ui red button">削除する</button></div>',
        replace: true,
        transclude: true,
        link: function(scope, element, attrs, ctrl) {
            scope.toggleConfirm = function() {
                scope.isConfirm = !scope.isConfirm;
            };
            scope.isShowConfirm = function() {
                return scope.isConfirm;
            };
            scope.doDelete = function() {
                scope.deleteFn(scope.deleteKey);
                scope.toggleConfirm();
            };
        }
    };
});
