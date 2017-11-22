'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoAddCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Rango';
        vm.Icono = 'fa fa-plus';
        vm.View = false;
        vm.cancel = cancel;
        
    });