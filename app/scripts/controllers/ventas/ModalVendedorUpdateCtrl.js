'use strict';

angular
    .module('softvApp')
    .controller('ModalVendedorUpdateCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Vendedor - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = false;
        vm.cancel = cancel;
        
    });