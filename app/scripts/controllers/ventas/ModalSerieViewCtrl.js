'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieViewCtrl', function(SeriesFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage, Clave){
        
        function initData(){
            var ObjVendedorList = {
                'Op': 0,
                'ClvUsuario': $localStorage.currentUser.idUsuario
            };
            SeriesFactory.GetVendedoresList(ObjVendedorList).then(function(data){
                console.log(data);
                vm.VendedorList = data.GetVendedoresListResult;
                GetSerie();
            });
        }

        function GetSerie(){
            SeriesFactory.GetDeepCatalogoSeries(Clave).then(function(data){
                console.log(data);
                var Serie = data.GetDeepCatalogoSeriesResult;
                vm.Clave = Serie.Clave;
                vm.Serie = Serie.Serie;
                vm.NumeroFoliosImpresos = Serie.Folios_Impresos;
                vm.UltimoFolio = Serie.UltimoFolio_Usado;
                vm.Tipo = (Serie.Tipo == 1)? 'C':'V';
                var Clv_Vendedor = Serie.Clv_Vendedor;
                for(var i = 0; vm.VendedorList.length > i; i ++){
                    if(vm.VendedorList[i].Clv_Vendedor == Clv_Vendedor){
                        vm.Vendedor = vm.VendedorList[i];
                    }
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Consultar Serie - ';
        vm.Icono = 'fa fa-eye';
        vm.View = true;
        vm.DisVendedor = true;
        vm.cancel = cancel;
        initData();
        
    });