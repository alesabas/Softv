
angular
.module('softvApp')
.controller('ModalMotivoReimpFactUpdateCtrl', function (CatalogosFactory, $uibModalInstance, ngNotify, $state) {
 

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }

  var vm = this;
  vm.Titulo = ' Editar Motivo de Reimpresion de Factura';
  vm.Icono = 'fa fa-pencil-square-o';
  vm.cancel = cancel;
  vm.blockForm = false;
  vm.blocksave = false;
  vm.blockdelete = true;
});