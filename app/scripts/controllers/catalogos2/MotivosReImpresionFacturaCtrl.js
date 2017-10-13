'use strict';

angular
    .module('softvApp')
    .controller('MotivosReImpresionFacturaCtrl', function (CatalogosFactory, atencionFactory, $uibModal) {

        function initData(){
            var ObjMotivo = {
                'Clv_Motivo': 0 ,
                'Descripcion': '',
                'Bandera': 1,    
                'op': 2
            };
            CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
                vm.MotivoReimpresionFList = data.GetBuscaMotivosFacturaCanceladaResult;
            });
        }

        function GetMotivoReimpresionFList(Opc){
            var ObjMotivo = {
                'Clv_Motivo': (Opc == 0)? (vm.clave != undefined)? vm.clave:0 :0,
                'Descripcion': (Opc == 1)? (vm.descripcion != undefined)? vm.descripcion:'' :'',
                'Bandera': 1,
                'op': Opc
            };
            CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
                vm.MotivoReimpresionFList = data.GetBuscaMotivosFacturaCanceladaResult;
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
                size: 'md',
                resolve: {
                Clv_motivo: function () {
                    return Clv_motivo;
                }
            }
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
                size: 'md',
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
        }

        var vm = this;
        vm.GetMotivoReimpresionFList = GetMotivoReimpresionFList;
        vm.AddMotivoReimpFact = AddMotivoReimpFact;
        vm.UpdateMotivoReimpFact = UpdateMotivoReimpFact;
        vm.DetalleMotivoReimpFact = DetalleMotivoReimpFact;
        vm.EliminarMotivoReimpFact = EliminarMotivoReimpFact;
        initData();

    });
