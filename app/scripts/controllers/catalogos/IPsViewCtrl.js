'use strict';

angular
    .module('softvApp')
    .controller('IPsViewCtrl', function(CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, IdIP){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Detalle IP';
        vm.Icono = 'fa fa-eye';
        vm.View = true;
        vm.cancel = cancel;

    });