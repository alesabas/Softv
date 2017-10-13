'use strict';

angular
    .module('softvApp')
    .controller('CallesCtrl', function(CatalogosFactory, $uibModal){

        function initData(){
            CatalogosFactory.GetCalles_NewList().then(function(data){
                vm.CalleList = data.GetCalles_NewListResult;
                if (vm.CalleList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function OpenAddCalle(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalCalleForm.html',
                controller: 'ModalCalleFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg'
            });
        }

        function OpenUpdateCalle(IdCalle){
            var IdCalle = IdCalle;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalCalleForm.html',
                controller: 'ModalCalleFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'lg',
                resolve: {
                    IdCalle: function () {
                        return IdCalle;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenAddCalle = OpenAddCalle;
        vm.OpenUpdateCalle = OpenUpdateCalle;
        initData();
        
    });