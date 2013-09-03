<!--
<a modal-window
   header-message="Confirm?"
   body-message="abc.getProperty('firstname') + ' ' + abc.getProperty('lastname')"
   button-prefix="user"
   modal-type="delete"
   button-action="handleDeleteClicked">delete</a>
-->

    directive('modalWindow', ['$modal', function ($modal) {
        "use strict";
        var link = function (scope, elem, attr) {
            var setModalType = function () {
                if (attr.modalType && attr.modalType !== undefined) {
                    scope.modalType = attr.modalType;
                } else {
                    scope.modalType = "continue";
                }
            }, initModalWindow = function () {
                setModalType();
                $modal({
                    template: 'templates/modalWindow.html',
                    persist: true,
                    show: true,
                    backdrop: 'static',
                    keyboard: false,
                    scope: scope
                });
            };
            scope.changeAction = function () {
                var btnAction = scope[attr.buttonAction];
                if (btnAction && typeof btnAction === 'function') {
                    btnAction();
                }
            };
            scope.dismissModal = function (dismiss) {
                dismiss();
            };
            elem.bind("click", initModalWindow);
        };
        return {
            restrict: "A",
            scope: {
                bodyMessage: '=',
                headerMessage: '=',
                buttonPrefix: '='
            },
            link: link
        };
    }])			   
			   