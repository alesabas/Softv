'use strict';

angular
    .module('softvApp')
    .controller('ModalVendedorAddCtrl', function(VentasFactory, CatalogosFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function initData(){
            VentasFactory.GetMuestra_PlazasPorUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                vm.DistribuidorList = data.GetMuestra_PlazasPorUsuarioListResult;
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
                if(data.AddVendedoresResult > 0){
                    vm.Clv_Vendedor = data.AddVendedoresResult;
                    SaveMovimientoSistema(objVendedores);
                    ngNotify.set('CORRECTO, se guardó el Vendedor.', 'success');
                    cancel();
                }else{
                    ngNotify.set('ERROR, al guardar el Vendedor.', 'warn');
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

        function SaveMovimientoSistema(Comando){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.ventas', 
                'Submodulo': 'home.ventas.vendedores', 
                'Observaciones': 'Se agregó un vendedor nuevo', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': JSON.stringify(Comando), 
                'Clv_afectada': vm.Clv_Vendedor
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Nuevo Vendedor';
        vm.Icono = 'fa fa-plus';
        vm.View = false;
        vm.Activo = true;
        vm.DisAdd = true;
        vm.FechaIngreso = new Date();
        vm.SaveVendedor = SaveVendedor;
        vm.cancel = cancel;
        initData();
    });