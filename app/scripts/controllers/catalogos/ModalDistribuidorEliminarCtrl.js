'use strict';

angular
    .module('softvApp')
    .controller('ModalDistribuidorEliminarCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, DistribuidorObj){

        function DeleteDistribuidor(){
            CatalogosFactory.DeleteDistribuidor(vm.IdDistribuidor).then(function(data){
                if(data.DeleteDistribuidorResult > 0){
                    var log={
                        'Modulo':'home.catalogos',
                        'Submodulo':'home.catalogos.distribuidores',
                        'Observaciones':'Se eliminó distribuidor',
                        'Comando':'',
                        'Clv_afectada': vm.IdDistribuidor
                    };
            
                    logFactory.AddMovSist(log).then(function(result){ console.log('add'); });   
                    ngNotify.set('CORRECTO, se eliminó el distribuidor.', 'success');
                    $state.reload('home.catalogos.distribuidores');
				    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar el distribuidor.', 'warn');
                    $state.reload('home.catalogos.distribuidores');
				    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.IdDistribuidor = DistribuidorObj.IdDistribuidor;
        vm.Distribuidor = DistribuidorObj.Nombre;
        vm.DeleteDistribuidor = DeleteDistribuidor;
        vm.cancel = cancel;

    });