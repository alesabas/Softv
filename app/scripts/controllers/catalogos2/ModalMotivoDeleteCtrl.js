
angular
.module('softvApp')
.controller('ModalMotivoDeleteCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, Clv_motivo){

    function initData(){
        var OjbMotivo = {
          'Clv_MOTCAN': Clv_motivo,
          'MOTCAN': 0,
          'op': 0
        };
        CatalogosFactory.GetBuscaMotivoCancelacion(OjbMotivo).then(function(data){
          var Motivo = data.GetBuscaMotivoCancelacionResult[0];
          vm.Clave = Motivo.Clv_motivo;
          vm.Descripcion = Motivo.Descripcion;
        });
    }

    function DeleteMotivo(){
        CatalogosFactory.GetBORMotivoCancelacion(vm.Clave).then(function(data){
            if(data.GetBORMotivoCancelacionResult == -1){
                ngNotify.set('CORRECTO, se eliminó el motivo de cancelación.', 'success');
                cancel();
            }else{
                ngNotify.set('ERROR, al eliminar el motivo de cancelación.', 'warn');
            }
        })
    }

    function cancel() {
        $uibModalInstance.close();
    }

    var vm = this;
    vm.Titulo = 'Eliminar Motivo de Cancelación';
    vm.Icono = 'fa fa-less';
    vm.DeleteMotivo = DeleteMotivo;
    vm.cancel = cancel;
    initData();
});