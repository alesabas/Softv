angular
.module('softvApp')
.controller('ModalMotivoCancelFactAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){


    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
vm.Titulo = 'Nuevo Motivo de Cancelacion de Factura';
vm.Icono = 'fa fa-plus';
vm.cancel = cancel;

});