'use strict';

angular
    .module('softvApp')
    .controller('ModalCalleEliminarCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, CalleObj){
        
        function DeleteCalle(){
            CatalogosFactory.DeleteCalle(vm.IdCalle).then(function(data){
                if(data.DeleteCalleResult > 1){
                    var log={
                        'Modulo':'home.catalogos',
                        'Submodulo':'home.catalogos.calles',
                        'Observaciones':'Se eliminó calle ',
                        'Comando':'',
                        'Clv_afectada':vm.IdCalle
                    };

                    logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
                    ngNotify.set('CORRECTO, se eliminó la calle.', 'success');
                    $state.reload('home.catalogos.calles');
				    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar la calle.', 'warn');
                    $state.reload('home.catalogos.calles');
				    cancel();
                }
            });
        }
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.IdCalle = CalleObj.IdCalle;
        vm.Calle = CalleObj.Nombre;
        vm.DeleteCalle = DeleteCalle;
        vm.cancel = cancel;

    });