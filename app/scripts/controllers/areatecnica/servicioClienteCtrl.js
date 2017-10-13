'use strict';

angular
  .module('softvApp')
  .controller('servicioClienteCtrl', function (atencionFactory, trabajosFactory) {

    atencionFactory.getServicios().then(function (data) {
      console.log(data);
      vm.servicios = data.GetMuestraTipSerPrincipalListResult;
      vm.servicio = vm.servicios[0];
      obtentrabajos();
      
    });

    function obtentrabajos() {
      trabajosFactory.GetSoftv_GetTrabajoByClv_TipSer(vm.servicio.Clv_TipSerPrincipal)
        .then(function (result) {
          vm.trabajos = result.GetSoftv_GetTrabajoByClv_TipSerResult;
          console.log(result);
        });
    }

   





    var vm = this;
    vm.obtentrabajos = obtentrabajos;

  });
