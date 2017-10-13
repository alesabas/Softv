'use strict';

angular
  .module('softvApp')
  .controller('ModalMotivoCancelFactDeleteCtrl', function (CatalogosFactory, $uibModalInstance, ngNotify, $state, Clv_motivo) {

    function initData(){
      var ObjMotivo = {
        'Clv_Motivo':  Clv_motivo,
        'Descripcion': '',
        'Bandera': 0,    
        'op': 0
      };
      CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
        var Motivo = data.GetBuscaMotivosFacturaCanceladaResult[0];
        vm.Descripcion = Motivo.Descripcion;
        vm.Clave = Motivo.Clv_motivo;
      });
    }
    
    function DeleteMotivoF(){
        CatalogosFactory.GetBORMOTIVOSFACTURACANCELACION(vm.Clave).then(function(data){
            if(data.GetBORMOTIVOSFACTURACANCELACIONResult == 1){    
                ngNotify.set('CORRECTO, se eliminó un motivo de cancelación de factura.', 'success');
                $state.reload('home.motivos.CancelacionFactura');
                cancel();
            }else{
                ngNotify.set('ERROR, al eliminar un motivo de cancelación de factura.', 'warn');
            }
        });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.DeleteMotivoF = DeleteMotivoF;
    vm.cancel = cancel;
    initData();
});