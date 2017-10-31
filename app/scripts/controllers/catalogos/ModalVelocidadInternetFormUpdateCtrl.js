'use strict';

angular
    .module('softvApp')
    .controller('ModalVelocidadInternetFormUpdateCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state){

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Velocidad de Internet';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.BlockInput = true;
        vm.View = false;
        vm.cancel = cancel;

    });