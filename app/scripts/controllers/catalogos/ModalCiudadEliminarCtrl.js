'use strict';

angular
    .module('softvApp')
    .controller('ModalCiudadEliminarCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, IdMunicipio){

        function initData(){
            CatalogosFactory.GetMuestraCiudadById(IdMunicipio).then(function(data){
                var Ciudad = data.GetMuestraCiudadByIdResult[0];
                vm.IdCiudad = Ciudad.Clv_Ciudad;
                vm.Ciudad = Ciudad.Nombre;
            });
            var ObjMunicipio = {
                'Op': 3,
                'Clv_Ciudad': IdMunicipio 
            };
            CatalogosFactory.GetMuestraRelEdoCd(ObjMunicipio).then(function(data){
                vm.RelEstList = data.GetMuestraRelEdoCdResult;
            });
        }

        function DeleteCiudad(){
            if(vm.RelEstList.length == 0){
                CatalogosFactory.DeleteCiudades_New(vm.IdCiudad).then(function(data){
                    if(data.DeleteCiudades_NewResult == -1){
                        ngNotify.set('CORRECTO, se eliminó la ciudad.', 'success');
                        $state.reload('home.catalogos.ciudades');
                        cancel();
                    }else{
                        ngNotify.set('ERROR, al eliminar la ciudad.', 'warn');
                        $state.reload('home.catalogos.ciudades');
                        cancel();
                    }
                });
            }else{
                ngNotify.set('ERROR, No se puede eliminar, la ciudad cuenta con una o más relaciones.', 'warn');
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.cancel = cancel;
        vm.DeleteCiudad = DeleteCiudad;
        initData();
    });