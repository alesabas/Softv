'use strict';

angular
  .module('softvApp')
  .controller('PostesCtrl', function (CatalogosFactory, atencionFactory,$uibModal) {

   
    function AddPoste() {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/area tecnica/ModalPoste.html',
          controller: 'ModalAddPosteCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'md'
        });
      }
      function DetallePoste() {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/area tecnica/ModalPoste.html',
          controller: 'ModalDetallePosteCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'md'
        });
      }
      

      function UpdatePoste() {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/area tecnica/ModalPoste.html',
          controller: 'ModalUpdatePosteCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'md'
        });
      }
      
      function EliminaPoste() {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/area tecnica/ModalEliminarPoste.html',
          controller: 'ModalDeletePosteCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'sm'
        });
      }

      function cancel() {
        $uibModalInstance.dismiss('cancel');
    }





    var vm = this;
    vm.AddPoste = AddPoste;
    vm.UpdatePoste = UpdatePoste;
    vm.EliminaPoste = EliminaPoste;
    vm.DetallePoste = DetallePoste;
    vm.cancel = cancel;

  });
