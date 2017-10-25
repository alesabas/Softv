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
    vm.servicios=[];
    vm.cambio = false;
    console.log(items);
    
    this.$onInit = function () {

     var Parametros = {
        'contrato': items.Contrato,
        'Op': 0,
        'Clv_TipSer': 0,
        'Status': 'C'
      };
      console.log('Parametros');
      console.log(Parametros);
      ordenesFactory.MuestraServiciosDelCli_porOpcion(Parametros).then(function (resp) {
        console.log(resp);
        vm.servicios = resp.GetMuestraServiciosDelCli_porOpcionListResult;
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
