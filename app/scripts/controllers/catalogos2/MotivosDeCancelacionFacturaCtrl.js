'use strict';

angular
  .module('softvApp')
  .controller('MotivosDeCancelacionFacturaCtrl', function (CatalogosFactory, atencionFactory,$uibModal) {

    function initData(){
      GetMotivoCancelacionFList(2);
    }

    function GetMotivoCancelacionFList(Opc){
      var ObjMotivo = {
        'Clv_Motivo': (Opc != 2 && Opc != 1 && vm.clave != undefined && vm.clave != null && vm.clave > 0)? vm.clave:0,
        'Descripcion': (Opc != 2 && Opc != 0 && vm.descripcion != undefined && vm.descripcion != null && vm.descripcion != '')? vm.descripcion:0,
        'Bandera': 0,
        'op': (Opc != 2 && ((Opc == 0 && vm.clave != undefined && vm.clave != null && vm.clave > 0) || (Opc == 1 && vm.descripcion != undefined && vm.descripcion != null && vm.descripcion != '')))? Opc:2
      };
      CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
        vm.MotivoCancelacionFList = data.GetBuscaMotivosFacturaCanceladaResult;
        vm.clave = null;
        vm.descripcion = null;
      });
    }

    function AddMotivoF() {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalMotivoCancelFactura.html',
          controller: 'ModalMotivoCancelFactAddCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'sm'
        });
        modalInstance.result.then(function () {
          GetMotivoCancelacionFList(2);
        });
      }

      function UpdateMotivoF(Clv_motivo) {
        var Clv_motivo = Clv_motivo;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalMotivoCancelFactura.html',
          controller: 'ModalMotivoCancelFactUpdateCtrl',
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
          GetMotivoCancelacionFList(2);
        });
      }

      function DetalleMotivoF(Clv_motivo) {
        var Clv_motivo = Clv_motivo;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalMotivoCancelFactura.html',
          controller: 'ModalMotivoCancelFactDetalleCtrl',
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
      
      function EliminaMotivoF(Clv_motivo) {
        var Clv_motivo = Clv_motivo;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalEliminarMotivoFact.html',
          controller: 'ModalMotivoCancelFactDeleteCtrl',
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
          GetMotivoCancelacionFList(2);
        });
      }
  
      var vm = this;
      vm.AddMotivoF = AddMotivoF;
      vm.UpdateMotivoF = UpdateMotivoF;
      vm.DetalleMotivoF = DetalleMotivoF;
      vm.EliminaMotivoF = EliminaMotivoF;
      vm.GetMotivoCancelacionFList = GetMotivoCancelacionFList;
      initData();
  });
