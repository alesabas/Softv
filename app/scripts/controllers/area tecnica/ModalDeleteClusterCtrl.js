angular
.module('softvApp')
.controller('ModalDeleteClusterCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){


    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

var vm = this;
vm.Titulo = 'Eliminar Cluster';
vm.Icono = 'fa fa-less';
vm.cancel = cancel;
});