'use strict';

angular
    .module('softvApp')
    .controller('ModalSerieDeleteCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.cancel = cancel;
        
    });