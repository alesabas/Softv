'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoDeleteCtrl', function(SeriesFactory, VentasFactory, CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, CveRango, $localStorage){
        
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
                        SaveMovimientoSistema();
                        ngNotify.set('CORRECTO, Se guardo el Rango.', 'success');
                        cancel();
                    });
                }else{
                    ngNotify.set('ERROR, No se puede eliminar porque al rango ya se le asigno un precio.', 'warn');
                }
            });
        }

        function SaveMovimientoSistema(Comando){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.ventas', 
                'Submodulo': 'home.ventas.rangos', 
                'Observaciones': 'Se eliminó rango', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': '', 
                'Clv_afectada': vm.CveRango
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.DeleteRango = DeleteRango;
        vm.cancel = cancel;
        initData();
        
    });