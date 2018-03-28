'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieUpdateCtrl', function(SeriesFactory, VentasFactory, CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage, Clave){
        
        function initData(){
            var ObjVendedorList = {
                'Op': 0,
                'ClvUsuario': $localStorage.currentUser.idUsuario
            };
            SeriesFactory.GetVendedoresList(ObjVendedorList).then(function(data){
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
                var ValidaResult = data.GetVALIDACatalogoSeriesResult;
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
                        SaveMovimientoSistema(objCatalogoSeries);
                        ngNotify.set('CORRECTO, se guardó la Serie.', 'success');
                        cancel();
                    });
                }else{
                    ngNotify.set('ERROR, ' + ValidaResult.MSG, 'warn');
                }
            });
        }

        function GetSerie(){
            SeriesFactory.GetDeepCatalogoSeries(Clave).then(function(data){
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

        function SaveMovimientoSistema(Comando){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.ventas', 
                'Submodulo': 'home.ventas.series', 
                'Observaciones': 'Se editó una serie', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': JSON.stringify(Comando), 
                'Clv_afectada': vm.Clave
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }

        function cancel() {
            $uibModalInstance.close();
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