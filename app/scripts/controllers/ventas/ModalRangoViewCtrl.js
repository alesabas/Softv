'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoViewCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Consultar Rango - ';
        vm.Icono = 'fa fa-eye';
        vm.View = true;
        vm.cancel = cancel;
        
    });