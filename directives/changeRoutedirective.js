 angular.module("com.directives", []).
 // $modal is from angularStrap to launch the modal
 directive('selectToChangeRoute', ['$location', '$modal', function ($location, $modal) {
        "use strict";
        var link = function (scope, elem, attr) {
            var setRoutePath = function () {
                var index;
                for (index = 0; index < scope.routeOptions.length; index += 1) {
                    if ($location.path().indexOf(scope.routeOptions[index].path) !== -1) {
                        scope.redirectRoute = scope.routeOptions[index].path;
                        break;
                    }
                }
            }, getSelectedIndex = function () {
                var index;
                for (index = 0; index < scope.routeOptions.length; index += 1) {
                    if (scope.routeOptions[index].path === scope.redirectRoute) {
                        break;
                    }
                }
                return index;
            }, initModalWindow = function () {
                $modal({
                    template: 'templates/changeRoute.html',
                    persist: true,
                    show: true,
                    backdrop: 'static',
                    keyboard: false,
                    scope: scope
                });
            };
            scope.changeRoute = function () {
                var selectedItem = scope.routeOptions[getSelectedIndex()];
                scope.redirectRoute = selectedItem.path;
                $location.path(selectedItem.path);
                $location.replace();
            };
            scope.dismissModal = function (dismiss) {
                setRoutePath();
                dismiss();
            };
            setRoutePath();
            scope.selectedRoute = function () {
                initModalWindow();
            };
        };
        return {
            restrict: "E",
            scope: {
                routeOptions: '=',
                warningMessage: '='
            },
            templateUrl: "templates/redirect-route.html",
            link: link
        };
    }]);