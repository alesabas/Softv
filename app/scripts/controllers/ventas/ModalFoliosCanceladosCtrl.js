'use strict';

angular
    .module('softvApp')
    .controller('ModalFoliosCanceladosCtrl', function(SeriesFactory, $localStorage, $uibModalInstance, $uibModal, ngNotify, $state, $rootScope){
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.View = false;
        vm.cancel = cancel;
        console.log($localStorage);

    });