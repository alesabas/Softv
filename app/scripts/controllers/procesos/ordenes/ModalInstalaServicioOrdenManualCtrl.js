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
        'Clv_TipSer': items.Clv_TipSer,
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
        var objinstalaservicios = {
          'Clave': items.Clave,
          'Clv_Orden': items.ClvOrden,
          'Trabajo': items.Trabajo,
          'Clv_UnicaNet': vm.servicio.clv_unicanet,
          'idMedio': 0
        };
        console.log(objinstalaservicios);
        ordenesFactory.Addinstalaservicios(objinstalaservicios).then(function(data){
          console.log(data);
          $uibModalInstance.close(vm.medio);
        });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
