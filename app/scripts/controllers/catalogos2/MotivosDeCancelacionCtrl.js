'use strict';

angular
  .module('softvApp')
  .controller('MotivosDeCancelacionCtrl', function (CatalogosFactory, atencionFactory,$uibModal) {

   
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
      function DetalleMotivo() {
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
          size: 'md'
        });
      }

      function UpdateMotivo() {
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
          size: 'md'
        });
      }
      
      function EliminaMotivo() {
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
          size: 'sm'
        });
      }
      





    var vm = this;
    vm.AddMotivo = AddMotivo;
    vm.DetalleMotivo = DetalleMotivo;
    vm.UpdateMotivo = UpdateMotivo;
    vm.EliminaMotivo = EliminaMotivo;

  });
