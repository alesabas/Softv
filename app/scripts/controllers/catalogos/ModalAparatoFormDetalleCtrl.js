angular
.module('softvApp')
.controller('ModalAparatoFormDetalleCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state,$uibModal){


    


    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
vm.Titulo = 'Detalle ';
vm.Icono = 'fa fa-plus';
vm.cancel = cancel;
vm.blockForm=true;

});