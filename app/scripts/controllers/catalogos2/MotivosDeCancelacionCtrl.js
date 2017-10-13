'use strict';

angular
  .module('softvApp')
  .controller('MotivosDeCancelacionCtrl', function (CatalogosFactory, atencionFactory,$uibModal) {
  
    function initData(){
      var OjbMotivo = {
          'Clv_MOTCAN': 0,
          'MOTCAN': 0,
          'op': 3
        };
        CatalogosFactory.GetBuscaMotivoCancelacion(OjbMotivo).then(function(data){
          vm.MotivoCancelacionList = data.GetBuscaMotivoCancelacionResult;
        });
    }

    function GetListMotivo(Opc){
      var OjbMotivo = {
        'Clv_MOTCAN': (Opc == 0)? (vm.clave != undefined)? vm.clave:0 :0,
        'MOTCAN': (Opc == 1)? (vm.descripcion != undefined)? vm.descripcion:0 :0,
        'op': Opc
      };
      CatalogosFactory.GetBuscaMotivoCancelacion(OjbMotivo).then(function(data){
        vm.MotivoCancelacionList = data.GetBuscaMotivoCancelacionResult;
      });
    }
    
    function AddMotivo() {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalMotivo.html',
          controller: 'ModalMotivoAddCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'md'
        });
      }

      function DetalleMotivo(Clv_motivo) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalMotivo.html',
          controller: 'ModalMotivoDetalleCtrl',
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

      function UpdateMotivo(Clv_motivo) {
        var Clv_motivo = Clv_motivo;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalMotivo.html',
          controller: 'ModalMotivoUpdateCtrl',
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
      
      function EliminaMotivo(Clv_motivo) {
        var Clv_motivo = Clv_motivo;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalEliminarMotivo.html',
          controller: 'ModalMotivoDeleteCtrl',
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
      vm.GetListMotivo = GetListMotivo;
      vm.AddMotivo = AddMotivo;
      vm.DetalleMotivo = DetalleMotivo;
      vm.UpdateMotivo = UpdateMotivo;
      vm.EliminaMotivo = EliminaMotivo;
      initData();

  });
