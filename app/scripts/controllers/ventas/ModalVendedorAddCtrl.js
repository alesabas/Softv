'use strict';

angular
    .module('softvApp')
    .controller('ModalVendedorAddCtrl', function(VentasFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
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
                    var ObjMovimientoSistema = {
                        'usuario': $localStorage.currentUser.usuario,
                        'contrato': 0,
                        'Sistema': 'Softv',
                        'Pantalla': 'Catálogo de Vendedores',
                        'control': 'Nuevo Vendedor',
                        'valorant': '',
                        'valornuevo': 'Vendedor: ' + vm.Nombre,
                        'clv_ciudad': 'AG'
                    };
                    VentasFactory.GetInserta_MovSist(ObjMovimientoSistema).then(function(data){
                        ngNotify.set('CORRECTO, se guardó el Vendedor.', 'success');
                        $rootScope.$emit('LoadVendedorList');
                        cancel();
                    });
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
        vm.Activo = true;
        vm.DisAdd = true;
        vm.FechaIngreso = new Date();
        vm.SaveVendedor = SaveVendedor;
        vm.cancel = cancel;
        initData();
        console.log($localStorage);
    });