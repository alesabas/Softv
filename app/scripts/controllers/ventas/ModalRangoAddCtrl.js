'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoAddCtrl', function(SeriesFactory, VentasFactory, CatalogosFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function initData(){
            SeriesFactory.GetMuestra_Compania_RelUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                vm.PlazaList = data.GetMuestra_Compania_RelUsuarioListResult;
            });
        }

        function SaveRango(){
            var ObjRango = {
                'rangoIni': vm.RangoInferior,
                'rangoFin': vm.RangoSuperior,
                'idcompania': vm.Plaza.id_compania
            };
            SeriesFactory.GetuspChecaSiGuardaRango(ObjRango).then(function(data){
                if(data.GetuspChecaSiGuardaRangoResult == 0){
                    var ObjRango = {
                        'rangoIni': vm.RangoInferior,
                        'rangoFin': vm.RangoSuperior,
                        'idcompania': vm.Plaza.id_compania
                    };
                    SeriesFactory.GetNueCatalogoDeRangos(ObjRango).then(function(data){
                        SaveMovimientoSistema(ObjRango);
                        ngNotify.set('CORRECTO, Se guardó el Rango nuevo.', 'success');
                        cancel();
                    });
                }else{
                    ngNotify.set('ERROR, El rango ya ha sido dado de alta anteriormente.', 'warn');
                }
            });
        }

        function SaveMovimientoSistema(Comando){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.ventas', 
                'Submodulo': 'home.ventas.rangos', 
                'Observaciones': 'Se agregó un rango nuevo', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': JSON.stringify(Comando), 
                'Clv_afectada': 0
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Nuevo Rango';
        vm.Icono = 'fa fa-plus';
        vm.View = false;
        vm.RangoInferior = 0;
        vm.RangoSuperior = 1;
        vm.SaveRango = SaveRango;
        vm.cancel = cancel;
        initData();
        
    });