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
                    ngNotify.set('CORRECTO, se eliminó la localida.', 'success');
                    $state.reload('home.catalogos.localidades');
				    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar la localidad.', 'warn');
                }
            });
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