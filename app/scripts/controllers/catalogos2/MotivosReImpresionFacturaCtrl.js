'use strict';

angular
    .module('softvApp')
    .controller('MotivosReImpresionFacturaCtrl', function (CatalogosFactory, atencionFactory, $uibModal) {


        function buscar(op) {

            var Parametros = {
                'Clv_Sucursal': (op === 0) ? vm.clave : 0,
                'Nombre': (op === 1) ? vm.descripcion : '',
                'OP': op,
                'idcompania': (op === 2) ? vm.Plaza.id_compania : 0
            };
            CatalogosFactory.GetSUCURSALES(Parametros)
                .then(function (data) {
                    vm.suscursales = data.GetSUCURSALESResult;
                    console.log(data);
                });

        }

        function AddMotivoReimpFact() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalMotivoReimpFactura.html',
                controller: 'ModalMotivoReimpFactAddCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }
        
        function UpdateMotivoReimpFact() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalMotivoReimpFactura.html',
                controller: 'ModalMotivoReimpFactUpdateCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md'
            });
        }

        function EliminarMotivoReimpFact() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalEliminarMotivoReimp.html',
                controller: 'ModalMotivoReimpDeleteCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm'
            });
        }
        

        


        var vm = this;
        vm.buscar = buscar;
        vm.AddMotivoReimpFact = AddMotivoReimpFact;
        vm.UpdateMotivoReimpFact = UpdateMotivoReimpFact;
        vm.EliminarMotivoReimpFact = EliminarMotivoReimpFact;



    });
