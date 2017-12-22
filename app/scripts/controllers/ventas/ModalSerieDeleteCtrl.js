'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieDeleteCtrl', function(VentasFactory, SeriesFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope, Clave, $localStorage){
        
        function initData(){
            SeriesFactory.GetDeepCatalogoSeries(Clave).then(function(data){
                var Serie = data.GetDeepCatalogoSeriesResult;
                vm.Clave = Serie.Clave;
                vm.Serie = Serie.Serie;
            });
        }

        function DeleteSerie(){
            SeriesFactory.DeleteCatalogoSeries(vm.Clave).then(function(data){
                var ObjMovimientoSistema = {
                    'usuario': $localStorage.currentUser.usuario,
                    'contrato': 0,
                    'Sistema': 'Softv',
                    'Pantalla': 'Catálogo de Series',
                    'control': 'Se Eliminó Serie',
                    'valorant': 'Serie:' + vm.Serie,
                    'valornuevo': '',
                    'clv_ciudad': 'AG'
                };
                VentasFactory.GetInserta_MovSist(ObjMovimientoSistema).then(function(data){
                    ngNotify.set('CORRECTO, se eliminó la Serie.', 'success');
                    $rootScope.$emit('LoadSerieList');
                    cancel();
                });
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