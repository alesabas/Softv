'use strict';

angular
    .module('softvApp')
    .controller('ModalVelocidadInternetFormViewCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state){

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Detalle Velocidad de Internet';
        vm.Icono = 'fa fa-eye';
        vm.BlockInput = true;
        vm.View = true;
        vm.cancel = cancel;

    });