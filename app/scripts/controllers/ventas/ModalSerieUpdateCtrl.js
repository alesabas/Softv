'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieUpdateCtrl', function(SeriesFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage, Clave){
        
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

        function SaveSerie(){
            var ObjValidaSerie = {
                'CLAVE': vm.Clave, 
                'SERIE': vm.Serie, 
                'UltimoFolio_Usado': vm.UltimoFolio, 
                'Clv_Vendedor': vm.Vendedor.Clv_Vendedor, 
                'OPCION': 'M'
            };
            SeriesFactory.GetVALIDACatalogoSeries(ObjValidaSerie).then(function(data){
                console.log(data);
                var ValidaResult = data.GetVALIDACatalogoSeriesResult;
                console.log(ValidaResult);
                if(ValidaResult == null){
                    var objCatalogoSeries = {
                        'Clave': vm.Clave,
                        'Serie': vm.Serie,
                        'Folios_Impresos': vm.NumeroFoliosImpresos,
                        'UltimoFolio_Usado': vm.UltimoFolio,
                        'Clv_Vendedor': vm.Vendedor.Clv_Vendedor,
                        'Tipo': (vm.Tipo == 'C')? 1:2
                    };
                    SeriesFactory.UpdateCatalogoSeries(objCatalogoSeries).then(function(data){
                        console.log(data);
                        ngNotify.set('CORRECTO, se guardó la Serie.', 'success');
                        $rootScope.$emit('LoadSerieList');
                        cancel();
                    });
                }else{
                    console.log('null');
                    ngNotify.set('ERROR, ' + ValidaResult.MSG, 'warn');
                }
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
        vm.Titulo = 'Editar Serie - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = false;
        vm.DisVendedor = true;
        vm.SaveSerie = SaveSerie;
        vm.cancel = cancel;
        initData();

    });