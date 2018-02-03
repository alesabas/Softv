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
              vm.estados = data.GetMuestraEstadosFrmCompaniaResult;
              vm.estadoselect = vm.estados[1];
              ObtenCiudades();
            });
        });
    }

    function muestraRelacion() {
      plazaFactory.GetAgregaEliminaRelCompaniaCiudad2(3, vm.Clv_plaza, 0, 0).then(function (res) {
        vm.relaciones = res.GetAgregaEliminaRelCompaniaCiudad2Result;
      });
    }

    function ObtenCiudades() {
      plazaFactory.GetMuestra_Ciudad_RelCompania(vm.Clv_plaza, vm.estadoselect.Clv_Estado)
        .then(function (data) {
          vm.ciudades = data.GetMuestra_Ciudad_RelCompaniaResult;
        });
    }

    function agregaRelacion() {
      plazaFactory.GetAgregaEliminaRelCompaniaCiudad2(1, vm.Clv_plaza, vm.CiudadPla.Clv_Ciudad, vm.estado2select.Clv_Estado)
        .then(function (res) {
          muestraRelacion();
        });
    }

    function EliminaRelacion(obj) {
      plazaFactory.GetAgregaEliminaRelCompaniaCiudad2(2, vm.Clv_plaza, obj.Clv_Ciudad, obj.Clv_Estado)
        .then(function (res) {
          muestraRelacion();
        });
    }

    function SavePlaza() {
      vm.detplaza.Clv_plaza = vm.distribuidor.Clv_Plaza;
      plazaFactory.AddPlaza(vm.detplaza)
        .then(function (result) {
          vm.Clv_plaza=result.AddPlazaResult;
          vm.block = false;
          ngNotify.set('La plaza se ha guardado correctamente, ahora puede asignar relaciones con estados y ciudades', 'success');
        });
    }

    var vm = this;
    vm.detplaza = {};
    vm.block = false;
    vm.SavePlaza = SavePlaza;
    vm.ObtenCiudades = ObtenCiudades;
    vm.agregaRelacion = agregaRelacion;
    vm.EliminaRelacion = EliminaRelacion;
    vm.Clv_plaza=0;
    initData();

  });
