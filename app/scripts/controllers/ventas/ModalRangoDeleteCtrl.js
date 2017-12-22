'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoDeleteCtrl', function(SeriesFactory, VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, CveRango, $localStorage){
        
        function initData(){
            var ObjRango = {
                'CveRango': CveRango
            };
            SeriesFactory.GetConCatalogoDeRangos(ObjRango).then(function(data){
                var Rango = data.GetConCatalogoDeRangosResult;
                vm.CveRango = Rango.CveRango;
                vm.RangoInferior = Rango.rangoIni;
                vm.RangoSuperior = Rango.rangoFin;
            });
        }

        function DeleteRango(){
            var ObjRango = {
                'CveRango': vm.CveRango
            };
            SeriesFactory.GetValidaRangosAEliminar(ObjRango).then(function(data){
                if(data.GetValidaRangosAEliminarResult == 0){
                    SeriesFactory.GetBorCatalogoDeRangos(ObjRango).then(function(data){
                        var ObjMovimientoSistema = {
                            'usuario': $localStorage.currentUser.usuario,
                            'contrato': 0,
                            'Sistema': 'Softv',
                            'Pantalla': 'Rangos',
                            'control': 'Se Eliminó Rango',
                            'valorant': '',
                            'valornuevo': 'Rango: ' + vm.RangoInferior + ' - ' + vm.RangoSuperior,
                            'clv_ciudad': 'AG'
                        };
                        VentasFactory.GetInserta_MovSist(ObjMovimientoSistema).then(function(data){
                            ngNotify.set('CORRECTO, Se guardo el Rango.', 'success');
                            $rootScope.$emit('LoadRangoList');
                            cancel();
                        });
                        /*
                        ngNotify.set('CORRECTO, Se guardo el Rango.', 'success');
                        $rootScope.$emit('LoadRangoList');
                        cancel();
                        */
                    });
                }else{
                    ngNotify.set('ERROR, No se puede eliminar porque al rango ya se le asigno un precio.', 'warn');
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.DeleteRango = DeleteRango;
        vm.cancel = cancel;
        initData();
        
    });