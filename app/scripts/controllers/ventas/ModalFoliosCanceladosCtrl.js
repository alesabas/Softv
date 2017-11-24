'use strict';

angular
    .module('softvApp')
    .controller('ModalFoliosCanceladosCtrl', function(VentasFactory, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.cancel = cancel;
        
    });