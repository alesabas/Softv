'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieAddCtrl', function(VentasFactory, SeriesFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage){

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
                            var ObjMovimientoSistema = {
                                'usuario': $localStorage.currentUser.usuario,
                                'contrato': 0,
                                'Sistema': 'Softv',
                                'Pantalla': 'Catálogo de Series',
                                'control': 'Nueva Serie',
                                'valorant': '',
                                'valornuevo': 'Serie:' + vm.Serie + ' / Vendedor:' + vm.Vendedor.Nombre,
                                'clv_ciudad': 'AG'
                            };
                            VentasFactory.GetInserta_MovSist(ObjMovimientoSistema).then(function(data){
                                ngNotify.set('CORRECTO, se guardó la Serie.', 'success');
                                $rootScope.$emit('LoadSerieList');
                                cancel();
                            });
                        }else{
                            ngNotify.set('ERROR, al guardar la Serie.', 'warn');
                            $rootScope.$emit('LoadSerieList');
                            cancel();
                        }
                    });
                }else{
                    ngNotify.set('ERROR, ' + ValidaResult.MSG, 'warn');
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
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