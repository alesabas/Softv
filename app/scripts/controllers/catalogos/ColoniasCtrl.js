'use strict';

angular
    .module('softvApp')
    .controller('ColoniasCtrl', function($uibModal, CatalogosFactory){

        function initData(){
            CatalogosFactory.GetColonias_NewList().then(function(data){
                vm.ColoniaList = data.GetColonias_NewListResult;
                if (vm.ColoniaList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function OpenAddColonia(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalColoniaForm.html',
                controller: 'ModalColoniaFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg',
                /*resolve: {
                    ObjRefCliente: function () {
                        return ObjRefCliente;
                    }
                }*/
            });
        }

        function OpenUpdateColonia(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalColoniaForm.html',
                controller: 'ModalColoniaFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg',
                /*resolve: {
                    ObjRefCliente: function () {
                        return ObjRefCliente;
                    }
                }*/
            });
        }

        function OpenDeleteColonia(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalColoniaEliminar.html',
                controller: 'ModalColoniaEliminarCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                /*resolve: {
                    ObjRefCliente: function () {
                        return ObjRefCliente;
                    }
                }*/
            });
        }

        var vm = this;
        vm.OpenAddColonia = OpenAddColonia;
        vm.OpenUpdateColonia = OpenUpdateColonia;
        vm.OpenDeleteColonia = OpenDeleteColonia;
        initData();
    });