'use strict';

angular
    .module('softvApp')
    .controller('ModalTiposColoniasEliminarCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, Clave){

        function initData(){
            CatalogosFactory.GetDeepTipo_Colonias1_New(Clave).then(function(data){
                var TipoColoniaResult = data.GetDeepTipo_Colonias1_NewResult;
                vm.IdTipoColonia = TipoColoniaResult.Clave;
                vm.TipoColonia = TipoColoniaResult.Concepto;
            });
        }

        function DeleteTipoColonia(){
            CatalogosFactory.DeleteTipo_Colonias1_New(vm.IdTipoColonia).then(function(data){
                if(data.DeleteTipo_Colonias1_NewResult == -1){
                    ngNotify.set('CORRECTO, se eliminó el tipo de colonia.', 'success');
                    $state.reload('home.catalogos.tipos_colonias');
				    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar el tipo de colonia.', 'warn');
                    $state.reload('home.catalogos.tipos_colonias');
				    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.DeleteTipoColonia = DeleteTipoColonia;
        vm.cancel = cancel;
        initData();
    });