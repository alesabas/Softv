'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoAddCtrl', function(SeriesFactory, VentasFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
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
                        var ObjMovimientoSistema = {
                            'usuario': $localStorage.currentUser.usuario,
                            'contrato': 0,
                            'Sistema': 'Softv',
                            'Pantalla': 'Rangos',
                            'control': 'Nuevo Rango',
                            'valorant': '',
                            'valornuevo': 'Rango: ' + vm.RangoInferior + ' - ' + vm.RangoSuperior,
                            'clv_ciudad': 'AG'
                        };
                        VentasFactory.GetInserta_MovSist(ObjMovimientoSistema).then(function(data){
                            ngNotify.set('CORRECTO, Se guardo el Rango nuevo.', 'success');
                            $rootScope.$emit('LoadRangoList');
                            cancel();
                        });
                    });
                }else{
                    ngNotify.set('ERROR, El rango ya ha sido dado de alta anteriormente.', 'warn');
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
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