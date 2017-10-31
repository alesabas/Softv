'use strict';

angular
    .module('softvApp')
    .controller('ModalVelocidadInternetDeleteCtrl', function(CatalogosFactory, $uibModal, $uibModalInstance, ngNotify, $state){

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.cancel = cancel;

    });