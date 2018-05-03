'use strict';
angular
  .module('softvApp')
  .controller('ModalUpdatePosteCtrl', function (areaTecnicaFactory, $uibModalInstance, ngNotify, $state, CLAVE, DESCRIPCION, OP) {

    function initData() {
      vm.ID = CLAVE;
      vm.descripcion = DESCRIPCION;
      vm.Titulo = (OP === 1) ? 'Editar Poste - ' + CLAVE : 'Editar OLT - ' + CLAVE;
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
        areaTecnicaFactory.GetValidaNueDescOLT(vm.ID, vm.descripcion).then(function(data){
          if(data.GetValidaNueDescOLTResult == 0){
            areaTecnicaFactory.GetInsertaNueDescOlt(vm.ID, vm.descripcion).then(function (result) {
              ngNotify.set('OLT agregada editada correctamente', 'success');
              cancel();
            });
          }else{
            ngNotify.set('Error, La Descripción que ingresó ya existe', 'warn');
          }
        });
      }
    }

    function cancel() {
      $uibModalInstance.close();
    }

    var vm = this;
    initData();

    vm.Icono = 'fa fa-pencil-square-o';
    vm.AddPoste = AddPoste;
    vm.cancel = cancel;

  });
