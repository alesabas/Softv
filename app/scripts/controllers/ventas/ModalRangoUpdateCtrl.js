'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoUpdateCtrl', function(SeriesFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, CveRango){
        
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
                for(var i = 0; vm.PlazaList.length > i; i ++){
                    if(vm.PlazaList[i].id_compania == idcompania){
                        vm.Plaza = vm.PlazaList[i];
                    }
                }
            });
        }

        function SaveRango(){
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
                    SeriesFactory.GetModCatalogoDeRangos(ObjRango).then(function(data){
                        ngNotify.set('CORRECTO, Se guardo el Rango.', 'success');
                        $rootScope.$emit('LoadRangoList');
                        cancel();
                    });
                }else{
                    ngNotify.set('ERROR, No se puede modificar porque al rango ya se le asigno un precio.', 'warn');
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Rango - ';
        vm.Icono = 'fa fa-pencil-sqaure-o';
        vm.View = false;
        vm.SaveRango = SaveRango;
        vm.cancel = cancel;
        initData();

    });