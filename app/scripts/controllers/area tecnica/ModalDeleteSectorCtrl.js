angular
.module('softvApp')
.controller('ModalDeleteSectorCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){


    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
vm.Titulo = 'Eliminar Sector';
vm.Icono = 'fa fa-less';
vm.cancel = cancel;
});