'use strict';

angular
    .module('softvApp')
    .controller('RecontratacionCtrl', function(ngNotify, $uibModal, $rootScope, $state, $localStorage){

        function initData(){
        }

        function OpenSearchCliente(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body', 
                templateUrl: 'views/procesos/ModaRecontratacionCliente.html',
                controller: 'ModaRecontratacionClienteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg'/*
                resolve: {
                    Clv_UnicaNet: function () {
                        return Clv_UnicaNet;
                    }
                }*/
            });
            modalInstance.result.then(function () {
                
            });
        }

        var vm = this;
        vm.OpenSearchCliente = OpenSearchCliente;
        initData();

    });