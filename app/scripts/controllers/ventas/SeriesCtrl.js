'use strict';

angular
    .module('softvApp')
    .controller('SeriesCtrl', function(SeriesFactory, VentasFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function initData(){
            VentasFactory.GetMuestra_PlazasPorUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                console.log(data);
                vm.DistribuidorList = data.GetMuestra_PlazasPorUsuarioListResult;
                vm.Distribuidor = vm.DistribuidorList[0];
                GetSerieList(4);
            });
        }

        function GetSerieList(Op){
            var ObjSeriesList = {
                'Serie': vm.Serie, 
                'Clv_Vendedor': 0, 
                'NOMBRE': '', 
                'Op': Op, 
                'ClvUsuario': $localStorage.currentUser.idUsuario, 
                'IdCompania': vm.Distribuidor.Clv_Plaza, 
                'Tipo': vm.Tipo.Clv_Tipo
            };
            SeriesFactory.GetCatalogoSeriesList(ObjSeriesList).then(function(data){
                console.log(data);
                vm.SerieList = data.GetCatalogoSeriesListResult;
                vm.ViewList = (vm.SerieList.length > 0)? true:false;
            });
        }

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

        function OpenCancelarFolios(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalCancelarFolios.html',
                controller: 'ModalCancelarFoliosCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm'
            });
        }

        function OpenImprimirFolios(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalImprimirFolios.html',
                controller: 'ModalImprimirFoliosCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm'
            });
        }

        function OpenReimprimirFolios(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalReimprimirFolios.html',
                controller: 'ModalReimprimirFoliosCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm'
            });
        }

        function OpenFoliosFaltantes(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalFoliosFaltantes.html',
                controller: 'ModalFoliosFaltantesCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm'
            });
        }

        function OpenFoliosCancelados(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalFoliosCancelados.html',
                controller: 'ModalFoliosCanceladosCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg'
            });
        }

        var vm = this;
        vm.TipoList = [
            {'Clv_Tipo': 1, 'Tipo': 'Cobro'},
            {'Clv_Tipo': 2, 'Tipo': 'Venta'},
        ];
        vm.Tipo = vm.TipoList[0];
        vm.GetSerieList = GetSerieList;
        vm.OpenSerieAdd = OpenSerieAdd;
        vm.OpenSerieUpdate = OpenSerieUpdate;
        vm.OpenSerieView = OpenSerieView;
        vm.OpenSerieDelete = OpenSerieDelete;
        vm.OpenCancelarFolios = OpenCancelarFolios;
        vm.OpenImprimirFolios = OpenImprimirFolios;
        vm.OpenReimprimirFolios = OpenReimprimirFolios;
        vm.OpenFoliosFaltantes = OpenFoliosFaltantes;
        vm.OpenFoliosCancelados = OpenFoliosCancelados;
        initData();

    });