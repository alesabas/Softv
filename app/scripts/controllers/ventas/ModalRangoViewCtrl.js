'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoViewCtrl', function(SeriesFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, CveRango){
        
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

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Consultar Rango - ';
        vm.Icono = 'fa fa-eye';
        vm.View = true;
        vm.cancel = cancel;
        initData();
        
    });