'use strict';

angular
    .module('softvApp')
    .controller('ModalConceptoDeleteCtrl', function($uibModalInstance, $uibModal, CatalogosFactory, $state, $rootScope, ngNotify, ObjConcepto){
    
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function DeleteConcepto(){
            CatalogosFactory.GetDeepValidaEliminaClvLlave(vm.CLV_LLAVE).then(function(data){
                var ObjConcepto = {
                    'CLV_LLAVE':vm.CLV_LLAVE,
                    'Clv_TipoCliente': vm.CLV_TIPOCLIENTE
                };
                CatalogosFactory.DeleteREL_TARIFADOS_SERVICIOS_New(ObjConcepto).then(function(data){
                    if(data.DeleteREL_TARIFADOS_SERVICIOS_NewResult == 1){
                        ngNotify.set('CORRECTO, se eliminó el concepto.', 'success');
                        $rootScope.$emit('LoadConceptos', vm.Clv_Servicio);
                        cancel();
                    }else{
                        ngNotify.set('ERROR, al eliminar el concepto.', 'warn');
                        $rootScope.$emit('LoadRefPersonal', vm.IdContrato);
                        cancel();
                    }
                });
            });
        }

        var vm = this;
        vm.cancel = cancel;
        vm.DeleteConcepto = DeleteConcepto;
        vm.CONCEPTO = ObjConcepto.ObjConcepto.CONCEPTO;
        vm.CLV_LLAVE = ObjConcepto.ObjConcepto.CLV_LLAVE;
        vm.CLV_TIPOCLIENTE = ObjConcepto.CLV_TIPOCLIENTE;
    });