(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalInstalaServicioOrdenManualCtrl', ModalInstalaServicioOrdenManualCtrl);

  ModalInstalaServicioOrdenManualCtrl.inject = ['$uibModal', '$uibModalInstance', 'ordenesFactory', 'items', '$rootScope', 'ngNotify'];

  function ModalInstalaServicioOrdenManualCtrl($uibModal, $uibModalInstance, ordenesFactory, items, $rootScope, ngNotify, $localStorage) {
    var vm = this;
    vm.cancel = cancel;
    vm.guardar = guardar;
    vm.medios=[];
    vm.cambio = false;
    console.log(items);
    
    this.$onInit = function () {

     var Parametros = {
        'ClvUnicaNet': items.Clv_UnicaNet
      };
      console.log('Parametros');
      console.log(Parametros);
      ordenesFactory.MuestraMedioPorServicoContratado(Parametros).then(function (resp) {
        console.log(resp);
        vm.medios = resp.GetMuestraMedioPorServicoContratadoListResult;
      });
    }

    function guardar() {
        $uibModalInstance.close(vm.medio);
    
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
