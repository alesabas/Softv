'use strict';

angular
    .module('softvApp')
    .controller('IPsCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function OpenUpdateIP(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalIPsForm.html',
                controller: 'IPsUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdIP: function () {
                        return IdIP;
                    }
                }
            });
        }

        function OpenViewIP(IdIP){
            var IdIP = IdIP;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalIPsForm.html',
                controller: 'IPsViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdIP: function () {
                        return IdIP;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenUpdateIP = OpenUpdateIP;
        vm.OpenViewIP = OpenViewIP;
    });