'use strict';

angular
    .module('softvApp')
    .controller('ModalImprimirFoliosCtrl', function(SeriesFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage){
        
        function initData(){
            SeriesFactory.GetSP_SerieFolioList($localStorage.currentUser.idUsuario).then(function(data){
                console.log(data);
                vm.SerieList = data.GetSP_SerieFolioListResult;
                vm.Serie = vm.SerieList[0];
            });
        }

        function ValidaFolios(){
            vm.CantidadFolio = null;
            if(vm.Serie.Clave > 0){
                var objDameTipoSerie = {
                    'clave': vm.Serie.Clave
                };
                SeriesFactory.AddDameTipoSerie(objDameTipoSerie).then(function(data){
                    console.log(data);
                    vm.TipoSerie = data.AddDameTipoSerieResult;
                    var objValidaFoliosImprimir = {
                        'serie': vm.Serie.Serie
                    };
                    SeriesFactory.AddValidaFoliosImprimir(objValidaFoliosImprimir).then(function(data){
                        console.log(data);
                        vm.ValidaFoliosRes = data.AddValidaFoliosImprimirResult;
                        vm.Cant = (vm.TipoSerie == 1)? 15:7;
                        var Concepto = (vm.TipoSerie == 1)? 'Cobro':'Venta';
                        if((vm.TipoSerie == 1 && vm.ValidaFoliosRes >= 15) || (vm.TipoSerie == 2 && vm.ValidaFoliosRes >= 7)){
                            ngNotify.set('ERROR, No se pueden tener mas de ' + vm.Cant + ' folios impresos para ' + Concepto + '.', 'warn');
                        }
                        vm.DisCantidadFolio = ((vm.TipoSerie == 1 && vm.ValidaFoliosRes >= 15) || (vm.TipoSerie == 2 && vm.ValidaFoliosRes >= 7))? true:false;
                        vm.CantidadFolioDisp = (vm.TipoSerie == 1)? 15 - vm.ValidaFoliosRes : 7 - vm.ValidaFoliosRes;
                    });
                });
            }
        }

        function ImprimirFolio(){
            var objCatalogoSeries = {
                'Serie': vm.Serie.Serie,
                'Folio': vm.CantidadFolio
            };
            SeriesFactory.AddFolios(objCatalogoSeries).then(function(data){
                console.log(data);
                SeriesFactory.AddSerieFolios(objCatalogoSeries).then(function(data){
                    console.log(data);
                    ngNotify.set('CORRECTO, Se imprimieron Folios.', 'success');
                    cancel();
                });
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.DisCantidadFolio = false;
        vm.CantidadFolioMsg = '';
        vm.ValidaFolios = ValidaFolios;
        vm.ImprimirFolio = ImprimirFolio;
        vm.cancel = cancel;
        initData();
        
    });