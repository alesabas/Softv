'use strict';
angular
  .module('softvApp')
  .controller('CajaEditarCtrl', function (CatalogosFactory, atencionFactory, ngNotify, $state, $stateParams) {

    function init() {
      CatalogosFactory.GetDeepCatalogoCajas($stateParams.id)
        .then(function (data) {          
          var res = data.GetDeepCatalogoCajasResult;
          vm.descripcion = res.Descripcion;
          vm.ticket = res.ImprimeTickets;
          vm.ip = res.IpMaquina;
          vm.idcompania = res.idcompania;
          vm.Clv_sucursal = res.Clv_sucursal;
          vm.impresoratermica = (res.impresoratermica === 1) ? true : false;
          atencionFactory.getPlazas().then(function (data) {            
            vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
            vm.plazas.forEach(function (item) {
              if (item.id_compania === vm.idcompania) {
                vm.plaza = item;
                GetSucursales( vm.Clv_sucursal);
              }
            });
          });
        });
    }

    function GetSucursales( sucursal) {
      CatalogosFactory.GetMUESTRASUCURSALES2(vm.plaza.id_compania)
        .then(function (result) {
          vm.sucursales = result.GetMUESTRASUCURSALES2Result;
          if (sucursal > 0) {
            vm.sucursales.forEach(function (item) {
              if (item.Clv_Sucursal === sucursal) {
                vm.sucursal = item;
              }
            });
          }         
        });
    }

    function SaveCaja() {

      var Parametros = {
        'Clave': vm.IdCaja,
        'Clv_sucursal': vm.sucursal.Clv_Sucursal,
        'IpMaquina': vm.ip,
        'Descripcion': vm.descripcion,
        'ImprimeTickets': vm.ticket,
        'facnormal': (vm.factura === 'n') ? true : false,
        'facticket': (vm.factura === 't') ? true : false,
        'impresoratermica': (vm.termica===true)? 1:0
      };

      CatalogosFactory.UpdateCatalogoCajas(Parametros)
        .then(function (result) {         
          ngNotify.set('La caja se ha editado guardado correctamente', 'success');
          $state.go('home.catalogos.cajas');
        });
    }


    var vm = this;
    vm.IdCaja = $stateParams.id;
    vm.Titulo = 'Editar Caja #' + $stateParams.id;
    vm.block = false;
    init();
    vm.GetSucursales=GetSucursales;
    vm.SaveCaja=SaveCaja;
  });
