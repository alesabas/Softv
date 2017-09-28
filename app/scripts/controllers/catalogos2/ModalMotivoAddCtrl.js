angular
.module('softvApp')
.controller('ModalMotivoAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){


    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
vm.Titulo = 'Nuevo Motivo de Cancelacion';
vm.Icono = 'fa fa-plus';
vm.cancel = cancel;
});