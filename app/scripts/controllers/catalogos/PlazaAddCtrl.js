'use strict';

angular
  .module('softvApp')
  .controller('PlazaAddCtrl', function (CatalogosFactory, ngNotify, $rootScope, $state, distribuidorFactory, plazaFactory) {

    function initData() {
      vm.Titulo = 'Nueva Plaza';
      distribuidorFactory.Getplaza(0, '')
        .then(function (data) {
          vm.distribuidores = data.GetPlaza_DistribuidoresNewResult;
          plazaFactory.GetMuestraEstadosFrmCompania(0)
            .then(function (data) {
              console.log(data);
              vm.estados = data.GetMuestraEstadosFrmCompaniaResult;
              vm.estadoselect = vm.estados[1];
              ObtenCiudades();
            });

        });
    }

    function muestraRelacion() {
      plazaFactory.GetAgregaEliminaRelCompaniaCiudad2(3, $stateParams.id, 0, 0).then(function (res) {
        vm.relaciones = res.GetAgregaEliminaRelCompaniaCiudad2Result;
        console.log(res);
      });
    }

    function ObtenCiudades() {
      plazaFactory.GetMuestra_Ciudad_RelCompania($stateParams.id, vm.estadoselect.Clv_Estado)
        .then(function (data) {

          vm.ciudades = data.GetMuestra_Ciudad_RelCompaniaResult;

        });
    }

    function agregaRelacion() {
      plazaFactory.GetAgregaEliminaRelCompaniaCiudad2(1, $stateParams.id, vm.estado2select.Clv_Estado, vm.CiudadPla.Clv_Ciudad)
        .then(function (res) {
          muestraRelacion();
        });
    }

    function EliminaRelacion(obj) {
      plazaFactory.GetAgregaEliminaRelCompaniaCiudad2(2, $stateParams.id, obj.Clv_Ciudad, obj.Clv_Estado)
        .then(function (res) {
          console.log(res);
          muestraRelacion();
        });
    }

    function SavePlaza() {

      vm.detplaza.Clv_plaza = vm.detplaza.distribuidor.Clv_Plaza;
      console.log(vm.detplaza);
      plazaFactory.AddPlaza(vm.detplaza)
        .then(function (result) {
          vm.Clv_plaza=result.AddPlazaResult;
          console.log(result);

          vm.block = true;
          ngNotify.set('La plaza se ha guardado correctamente ,ahora puede asignar relaciones con estados y ciudades', 'success');
        });
    }



    var vm = this;
    vm.detplaza = {};
    initData();
    vm.block = false;
    vm.SavePlaza = SavePlaza;
    vm.Clv_plaza=0;
  });
