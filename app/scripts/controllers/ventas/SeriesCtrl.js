'use strict';

angular
    .module('softvApp')
    .controller('SeriesCtrl', function(VentasFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function OpenSerieAdd(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalSerieForm.html',
                controller: 'ModalSerieAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }

        function OpenSerieUpdate(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalSerieForm.html',
                controller: 'ModalSerieUpdateCtrl',
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

        function OpenSerieView(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalSerieForm.html',
                controller: 'ModalSerieViewCtrl',
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

        function OpenSerieDelete(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalSerieDelete.html',
                controller: 'ModalSerieDeleteCtrl',
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
        vm.OpenSerieAdd = OpenSerieAdd;
        vm.OpenSerieUpdate = OpenSerieUpdate;
        vm.OpenSerieView = OpenSerieView;
        vm.OpenSerieDelete = OpenSerieDelete;

    });