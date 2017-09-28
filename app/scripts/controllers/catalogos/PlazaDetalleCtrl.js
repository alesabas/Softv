'use strict';

angular
  .module('softvApp')
  .controller('PlazaDetalleCtrl', function (CatalogosFactory, $stateParams,ngNotify, $rootScope, $state, plazaFactory) {

    function initData() {
      plazaFactory.GetObtendatosPlaza($stateParams.id)
        .then(function (data) {
          vm.detplaza = data.GetObtendatosPlazaResult;
          console.log(data);
          vm.Titulo = 'Consulta plaza-' + vm.detplaza.Razonsocial;

          plazaFactory.GetMuestraEstadosFrmCompania($stateParams.id)
            .then(function (data) {
              console.log(data);
              vm.estados = data.GetMuestraEstadosFrmCompaniaResult;
              vm.estadoselect = vm.estados[1];
              muestraRelacion();             
            });
        });
    }

    function muestraRelacion() {
      plazaFactory.GetAgregaEliminaRelCompaniaCiudad2(3, $stateParams.id, 0, 0).then(function (res) {
        vm.relaciones = res.GetAgregaEliminaRelCompaniaCiudad2Result;
        console.log(res);
      });
    }

  
    var vm = this;
    vm.block=true;
    initData();

  });
