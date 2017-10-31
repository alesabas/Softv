'use strict';

angular
    .module('softvApp')
    .controller('ModalTiposColoniasFormViewCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, Clave){

        function initData(){
            CatalogosFactory.GetDeepTipo_Colonias1_New(Clave).then(function(data){
                var TipoColoniaResult = data.GetDeepTipo_Colonias1_NewResult;
                vm.IdTipoColonia = TipoColoniaResult.Clave;
                vm.TipoColonia = TipoColoniaResult.Concepto;
            });
        }

        function SaveTipoColonia(){
            var objTipo_Colonias1_New = {
                'Clave': vm.IdTipoColonia,
                'Concepto': vm.TipoColonia
            }
            CatalogosFactory.UpdateTipo_Colonias1_New(objTipo_Colonias1_New).then(function(data){
                if(data.UpdateTipo_Colonias1_NewResult == -1){
                    ngNotify.set('CORRECTO, se guardó el tipo de colonia.', 'success');
                    $state.reload('home.catalogos.tipos_colonias');
				    cancel();
                }else{
                    ngNotify.set('ERROR, al guardar el tipo de colonia.', 'warn');
                    $state.reload('home.catalogos.tipos_colonias');
				    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Detalle Registro - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = true;
        vm.SaveTipoColonia = SaveTipoColonia;
        vm.cancel = cancel;
        initData();

    });