'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieUpdateCtrl', function(SeriesFactory, VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, $localStorage, Clave){
        
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
                    MovimientoSistemaList[0].valornuevo = vm.Serie;
                    MovimientoSistemaList[1].valornuevo = vm.UltimoFolio;
                    SeriesFactory.UpdateCatalogoSeries(objCatalogoSeries).then(function(data){
                        SetMovimientoSistema();
                        /*
                        ngNotify.set('CORRECTO, se guardó la Serie.', 'success');
                        $rootScope.$emit('LoadSerieList');
                        cancel();
                        */
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
                MovimientoSistemaList[0].valorant = Serie.Serie;
                MovimientoSistemaList[1].valorant = Serie.UltimoFolio_Usado;
                var Clv_Vendedor = Serie.Clv_Vendedor;
                for(var i = 0; vm.VendedorList.length > i; i ++){
                    if(vm.VendedorList[i].Clv_Vendedor == Clv_Vendedor){
                        vm.Vendedor = vm.VendedorList[i];
                    }
                }
            });
        }

        function SetMovimientoSistema(){
            for(var i = 0; MovimientoSistemaList.length > i; i++){
                if(MovimientoSistemaList[i].valorant != MovimientoSistemaList[i].valornuevo){
                    AddMovimientoSistema(i);
                }
            }
            ngNotify.set('CORRECTO, se guardó la Serie.', 'success');
            $rootScope.$emit('LoadSerieList');
            cancel();
        }

        function AddMovimientoSistema(i){
            var ObjMovimientoSistema = {
                'usuario': $localStorage.currentUser.usuario,
                'contrato': 0,
                'Sistema': 'Softv',
                'Pantalla': 'Catálogo de Series',
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

        var vm = this;
        vm.Titulo = 'Editar Serie - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = false;
        vm.DisVendedor = true;
        var MovimientoSistemaList = [
            {'control': 'Serie', 'valorant': '', valornuevo: ''},
            {'control': 'Último Folio Usado', 'valorant': '', valornuevo: ''}
        ];
        vm.SaveSerie = SaveSerie;
        vm.cancel = cancel;
        initData();

    });