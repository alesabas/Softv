'use strict';

angular
    .module('softvApp')
    .controller('ModalTiposColoniasEliminarCtrl', function(CatalogosFactory, $uibModalInstance,logFactory, ngNotify, $state, Clave){

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
                   
                    var log={
                        'Modulo':'home.catalogos',
                        'Submodulo':'home.catalogos.tipos_colonias',
                        'Observaciones':'Se eliminó tipo de colonia ',
                        'Comando':'',
                        'Clv_afectada':vm.IdTipoColonia
                    };

                    logFactory.AddMovSist(log).then(function(result){ console.log('add'); });

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