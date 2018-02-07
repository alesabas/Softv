'use strict';

angular
    .module('softvApp')
    .controller('ModaRecontratacionClienteCtrl', function($uibModalInstance, $uibModal, ngNotify, $state, $localStorage){

        function initData(){
            
        }

        function cancel() {
            $uibModalInstance.close();
        }

        var vm = this;
        vm.cancel = cancel;
        initData();
        
    });