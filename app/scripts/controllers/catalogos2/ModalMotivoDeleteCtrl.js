
angular
.module('softvApp')
.controller('ModalMotivoDeleteCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){


    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
vm.Titulo = 'Eliminar Registro';
vm.Icono = 'fa fa-less';
vm.cancel = cancel;
});