'use strict'
angular
    .module('softvApp')
    .controller('ServiciosCtrl', function(CatalogosFactory, ngNotify, $uibModal, $state, $stateParams, $rootScope, $localStorage){

        function initData(){
            CatalogosFactory.GetMuestraTipSerPrincipal_SERList().then(function(data){
                vm.TipoServicioList = data.GetMuestraTipSerPrincipal_SERListResult;
                vm.TipoServicio = vm.TipoServicioList[0];
                GetServiciosList();
            });
            
        }

        function GetServiciosList(){
            var ObjBusqueda = {
                'Clv_TipSer': vm.TipoServicio.Clv_TipSerPrincipal, 
                'Clv_Servicio': 0 , 
                'Descripcion': '', 
                'Clv_Txt': '', 
                'Op': 2, 
                'idcompania': 1
            };
            CatalogosFactory.GetServicios_NewList(ObjBusqueda).then(function(data){
                vm.ServicioList = data.GetServicios_NewListResult;
                 if (vm.ServicioList.length == 0) {
					vm.SinRegistros = true;
					vm.ConRegistros = false;
				} else {
					vm.SinRegistros = false;
					vm.ConRegistros = true;
				}
            });
        }

        function OpenDeleteServicio(ObjServicio){
            var ObjServicio = ObjServicio;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalServicioDelete.html',
                controller: 'ModalServicioDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    ObjServicio: function () {
                        return ObjServicio;
                    }
                }
            });
        }

        var vm = this;
        vm.OpenDeleteServicio = OpenDeleteServicio;
        vm.GetServiciosList = GetServiciosList;
        vm.SinRegistros = true;
	    vm.ConRegistros = false;
        initData();
    });