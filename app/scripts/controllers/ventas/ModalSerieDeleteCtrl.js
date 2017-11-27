'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieDeleteCtrl', function(SeriesFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, Clave){
        
        function initData(){
            SeriesFactory.GetDeepCatalogoSeries(Clave).then(function(data){
                console.log(data);
                var Serie = data.GetDeepCatalogoSeriesResult;
                vm.Clave = Serie.Clave;
                vm.Serie = Serie.Serie;
            });
        }

        function DeleteSerie(){
            SeriesFactory.DeleteCatalogoSeries(vm.Clave).then(function(data){
                console.log(data);
                ngNotify.set('CORRECTO, se eliminó la Serie.', 'success');
                $rootScope.$emit('LoadSerieList');
                cancel();
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.DeleteSerie = DeleteSerie;
        vm.cancel = cancel;
        initData();
        console.log(Clave);
        
    });