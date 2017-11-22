'use strict';

angular
    .module('softvApp')
    .controller('RangosCtrl', function(VentasFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function OpenRangoAdd(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalRangoForm.html',
                controller: 'ModalRangoAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }

        function OpenRangoUpdate(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalRangoForm.html',
                controller: 'ModalRangoUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdIP: function () {
                        return IdIP;
                    }
                }
            });
        }

        function OpenRangoView(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalRangoForm.html',
                controller: 'ModalRangoViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdIP: function () {
                        return IdIP;
                    }
                }
            });
        }

        function OpenRangoDelete(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalRangoDelete.html',
                controller: 'ModalRangoDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    IdIP: function () {
                        return IdIP;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenRangoAdd = OpenRangoAdd;
        vm.OpenRangoUpdate = OpenRangoUpdate;
        vm.OpenRangoView = OpenRangoView;
        vm.OpenRangoDelete = OpenRangoDelete;

    });