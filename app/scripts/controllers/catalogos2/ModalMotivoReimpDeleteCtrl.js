angular
.module('softvApp')
.controller('ModalMotivoReimpDeleteCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, Clv_motivo){

    function initData(){
      var ObjMotivo = {
        'Clv_Motivo':  Clv_motivo,
        'Descripcion': '',
        'Bandera': 1,    
        'op': 0
      };
      CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
        var Motivo = data.GetBuscaMotivosFacturaCanceladaResult[0];
        vm.Descripcion = Motivo.Descripcion;
        vm.Clave = Motivo.Clv_motivo;
      });
    }
    
    function DeleteMotivoR(){
        CatalogosFactory.GetBORMOTIVOSFACTURACANCELACION(vm.Clave).then(function(data){
            if(data.GetBORMOTIVOSFACTURACANCELACIONResult == 1){    
                ngNotify.set('CORRECTO, se eliminó un motivo de reimpresión de factura.', 'success');
                $state.reload('home.motivos.ReimpresionFactura');
                cancel();
            }else{
                ngNotify.set('ERROR, al eliminar un motivo de reimpresión de factura.', 'warn');
            }
        });
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.Titulo = 'Eliminar Motivo de Reimpresion';
    vm.Icono = 'fa fa-less';
    vm.DeleteMotivoR = DeleteMotivoR;
    vm.cancel = cancel;
    initData();
});