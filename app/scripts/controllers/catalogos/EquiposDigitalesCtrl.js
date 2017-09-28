'use strict';

angular
    .module('softvApp')
    .controller('EquiposDigitalesCtrl', function (CatalogosFactory, atencionFactory,$uibModal) {

        function initData() {


            atencionFactory.getPlazas().then(function (data) {
                console.log(data.GetMuestra_Compania_RelUsuarioListResult);
                vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
               // vm.plaza = vm.plazas[0];
               buscar(4);
            });

        }
        function OpenDetalleAparato(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalAparatoForm.html',
                controller: 'ModalAparatoFormDetalleCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }   

        function buscar(op) {
            var OP = op;
            var Clv_Sucursal = (vm.clave == undefined) ? 0 : vm.clave;
            var Nombre = (vm.descripcion === null || vm.descripcion === '') ? '' : vm.descripcion;
            var idcompania = (vm.Plaza == undefined) ? 0 : vm.Plaza.id_compania
            CatalogosFactory.GetSucursalList(Clv_Sucursal, Nombre, OP, idcompania)
                .then(function (data) {
                    console.log(data);
                     vm.SucursalList = data.GetSUCURSALESListResult;
                    if (vm.SucursalList.length == 0) {
                        vm.SinRegistros = true;
                        vm.ConRegistros = false;
                    } else {
                        vm.SinRegistros = false;
                        vm.ConRegistros = true;
                    } 
                });

        }

        var vm = this;
        initData();
        vm.buscar=buscar;
        vm.OpenDetalleAparato=OpenDetalleAparato;

    });