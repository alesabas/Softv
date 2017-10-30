'use strict';

angular
    .module('softvApp')
    .controller('TiposColoniasCtrl', function(CatalogosFactory, $uibModal){

        function initData(){
            CatalogosFactory.GetTipo_Colonias1_NewList().then(function(data){
                vm.TipoColoniaList = data.GetTipo_Colonias1_NewListResult;
                if (vm.TipoColoniaList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function OpenAddTipoColonia(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalTiposColoniasForm.html',
                controller: 'ModalTiposColoniasFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }

        function OpenUpdateTipoColonia(Clave){
            var Clave = Clave;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalTiposColoniasForm.html',
                controller: 'ModalTiposColoniasFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    Clave: function () {
                        return Clave;
                    }
                }
            });
        }

        function OpenViewTipoColonia(Clave){
            var Clave = Clave;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalTiposColoniasForm.html',
                controller: 'ModalTiposColoniasFormViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    Clave: function () {
                        return Clave;
                    }
                }
            });
        }

        function OpenDeleteTipoColonia(Clave){
            var Clave = Clave;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalTiposColoniasEliminar.html',
                controller: 'ModalTiposColoniasEliminarCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    Clave: function () {
                        return Clave;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenAddTipoColonia = OpenAddTipoColonia;
        vm.OpenUpdateTipoColonia = OpenUpdateTipoColonia;
        vm.OpenDeleteTipoColonia = OpenDeleteTipoColonia;
        vm.OpenViewTipoColonia = OpenViewTipoColonia;
        initData();
        
    });