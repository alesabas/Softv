'use strict';

angular
    .module('softvApp')
    .controller('VendedoresCtrl', function(VentasFactory, distribuidorFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function initData(){
            VentasFactory.GetMuestra_PlazasPorUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                vm.DistribuidorList = data.GetMuestra_PlazasPorUsuarioListResult;
                vm.Distribuidor = vm.DistribuidorList[0];
                GetVendedorList(3);
            });
        }

        function GetVendedorList(Op){
            var ObjVendedorList = {
                'op': Op, 
                'Clv_Vendedor': vm.Clave, 
                'Nombre': vm.Nombre, 
                'ClvUsuario': $localStorage.currentUser.idUsuario, 
                'idcompania': (vm.Distribuidor != undefined)? vm.Distribuidor.Clv_Plaza : 0
            };
            VentasFactory.GetBUSCAVENDEDORESList(ObjVendedorList).then(function(data){
                vm.VendedorList = data.GetBUSCAVENDEDORESListResult;
                vm.ViewList = (vm.VendedorList.length > 0)? true:false;
                vm.Clave = null;
                vm.Nombre = null;
            });
        }
        /*
        $rootScope.$on('LoadVendedorList', function(e){
            GetVendedorList(3);
        });
        */
        function OpenVendedorAdd(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalVendedorForm.html',
                controller: 'ModalVendedorAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg'
            });
            modalInstance.result.then(function () {
                GetVendedorList(3);
            });
        }

        function OpenVendedorUpdate(Clv_Vendedor){
            var Clv_Vendedor = Clv_Vendedor;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalVendedorForm.html',
                controller: 'ModalVendedorUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg',
                resolve: {
                    Clv_Vendedor: function () {
                        return Clv_Vendedor;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetVendedorList(3);
            });
        }

        function OpenVendedorView(Clv_Vendedor){
            var Clv_Vendedor = Clv_Vendedor;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalVendedorForm.html',
                controller: 'ModalVendedorViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg',
                resolve: {
                    Clv_Vendedor: function () {
                        return Clv_Vendedor;
                    }
                }
            });
        }

        function OpenVendedorDelete(Clv_Vendedor){
            var Clv_Vendedor = Clv_Vendedor;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/ventas/ModalVendedorDelete.html',
                controller: 'ModalVendedorDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    Clv_Vendedor: function () {
                        return Clv_Vendedor;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetVendedorList(3);
            });
        }

        var vm = this;
        vm.OpenVendedorAdd = OpenVendedorAdd;
        vm.OpenVendedorUpdate = OpenVendedorUpdate;
        vm.OpenVendedorView = OpenVendedorView;
        vm.OpenVendedorDelete = OpenVendedorDelete;
        vm.GetVendedorList = GetVendedorList;
        initData();

    });