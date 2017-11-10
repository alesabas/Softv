'use strict';

angular
    .module('softvApp')
    .controller('EstadosCtrl', function(CatalogosFactory, $uibModal){

        function initData(){
            CatalogosFactory.GetEstados_NewList().then(function(data){
                vm.EstadoList = data.GetEstados_NewListResult;
                if (vm.EstadoList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function OpenAddEstado(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalEstadoForm.html',
                controller: 'ModalEstadoFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }

        function OpenViewEstado(Clv_Estado){
            var Clv_Estado = Clv_Estado;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalEstadoForm.html',
                controller: 'ModalEstadoFormViewCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    Clv_Estado: function () {
                        return Clv_Estado;
                    }
                }
            });
        }

        function OpenUpdateEstado(Clv_Estado){
            var Clv_Estado = Clv_Estado;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalEstadoForm.html',
                controller: 'ModalEstadoFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    Clv_Estado: function () {
                        return Clv_Estado;
                    }
                }
            });
        }

        function OpenDeleteEstado(Clv_Estado){
            var Clv_Estado = Clv_Estado;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalEstadoEliminar.html',
                controller: 'ModalEstadoEliminarCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    Clv_Estado: function () {
                        return Clv_Estado;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenAddEstado = OpenAddEstado;
        vm.OpenViewEstado = OpenViewEstado;
        vm.OpenUpdateEstado = OpenUpdateEstado;
        vm.OpenDeleteEstado = OpenDeleteEstado;
        
        initData();

    });