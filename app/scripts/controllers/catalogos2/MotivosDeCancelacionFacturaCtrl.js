'use strict';

angular
  .module('softvApp')
  .controller('MotivosDeCancelacionFacturaCtrl', function (CatalogosFactory, atencionFactory,$uibModal) {

   
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
      

      function UpdateMotivoF() {
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
          size: 'md'
        });
      }
      
      function EliminaMotivoF() {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/catalogos/ModalEliminarMotivoFact.html',
          controller: 'ModalMotivoDeleteCtrl',
          controllerAs: 'ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'sm'
        });
      }
      





    var vm = this;
    vm.AddMotivoF = AddMotivoF;
    vm.UpdateMotivoF = UpdateMotivoF;
    vm.EliminaMotivoF = EliminaMotivoF;

  });
