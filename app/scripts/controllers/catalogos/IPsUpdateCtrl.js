'use strict';

angular
    .module('softvApp')
    .controller('IPsUpdateCtrl', function(CatalogosFactory, $uibModalInstance, $uibModal, ngNotify, $state, IdIP){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar IP';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.cancel = cancel;
    });