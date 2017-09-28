'use strict';

angular
    .module('softvApp')
    .controller('CiudadesCtrl', function(CatalogosFactory, $uibModal){

        function initData(){
            var ObjCiudad = {
                'Clv_Ciudad': 0,
                'Nombre': '',
                'Op': 2
            };
            CatalogosFactory.GetBuscaCiudades(ObjCiudad).then(function(data){
                vm.CiudadLista = data.GetBuscaCiudadesResult;
                if (vm.CiudadLista.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function OpenAddCiudad(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalCiudadForm.html',
                controller: 'ModalCiudadFormAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }

        function OpenUpdateCiudad(IdMunicipio){
            var IdMunicipio = IdMunicipio;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalCiudadForm.html',
                controller: 'ModalCiudadFormUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                    IdMunicipio: function () {
                        return IdMunicipio;
                    }
                }
            });
        }

        function OpenDeleteCiudad(IdMunicipio){
            var IdMunicipio = IdMunicipio;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalCiudadEliminar.html',
                controller: 'ModalCiudadEliminarCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    IdMunicipio: function () {
                        return IdMunicipio;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenAddCiudad = OpenAddCiudad;
        vm.OpenUpdateCiudad = OpenUpdateCiudad;
        vm.OpenDeleteCiudad = OpenDeleteCiudad;
        initData();
        
    });