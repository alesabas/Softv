'use strict';

angular
    .module('softvApp')
    .controller('ModalRangoUpdateCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Editar Rango - ';
        vm.Icono = 'fa fa-pencil-sqaure-o';
        vm.View = false;
        vm.cancel = cancel;
        
    });