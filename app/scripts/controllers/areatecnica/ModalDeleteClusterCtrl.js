'use strict'
angular
  .module('softvApp')
  .controller('ModalDeleteClusterCtrl', function (CatalogosFactory,$rootScope, areaTecnicaFactory, $uibModalInstance, ngNotify, $state, opcion) {


    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function Delete() {
      if (opcion.op === 0) {
        areaTecnicaFactory.GetBorHub(opcion.id).then(function (result) {
          if (result.GetBorHubResult === 1) {
           ngNotify.set('No se puede Eliminar. Hay una relación de un Nap con éste HUB.', 'error');
           
          } else {
            $uibModalInstance.dismiss('cancel');
            ngNotify.set('El HUB se ha eliminado correctamente', 'success');
              $rootScope.$broadcast('reloadlista');
          }

        });
      }
    }

    var vm = this;
    vm.nombre = opcion.Descripcion;
   
    vm.Icono = 'fa fa-less';
    vm.cancel = cancel;
    vm.Delete = Delete;
    vm.Titulo = 'Eliminar Registro';
  });
