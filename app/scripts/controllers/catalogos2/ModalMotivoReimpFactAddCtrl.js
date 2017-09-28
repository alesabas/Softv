angular
.module('softvApp')
.controller('ModalMotivoReimpFactAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){


    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
vm.Titulo = 'Nuevo Motivo de Reimpresion de Factura';
vm.Icono = 'fa fa-plus';
vm.cancel = cancel;

});