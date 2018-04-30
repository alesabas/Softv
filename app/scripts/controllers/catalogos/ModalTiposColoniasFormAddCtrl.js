'use strict';

angular
    .module('softvApp')
    .controller('ModalTiposColoniasFormAddCtrl', function(CatalogosFactory, $uibModalInstance,logFactory, ngNotify, $state){

        function SaveTipoColonia(){
            var objTipo_Colonias1_New = {
                'Concepto': vm.TipoColonia
            };
            CatalogosFactory.AddTipo_Colonias1_New(objTipo_Colonias1_New).then(function(data){
                if(data.AddTipo_Colonias1_NewResult > 0){
                    ngNotify.set('CORRECTO, se añadió un tipo de colonia nuevo.', 'success');
                    $state.reload('home.catalogos.tipos_colonias');
                    var log={
                        'Modulo':'home.catalogos',
                        'Submodulo':'home.catalogos.tipos_colonias',
                        'Observaciones':'Se registró nueva tipo de colonia ',
                        'Comando':JSON.stringify(objTipo_Colonias1_New),
                        'Clv_afectada':data.AddTipo_Colonias1_NewResult
                    };

                    logFactory.AddMovSist(log).then(function(result){ console.log('add'); });
				    cancel();
                }else{
                    ngNotify.set('ERROR, al añadir un tipo de colonia nuevo.', 'warn');
				    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.Titulo = 'Nuevo Tipo de Colonia';
        vm.Icono = 'fa fa-plus';
        vm.View = false;
        vm.SaveTipoColonia = SaveTipoColonia;
        vm.cancel = cancel;

    });