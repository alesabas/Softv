'use strict';

angular
    .module('softvApp')
    .controller('ModalLocalidadEliminarCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, LocalidadObj){

        function DeleteLocalidad(){
            var ObjLocalidad = {
                'opcion': 2,
                'Nombre': '',
                'clvnuevo': vm.IdLocalidad,
            };
            CatalogosFactory.DeleteLocalidades_New(ObjLocalidad).then(function(data){
                if(data.DeleteLocalidades_NewResult == 0){
                    var log={
                        'Modulo':'home.catalogos',
                        'Submodulo':'home.catalogos.localidades',
                        'Observaciones':'Se eliminó localidad',
                        'Comando':JSON.stringify(ObjLocalidad),
                        'Clv_afectada': vm.IdLocalidad
                    };
            
                    logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
                    ngNotify.set('CORRECTO, se eliminó la localida.', 'success');
                    Ok();
                }else{
                    ngNotify.set('ERROR, al eliminar la localidad.', 'warn');
                    cancel();
                }
            });
        }

        function Ok(){
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.IdLocalidad = LocalidadObj.Clv_Localidad;
        vm.Localidad = LocalidadObj.Nombre;
        vm.DeleteLocalidad = DeleteLocalidad;
        vm.cancel = cancel;

    });