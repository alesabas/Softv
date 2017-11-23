'use strict';

angular
    .module('softvApp')
    .controller('ModalVendedorAddCtrl', function(VentasFactory, distribuidorFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function initData(){
            distribuidorFactory.Getplaza(0,'').then(function(data){
                console.log(data);
                vm.DistribuidorList = data.GetPlaza_DistribuidoresNewResult;
            });
        }

        function SaveVendedor(){
            var objVendedores = {
                'Nombre': vm.Nombre,
                'Domicilio': vm.Domicilio,
                'Colonia': vm.Colonia,
                'FechaIngreso': (vm.FechaIngreso != undefined)? SaveDate(vm.FechaIngreso):'',
                'FechaSalida': '',
                'Activo': vm.Activo,
                'Clv_TipPro': 0,
                'Clv_Grupo': 0,
                'idcompania': vm.Distribuidor.Clv_Plaza
            };
            VentasFactory.AddVendedores(objVendedores).then(function(data){
                console.log(data);
                if(data.AddVendedoresResult > 0){
                    ngNotify.set('CORRECTO, se guardó el Vendedor.', 'success');
                    $rootScope.$emit('LoadVendedorList');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al guardar el Vendedor.', 'warn');
                    $rootScope.$emit('LoadVendedorList');
                    cancel();
                }
            });
        }

        function SaveDate(Fecha){
            var FechaD = Fecha.getDate();
            var FechaM = Fecha.getMonth() + 1;
            var FechaY = Fecha.getFullYear();
            return FechaD + '/' + FechaM + '/' + FechaY;
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Vendedor';
        vm.Icono = 'fa fa-plus';
        vm.View = false;
        vm.FechaIngreso = new Date();
        vm.Activo = true;
        vm.DisAdd = true;
        vm.SaveVendedor = SaveVendedor;
        vm.cancel = cancel;
        initData();
        
    });