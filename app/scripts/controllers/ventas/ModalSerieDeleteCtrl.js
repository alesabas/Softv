'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieDeleteCtrl', function(VentasFactory, SeriesFactory, CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, Clave, $localStorage){
        
        function initData(){
            SeriesFactory.GetDeepCatalogoSeries(Clave).then(function(data){
                var Serie = data.GetDeepCatalogoSeriesResult;
                vm.Clave = Serie.Clave;
                vm.Serie = Serie.Serie;
            });
        }

        function DeleteSerie(){
            SeriesFactory.DeleteCatalogoSeries(vm.Clave).then(function(data){
                SaveMovimientoSistema();
                ngNotify.set('CORRECTO, se eliminó la Serie.', 'success');
                cancel();
            });
        }

        function SaveMovimientoSistema(){
            var objMovSist = {
                'Clv_usuario': $localStorage.currentUser.idUsuario, 
                'Modulo': 'home.ventas', 
                'Submodulo': 'home.ventas.series', 
                'Observaciones': 'Se eliminó una serie', 
                'Usuario': $localStorage.currentUser.usuario, 
                'Comando': '', 
                'Clv_afectada': vm.Clave
            };
            CatalogosFactory.AddMovSist(objMovSist).then(function(data){
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.DeleteSerie = DeleteSerie;
        vm.cancel = cancel;
        initData();
        
    });