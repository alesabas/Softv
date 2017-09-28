angular
.module('softvApp')
.controller('ModalMotivoUpdateCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){


    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
vm.Titulo = ' Editar Motivo DE Cancelacion';
vm.Icono = 'fa fa-pencil-square-o';
vm.cancel = cancel;
vm.blockForm = false;
vm.blocksave = false;
vm.blockdelete = true;
});