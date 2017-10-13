'use strict';

angular
  .module('softvApp')
  .controller('MotivosDeCancelacionFacturaCtrl', function (CatalogosFactory, atencionFactory,$uibModal) {

    function initData(){
      var ObjMotivo = {
        'Clv_Motivo': 0 ,
        'Descripcion': '',
        'Bandera': 0,    
        'op': 2
      };
      CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
        vm.MotivoCancelacionFList = data.GetBuscaMotivosFacturaCanceladaResult;
      });
    }

    function GetMotivoCancelacionFList(Opc){
      var ObjMotivo = {
        'Clv_Motivo': (Opc == 0)? (vm.clave != undefined)? vm.clave:0 :0,
        'Descripcion': (Opc == 1)? (vm.descripcion != undefined)? vm.descripcion:'' :'',
        'Bandera': 0,
        'op': Opc
      };
      CatalogosFactory.GetBuscaMotivosFacturaCancelada(ObjMotivo).then(function(data){
        vm.MotivoCancelacionFList = data.GetBuscaMotivosFacturaCanceladaResult;
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
          size: 'md'
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
          size: 'md',
          resolve: {
              Clv_motivo: function () {
                  return Clv_motivo;
              }
          }
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
          size: 'md',
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
      }
  
      var vm = this;
      vm.AddMotivoF = AddMotivoF;
      vm.UpdateMotivoF = UpdateMotivoF;
      vm.DetalleMotivoF = DetalleMotivoF;
      vm.EliminaMotivoF = EliminaMotivoF;
      vm.GetMotivoCancelacionFList = GetMotivoCancelacionFList;
      initData();
  });
