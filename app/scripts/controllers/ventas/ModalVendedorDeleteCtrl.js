'use strict';

angular
    .module('softvApp')
    .controller('ModalVendedorDeleteCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, Clv_Vendedor){
        
        function initData(){
            VentasFactory.GetDeepVendedores(Clv_Vendedor).then(function(data){
                console.log(data);
                var Vendedor = data.GetDeepVendedoresResult;
                vm.Clv_Vendedor = Vendedor.Clv_Vendedor;
                vm.Nombre = Vendedor.Nombre;
                vm.FechaIngreso = Vendedor.FechaIngreso;
                vm.FechaSalida = (Vendedor.FechaSalida != "01/01/1900" && Vendedor.FechaSalida != null)? Vendedor.FechaSalida:'';
            });
        }

        function DeleteVendedor(){
            VentasFactory.DeleteVendedores(vm.Clv_Vendedor).then(function(data){
                console.log(data);
                ngNotify.set('CORRECTO, se eliminó el banco.', 'success');
                $rootScope.$emit('LoadVendedorList');
                cancel();
            });
        }
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.DeleteVendedor = DeleteVendedor;
        vm.cancel = cancel;
        initData();
        
    });