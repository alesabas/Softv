'use strict';

angular
    .module('softvApp')
    .controller('RangosCtrl', function(SeriesFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function initData(){
            SeriesFactory.GetMuestra_Compania_RelUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                console.log(data);
                vm.PlazaList = data.GetMuestra_Compania_RelUsuarioListResult;
            });
        }

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
        initData();

    });