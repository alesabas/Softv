'use strict';

angular
    .module('softvApp')
    .controller('VelocidadInternetCtrl', function(CatalogosFactory, $uibModal){
        
        function initData(){
            
        }

        function OpenAddVelocidadInternet(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalVelocidadInternetForm.html',
                controller: 'ModalVelocidadInternetFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }

        function OpenUpdateVelocidadInternet(IdVelocidadInternet){
            var IdVelocidadInternet = IdVelocidadInternet;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalVelocidadInternetForm.html',
                controller: 'ModalVelocidadInternetFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdVelocidadInternet: function () {
                        return IdVelocidadInternet;
                    }
                }
            });
        }

        function OpenViewVelocidadInternet(IdVelocidadInternet){
            var IdVelocidadInternet = IdVelocidadInternet;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalVelocidadInternetForm.html',
                controller: 'ModalVelocidadInternetFormViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdVelocidadInternet: function () {
                        return IdVelocidadInternet;
                    }
                }
            });
        }

        function OpenDeleteVelocidadInternet(ObjVelocidadInternet){
            var ObjVelocidadInternet = ObjVelocidadInternet;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalVelocidadInternetDelete.html',
                controller: 'ModalVelocidadInternetDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    ObjVelocidadInternet: function () {
                        return ObjVelocidadInternet;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenAddVelocidadInternet = OpenAddVelocidadInternet;
        vm.OpenUpdateVelocidadInternet = OpenUpdateVelocidadInternet;
        vm.OpenViewVelocidadInternet = OpenViewVelocidadInternet;
        vm.OpenDeleteVelocidadInternet = OpenDeleteVelocidadInternet;
        initData();

    });