angular
.module('softvApp')
.controller('ModalMotivoDetalleCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state, Clv_motivo){

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

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.Titulo = ' Detalle de Motivo de Cancelacion';
    vm.Icono = 'fa fa-eye';
    vm.cancel = cancel;
    vm.blockForm = true;
    vm.blocksave = true;
    vm.blockdelete = true;
    initData();
});