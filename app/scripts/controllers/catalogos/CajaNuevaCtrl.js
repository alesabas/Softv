'use strict';
angular
  .module('softvApp')
  .controller('CajaNuevaCtrl', function (CatalogosFactory, atencionFactory, ngNotify, $state) {

    function init() {

      atencionFactory.getPlazas().then(function (data) {
        console.log(data);
        vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
        vm.plaza = vm.plazas[0];
        GetSucursales(vm.plaza.id_compania);
      });
    }

    function GetSucursales(sucursal) {
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
          console.log(result.GetMUESTRASUCURSALES2Result);
        });
    }

    function SaveCaja() {

      var Parametros = {
        'Clave': 0,
        'Clv_sucursal': vm.sucursal.Clv_Sucursal,
        'IpMaquina': vm.ip,
        'Descripcion': vm.descripcion,
        'ImprimeTickets': vm.ticket,
        'facnormal': (vm.factura === 'n') ? true : false,
        'facticket': (vm.factura === 't') ? true : false,
        'impresoratermica': (vm.termica===true)? 1:0
      };

      CatalogosFactory.AddCatalogoCajas(Parametros)
        .then(function (result) {
          console.log(result);
          ngNotify.set('La caja se ha guardado correctamente', 'success');
          $state.go('home.catalogos.cajas');
        });
    }

    var vm = this;
    vm.Titulo = 'Nuevo Registro';
    init();
    vm.GetSucursales = GetSucursales;
    vm.SaveCaja = SaveCaja;
    vm.block=false;
  });
