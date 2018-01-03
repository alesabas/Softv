'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoUpdateCtrl', function(SeriesFactory, VentasFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, CveRango){
        
        function initData(){
            SeriesFactory.GetMuestra_Compania_RelUsuarioList($localStorage.currentUser.idUsuario).then(function(data){
                vm.PlazaList = data.GetMuestra_Compania_RelUsuarioListResult;
                GetRango();
            });
        }
        
        function GetRango(){
            var ObjRango = {
                'CveRango': CveRango
            };
            SeriesFactory.GetConCatalogoDeRangos(ObjRango).then(function(data){
                var Rango = data.GetConCatalogoDeRangosResult;
                vm.CveRango = Rango.CveRango;
                vm.RangoInferior = Rango.rangoIni;
                vm.RangoSuperior = Rango.rangoFin;
                var idcompania = Rango.idcompania;
                MovimientoSistemaList[0].valorant = Rango.rangoIni;
                MovimientoSistemaList[1].valorant = Rango.rangoFin;
                for(var i = 0; vm.PlazaList.length > i; i ++){
                    if(vm.PlazaList[i].id_compania == idcompania){
                        vm.Plaza = vm.PlazaList[i];
                    }
                }
            });
        }

        function SaveRango(){
            /*var ObjRango = {
                'rangoIni': vm.RangoInferior,
                'rangoFin': vm.RangoSuperior,
                'idcompania': vm.Plaza.id_compania,
                'CveRango': vm.CveRango,
            };
            SeriesFactory.GetValidaUpdateRango(ObjRango).then(function(data){
                console.log(data);
            });*/
            
            var ObjRango = {
                'CveRango': vm.CveRango
            };
            SeriesFactory.GetValidaRangosAEliminar(ObjRango).then(function(data){
                if(data.GetValidaRangosAEliminarResult == 0){
                    var ObjRango = {
                        'CveRango': vm.CveRango,
                        'rangoIni': vm.RangoInferior,
                        'rangoFin': vm.RangoSuperior,
                        'idcompania': vm.Plaza.id_compania
                    };
                    MovimientoSistemaList[0].valornuevo = vm.RangoInferior;
                    MovimientoSistemaList[1].valornuevo = vm.RangoSuperior;
                    SeriesFactory.GetModCatalogoDeRangos(ObjRango).then(function(data){
                        SetMovimientoSistema();
                        /*
                        ngNotify.set('CORRECTO, Se guardo el Rango.', 'success');
                        $rootScope.$emit('LoadRangoList');
                        cancel();
                        */
                    });
                }else{
                    ngNotify.set('ERROR, No se puede modificar porque al rango ya se le asigno una comisión.', 'warn');
                }
            });
        }

        function SetMovimientoSistema(){
            for(var i = 0; MovimientoSistemaList.length > i; i++){
                if(MovimientoSistemaList[i].valorant != MovimientoSistemaList[i].valornuevo){
                    AddMovimientoSistema(i);
                }
            }
            ngNotify.set('CORRECTO, Se guardo el Rango.', 'success');
            $rootScope.$emit('LoadRangoList');
            cancel();
        }

        function AddMovimientoSistema(i){
            var ObjMovimientoSistema = {
                'usuario': $localStorage.currentUser.usuario,
                'contrato': 0,
                'Sistema': 'Softv',
                'Pantalla': 'Rangos',
                'control': MovimientoSistemaList[i].control,
                'valorant': MovimientoSistemaList[i].valorant,
                'valornuevo': MovimientoSistemaList[i].valornuevo,
                'clv_ciudad': 'AG'
            };
            VentasFactory.GetInserta_MovSist(ObjMovimientoSistema).then(function(data){
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Rango - ';
        vm.Icono = 'fa fa-pencil-sqaure-o';
        vm.View = false;
        var MovimientoSistemaList = [
            {'control': 'Rango Inferior', 'valorant': '', valornuevo: ''},
            {'control': 'Rango Superior', 'valorant': '', valornuevo: ''}
        ];
        vm.SaveRango = SaveRango;
        vm.cancel = cancel;
        initData();

    });