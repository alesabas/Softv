'use strict';

angular
    .module('softvApp')
    .controller('MotivosReImpresionFacturaCtrl', function (CatalogosFactory, atencionFactory, $uibModal) {

        function initData(){
            GetMotivoReimpresionFList(2);
        }

        function GetMotivoReimpresionFList(Opc){
            var ObjMotivo = {
                'Clv_Motivo': (Opc != 2 && Opc != 1 && vm.clave != undefined && vm.clave != null && vm.clave > 0)? vm.clave:0,
                'Descripcion': (Opc != 2 && Opc != 0 && vm.descripcion != undefined && vm.descripcion != null && vm.descripcion != '')? vm.descripcion:0,
                'Bandera': 1,
                'op': (Opc != 2 && ((Opc == 0 && vm.clave != undefined && vm.clave != null && vm.clave > 0) || (Opc == 1 && vm.descripcion != undefined && vm.descripcion != null && vm.descripcion != '')))? Opc:2
            };
            CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
                vm.MotivoReimpresionFList = data.GetBuscaMotivosFacturaCanceladaResult;
                vm.clave = null;
                vm.descripcion = null;
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
                size: 'sm'
            });
            modalInstance.result.then(function () {
                GetMotivoReimpresionFList(2);
            });
        }
        
        function UpdateMotivoReimpFact(Clv_motivo) {
            var Clv_motivo = Clv_motivo;
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
                size: 'sm',
                resolve: {
                    Clv_motivo: function () {
                        return Clv_motivo;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetMotivoReimpresionFList(2);
            });
        }

        function DetalleMotivoReimpFact(Clv_motivo) {
            var Clv_motivo = Clv_motivo;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/catalogos/ModalMotivoReimpFactura.html',
                controller: 'ModalMotivoReimpFactDetalleCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'sm',
                resolve: {
                    Clv_motivo: function () {
                        return Clv_motivo;
                    }
                }
            });
        }

        function EliminarMotivoReimpFact(Clv_motivo) {
            var Clv_motivo = Clv_motivo;
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
                size: 'sm',
                resolve: {
                    Clv_motivo: function () {
                        return Clv_motivo;
                    }
                }
            });
            modalInstance.result.then(function () {
                GetMotivoReimpresionFList(2);
            });
        }

        var vm = this;
        vm.GetMotivoReimpresionFList = GetMotivoReimpresionFList;
        vm.AddMotivoReimpFact = AddMotivoReimpFact;
        vm.UpdateMotivoReimpFact = UpdateMotivoReimpFact;
       
        vm.EliminarMotivoReimpFact = EliminarMotivoReimpFact;
        initData();

    });
