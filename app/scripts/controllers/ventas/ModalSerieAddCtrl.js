'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieAddCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Vendedor';
        vm.Icono = 'fa fa-plus';
        vm.View = false;
        vm.DisVendedor = false;
        vm.NumeroFolio = 0;
        vm.UltimoFolio = 0;
        vm.Tipo = 'V';
        vm.cancel = cancel;
        
    });