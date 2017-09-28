angular
.module('softvApp')
.controller('ModalMotivoDetalleCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){


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
});