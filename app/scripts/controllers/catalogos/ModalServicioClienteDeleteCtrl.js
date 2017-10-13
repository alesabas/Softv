'use strict';

angular
    .module('softvApp')
    .controller('ModalServicioClienteDeleteCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state){

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nueva Calle';
        vm.Icono = 'fa fa-plus';
        vm.cancel = vm.cancel;
        
    });