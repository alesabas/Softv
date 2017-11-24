'use strict';

angular
    .module('softvApp')
    .controller('EvidenciaFoliosCanceladosCtrl', function(VentasFactory, ngNotify, $uibModal, $rootScope, $state, $localStorage){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.cancel = cancel;
        
    });