'use strict';

angular
  .module('softvApp')
  .controller('DetalledescuentoComboCtrl', function ($uibModal, CatalogosFactory, $localStorage, ngNotify, $stateParams, $state) {

    function initData() {
      console.log($stateParams.id);
      CatalogosFactory.GetDameClv_Descuento(1, $stateParams.id).then(function (data) {
        vm.Clvdescuento = data.GetDameClv_DescuentoResult;
        if (vm.Clvdescuento > 0) {

          vm.nombreCombo = $stateParams.id;
          vm.titulo = 'Detalle descuento combo ' + vm.nombreCombo;


          CatalogosFactory.Get_clv_session_Reportes().then(function (result) {
            vm.session = result.Get_clv_session_ReportesResult;
            console.log(result);

            CatalogosFactory.GetConDetDescuentoCombo(0, 1, vm.nombreCombo, 0, 1).then(function (result) {
              vm.listadesc = result.GetConDetDescuentoComboResult
              console.log(vm.listadesc);

              CatalogosFactory.GetTipoClienteList_WebSoftvnew().then(function (data) {
                vm.TipoCobroList = data.GetTipoClienteList_WebSoftvnewResult;
                vm.tipoCliente = vm.TipoCobroList[0];
                CatalogosFactory.GetMuestraTipSerPrincipal_SERList().then(function (data) {
                  vm.TipoServicioList = data.GetMuestraTipSerPrincipal_SERListResult;
                  vm.tipoServicio = vm.TipoServicioList[0];
                  GetServiciosCombo();
                });
              });

            });

          });


        }


      });


    }

    function GetServiciosCombo() {
      CatalogosFactory.Getsp_muestraServiciosCombos(vm.tipoServicio.Clv_TipSerPrincipal, 0, parseInt(vm.tipo), 488)
        .then(function (result) {
          vm.ServiciosCombosList = result.Getsp_muestraServiciosCombosResult;
        });
    }


    function GetDetalle(op) {
      CatalogosFactory.GetConDetDescuentoCombo(0, 1, vm.nombreCombo, vm.session, op).then(function (result) {
        vm.listadesc = result.GetConDetDescuentoComboResult;
      });
    }

    var vm = this;

    initData();

    vm.tipo = '7';
    vm.detalle = true;
    vm.blocknombre = true;


  });
