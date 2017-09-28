'use strict';

angular
  .module('softvApp')
  .controller('PlazaUpdateCtrl', function (plazaFactory, ngNotify, $rootScope, $state, $stateParams, distribuidorFactory) {

    function initData() {

      distribuidorFactory.Getplaza(0, '')
        .then(function (data) {
          vm.distribuidores = data.GetPlaza_DistribuidoresNewResult;          

          plazaFactory.GetObtendatosPlaza($stateParams.id)
            .then(function (data) {
              vm.detplaza = data.GetObtendatosPlazaResult;
              console.log(vm.detplaza);
              vm.distribuidores.forEach(function(item){
                if(item.Clv_Plaza===parseInt(vm.detplaza.Clv_plaza)){
                   vm.distribuidor=item;
                }
              });
              

             
              vm.Titulo = 'Editar plaza-' + vm.detplaza.Razonsocial;

              plazaFactory.GetMuestraEstadosFrmCompania($stateParams.id)
                .then(function (data) {
                  
                  vm.estados = data.GetMuestraEstadosFrmCompaniaResult;
                  vm.estadoselect = vm.estados[1];
                  muestraRelacion();
                  ObtenCiudades();
                });
            });
        });
    }

    function muestraRelacion() {
      plazaFactory.GetAgregaEliminaRelCompaniaCiudad2(3, $stateParams.id, 0, 0).then(function (res) {
        vm.relaciones = res.GetAgregaEliminaRelCompaniaCiudad2Result;       
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
          muestraRelacion();
        });
    }

    function SavePlaza() {
      
      vm.detplaza.Clv_plaza =  vm.distribuidor.Clv_Plaza;
      plazaFactory.EditPlaza(vm.detplaza)
        .then(function (result) {
          console.log(result);
          $state.go('home.catalogos.plazas');
          ngNotify.set('La plaza se ha editado correctamente ', 'success');
        });
    }

    var vm = this;    
    initData();
    vm.ObtenCiudades = ObtenCiudades;
    vm.agregaRelacion = agregaRelacion;
    vm.EliminaRelacion = EliminaRelacion;    
    vm.SavePlaza = SavePlaza;
    vm.Clv_plaza=$stateParams.id;
    vm.block = false;
  });
