'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieUpdateCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Serie - ';
        vm.Icono = 'fa fa-pencil-square-o';
        vm.View = false;
        vm.cancel = cancel;
        
    });