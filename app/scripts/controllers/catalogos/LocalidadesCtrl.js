'use strict';

angular
    .module('softvApp')
    .controller('LocalidadesCtrl', function(CatalogosFactory, $uibModal){

        function initData(){
            GetLocalidadList();
        }

        function GetLocalidadList(){
            CatalogosFactory.GetLocalidades_NewList().then(function(data){
                vm.LocalidadList = data.GetLocalidades_NewListResult;
                if (vm.LocalidadList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }
        
        function OpenAddLocalidad(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalLocalidadForm.html',
                controller: 'ModalLocalidadFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
            modalInstance.result.then(function () {
                GetLocalidadList();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function OpenUpdateLocalidad(IdLocalidad){
            var IdLocalidad = IdLocalidad;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalLocalidadForm.html',
                controller: 'ModalLocalidadFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdLocalidad: function () {
                        return IdLocalidad;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetLocalidadList();
            });
        }

        function OpenViewLocalidad(IdLocalidad){
            var IdLocalidad = IdLocalidad;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalLocalidadForm.html',
                controller: 'ModalLocalidadFormViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdLocalidad: function () {
                        return IdLocalidad;
                    }
                }
            });
        }

        function OpenDeleteLocalidad(LocalidadObj){
            var LocalidadObj = LocalidadObj;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalLocalidadEliminar.html',
                controller: 'ModalLocalidadEliminarCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    LocalidadObj: function () {
                        return LocalidadObj;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetLocalidadList();
            });
        }

        var vm = this;
        vm.OpenAddLocalidad = OpenAddLocalidad;
        vm.OpenUpdateLocalidad = OpenUpdateLocalidad;
        vm.OpenDeleteLocalidad = OpenDeleteLocalidad;
        vm.OpenViewLocalidad = OpenViewLocalidad;
        initData();
        
    });