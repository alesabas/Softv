angular
.module('softvApp')
.controller('ModalMotivoUpdateCtrl', function(CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, Clv_motivo){

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

    function SaveMotivo(){
        var ObjMotivo = {
            'Clv_MOTCAN': vm.Clave,
            'MOTCAN': vm.Descripcion
        };
        CatalogosFactory.GetMODMotivoCancelacion(ObjMotivo).then(function(data){
            if(data.GetMODMotivoCancelacionResult == -1){
                ngNotify.set('CORRECTO, se guardó el motivo de cancelación.', 'success');
                $state.reload('home.motivos.MotivosDeCancelacion');
                cancel();
            }else{
                ngNotify.set('ERROR, al guardar el motivo de cancelación.', 'warn');
            }
        });
    }

    function EliminaMotivo() {
        cancel();
        var Clv_motivo = vm.Clave;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalEliminarMotivo.html',
          controller: 'ModalMotivoDeleteCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'sm',
          resolve: {
              Clv_motivo: function () {
                  return Clv_motivo;
              }
          }
        });
      }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.Titulo = ' Editar Motivo DE Cancelación';
    vm.Icono = 'fa fa-pencil-square-o';
    vm.cancel = cancel;
    vm.SaveMotivo = SaveMotivo;
    vm.EliminaMotivo = EliminaMotivo;
    vm.blockdelete = false;
    initData();
});