angular
.module('softvApp')
.controller('ModalMotivoReimpDeleteCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){


    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
vm.Titulo = 'Eliminar Motivo de Reimpresion';
vm.Icono = 'fa fa-less';
vm.cancel = cancel;
});