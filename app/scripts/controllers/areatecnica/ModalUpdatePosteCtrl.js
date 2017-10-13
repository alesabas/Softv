'use strict';
angular
  .module('softvApp')
  .controller('ModalUpdatePosteCtrl', function (areaTecnicaFactory, $uibModalInstance, ngNotify, $state, CLAVE, DESCRIPCION, OP) {

    function initData() {
      vm.ID = CLAVE;
      vm.descripcion = DESCRIPCION;
      vm.Titulo = (OP === 1) ? 'Editar Poste - ' + CLAVE : 'Editar OLT - ' + CLAVE;
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function AddPoste() {
      var Parametros = {
        'clave': CLAVE,
        'descripcion': vm.descripcion
      };
      if (OP === 1) {
        areaTecnicaFactory.GetNuePoste(Parametros).then(function (data) {
          ngNotify.set('Poste actualizado  correctamente.', 'success');
          $state.reload('home.areatecnica.postes');
          cancel();
        });
      } else {
        areaTecnicaFactory.GetInsertaNueDescOlt(vm.ID, vm.descripcion).then(function (result) {
          ngNotify.set('OLT agregada editada correctamente', 'success');
          cancel();
          $state.reload('home.areatecnica.olt');

        });
      }

    }
    var vm = this;
    initData();

    vm.Icono = 'fa fa-pencil-square-o';
    vm.AddPoste = AddPoste;
    vm.cancel = cancel;
  });
