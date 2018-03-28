'use strict';

angular
    .module('softvApp')
    .controller('ModalVendedorDeleteCtrl', function(VentasFactory, $uibModalInstance, CatalogosFactory, $uibModal, ngNotify, $state, $rootScope, $localStorage, Clv_Vendedor){
        
        function initData(){
            VentasFactory.GetDeepVendedores(Clv_Vendedor).then(function(data){
                var Vendedor = data.GetDeepVendedoresResult;
                vm.Clv_Vendedor = Vendedor.Clv_Vendedor;
                vm.Nombre = Vendedor.Nombre;
                vm.FechaIngreso = Vendedor.FechaIngreso;
                vm.FechaSalida = (Vendedor.FechaSalida != "01/01/1900" && Vendedor.FechaSalida != null)? Vendedor.FechaSalida:'';
                vm.Activo = (Vendedor.Activo == true)? 'Si':'No';
            });
        }

        function DeleteVendedor(){
            VentasFactory.DeleteVendedores(vm.Clv_Vendedor).then(function(data){
                SaveMovimientoSistema();
                ngNotify.set('CORRECTO, se eliminó Vendedor.', 'success');
                cancel();
            });
        }

        function SaveMovimientoSistema(){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.ventas', 
                'Submodulo': 'home.ventas.vendedores', 
                'Observaciones': 'Se eliminó un vendedor', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': '', 
                'Clv_afectada': vm.Clv_Vendedor
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }
        
        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.DeleteVendedor = DeleteVendedor;
        vm.cancel = cancel;
        initData();
        
    });