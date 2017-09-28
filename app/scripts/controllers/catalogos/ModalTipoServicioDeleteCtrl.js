'use strict';

angular
    .module('softvApp')
    .controller('ModalTipoServicioDeleteCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, Clv_TipSer){

        function initData(){
             CatalogosFactory.GetDeepTipServ_New(Clv_TipSer).then(function(data){
                var TipoServicioResult = data.GetDeepTipServ_NewResult;
                vm.TipoServicio = TipoServicioResult.Concepto;
                vm.IdTipoServicio = TipoServicioResult.Clv_TipSer;
            });
        }

        function DeleteTipoServicio(){
            CatalogosFactory.DeleteTipServ_New(vm.IdTipoServicio).then(function(data){
                if(data.DeleteTipServ_NewResult == -1){
                    ngNotify.set('CORRECTO, se eliminó el tipo de servicio.', 'success');
                    $state.reload('home.catalogos.tipos_servicios');
				    cancel();
                }else{
                    ngNotify.set('ERROR, al eliminar el tipo de servicio.', 'warn');
                    $state.reload('home.catalogos.tipos_servicios');
				    cancel();
                }
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.DeleteTipoServicio = DeleteTipoServicio;
        vm.cancel = cancel;
        initData();
    });