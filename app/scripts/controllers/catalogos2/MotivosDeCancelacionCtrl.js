'use strict';

angular
  .module('softvApp')
  .controller('MotivosDeCancelacionCtrl', function (CatalogosFactory, atencionFactory,$uibModal) {
  
    function initData(){
      GetListMotivo(3);
    }

    function GetListMotivo(Opc){
      var OjbMotivo = {
        'Clv_MOTCAN': (Opc != 3 && Opc != 1 && vm.clave != undefined && vm.clave != null && vm.clave > 0)? vm.clave:0,
        'MOTCAN': (Opc != 3 && Opc != 0 && vm.descripcion != undefined && vm.descripcion != null && vm.descripcion != '')? vm.descripcion:0,
        'op': (Opc != 3 && ((Opc == 0 && vm.clave != undefined && vm.clave != null && vm.clave > 0) || (Opc == 1 && vm.descripcion != undefined && vm.descripcion != null && vm.descripcion != '')))? Opc:3
      };
      CatalogosFactory.GetBuscaMotivoCancelacion(OjbMotivo).then(function(data){
        vm.MotivoCancelacionList = data.GetBuscaMotivoCancelacionResult;
        vm.clave = null
        ;
        vm.descripcion = null;
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
          size: 'sm'
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
          size: 'sm',
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
          size: 'sm',
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
