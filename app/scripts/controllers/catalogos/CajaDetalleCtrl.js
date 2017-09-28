'use strict';

angular
  .module('softvApp')
  .controller('CajaDetalleCtrl', function (CatalogosFactory, atencionFactory, ngNotify, $state, $stateParams) {

    function init() {
      CatalogosFactory.GetDeepCatalogoCajas($stateParams.id)
        .then(function (data) {          
          var res = data.GetDeepCatalogoCajasResult;
          vm.descripcion = res.Descripcion;
          vm.ticket = res.ImprimeTickets;
          vm.ip = res.IpMaquina;
          vm.idcompania = res.idcompania;
          vm.impresoratermica = (res.impresoratermica === 1) ? true : false;
          vm.Clv_sucursal=res.Clv_sucursal;
          atencionFactory.getPlazas().then(function (data) {            
            vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
            vm.plazas.forEach(function (item) {
              if (item.id_compania === vm.idcompania) {
                vm.plaza = item;
              }
            });
            CatalogosFactory.GetMUESTRASUCURSALES2(vm.idcompania)
              .then(function (result) {                
                vm.sucursales = result.GetMUESTRASUCURSALES2Result;
                vm.sucursales.forEach(function(item){
                  if(item.Clv_Sucursal===vm.Clv_sucursal){
                     vm.sucursal=item;
                  }
                });
               
              });
          });
        });
    }   

    var vm = this;
    vm.IdCaja = $stateParams.id;
    vm.Titulo = 'Consultar Caja #' + $stateParams.id;
    vm.block = true;
    init();
  });
