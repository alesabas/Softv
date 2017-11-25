'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieViewCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Consultar Serie - ';
        vm.Icono = 'fa fa-eye';
        vm.View = true;
        vm.DisVendedor = true;
        vm.cancel = cancel;
        
    });