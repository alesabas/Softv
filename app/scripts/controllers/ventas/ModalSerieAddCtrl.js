'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieAddCtrl', function(VentasFactory, SeriesFactory, CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage){

        function initData(){
            var ObjVendedorList = {
                'Op': 0,
                'ClvUsuario': $localStorage.currentUser.idUsuario
            };
            SeriesFactory.GetVendedoresList(ObjVendedorList).then(function(data){
                vm.VendedorList = data.GetVendedoresListResult;
            });
        }

        function SaveSerie(){
            var ObjValidaSerie = {
                'CLAVE': vm.Clave, 
                'SERIE': vm.Serie, 
                'UltimoFolio_Usado': vm.UltimoFolio, 
                'Clv_Vendedor': vm.Vendedor.Clv_Vendedor, 
                'OPCION': 'N'
            };
            SeriesFactory.GetVALIDACatalogoSeries(ObjValidaSerie).then(function(data){
                var ValidaResult = data.GetVALIDACatalogoSeriesResult;
                if(ValidaResult == null){
                    var objCatalogoSeries = {
                        'Serie': vm.Serie,
                        'Folios_Impresos': vm.NumeroFoliosImpresos,
                        'UltimoFolio_Usado': vm.UltimoFolio,
                        'Clv_Vendedor': vm.Vendedor.Clv_Vendedor,
                        'Tipo': (vm.Tipo == 'C')? 1:2
                    };
                    SeriesFactory.AddCatalogoSeries(objCatalogoSeries).then(function(data){
                        if(data.AddCatalogoSeriesResult > 0){
                            vm.ClvSerie = data.AddCatalogoSeriesResult;
                            SaveMovimientoSistema(objCatalogoSeries);
                            ngNotify.set('CORRECTO, se guardó la Serie.', 'success');
                            cancel();
                        }else{
                            ngNotify.set('ERROR, al guardar la Serie.', 'warn');
                            cancel();
                        }
                    });
                }else{
                    ngNotify.set('ERROR, ' + ValidaResult.MSG, 'warn');
                }
            });
        }

        function SaveMovimientoSistema(Comando){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.ventas', 
                'Submodulo': 'home.ventas.series', 
                'Observaciones': 'Se agregó una serie nueva', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': JSON.stringify(Comando), 
                'Clv_afectada': vm.ClvSerie
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Nuevo Vendedor';
        vm.Icono = 'fa fa-plus';
        vm.View = false;
        vm.Clave = 0;
        vm.DisVendedor = false;
        vm.NumeroFolio = 0;
        vm.UltimoFolio = 0;
        vm.Tipo = 'V';
        vm.SaveSerie = SaveSerie;
        vm.cancel = cancel;
        initData();
        
    });