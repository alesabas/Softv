'use strict';

angular
    .module('softvApp')
    .controller('SeriesCtrl', function(SeriesFactory, VentasFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function initData(){
            VentasFactory.GetMuestra_PlazasPorUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                vm.DistribuidorList = data.GetMuestra_PlazasPorUsuarioListResult;
                vm.Distribuidor = vm.DistribuidorList[0];
                GetSerieList(4);
            });
        }

        function GetSerieList(Op){
            var ObjSeriesList = {
                'Serie': vm.Serie, 
                'Clv_Vendedor': vm.Clv_Vendedor, 
                'NOMBRE': vm.NombreVendedor, 
                'Op': Op, 
                'ClvUsuario': $localStorage.currentUser.idUsuario, 
                'IdCompania': vm.Distribuidor.Clv_Plaza, 
                'Tipo': vm.Tipo.Clv_Tipo
            };
            SeriesFactory.GetCatalogoSeriesList(ObjSeriesList).then(function(data){
                vm.SerieList = data.GetCatalogoSeriesListResult;
                vm.ViewList = (vm.SerieList.length > 0)? true:false;
                vm.Serie = null;
                vm.Clv_Vendedor = null;
                vm.NombreVendedor = null;
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
            modalInstance.result.then(function () {
                GetSerieList(4);
            });
        }

        function OpenSerieUpdate(Clave){
            var Clave = Clave;
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
                    Clave: function () {
                        return Clave;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetSerieList(4);
            });
        }

        function OpenSerieView(Clave){
            var Clave = Clave;
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
                    Clave: function () {
                        return Clave;
                    }
                }
            });
        }

        function OpenSerieDelete(Clave){
            var Clave = Clave;
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
                    Clave: function () {
                        return Clave;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetSerieList(4);
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