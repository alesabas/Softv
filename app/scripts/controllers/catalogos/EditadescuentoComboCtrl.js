'use strict';

angular
  .module('softvApp')
  .controller('EditadescuentoComboCtrl', function ($uibModal, CatalogosFactory, $localStorage, ngNotify, $stateParams, $state) {

    function initData() {
      console.log($stateParams.id);
      CatalogosFactory.GetDameClv_Descuento(1, $stateParams.id).then(function (data) {
        vm.Clvdescuento = data.GetDameClv_DescuentoResult;
        if (vm.Clvdescuento > 0) {

          vm.nombreCombo = $stateParams.id;
          vm.titulo = 'Edita descuento combo '+ vm.nombreCombo;


          CatalogosFactory.Get_clv_session_Reportes().then(function (result) {
            vm.session = result.Get_clv_session_ReportesResult;
            console.log(result);

            CatalogosFactory.GetConDetDescuentoCombo(0, 1, vm.nombreCombo, vm.session, 0).then(function (result) {
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

    function eliminadetCombo(item) {
      CatalogosFactory.GetEliPreDetDescuentoCombo(vm.session, item.Clv_Servicio, 0).then(function (result) {
        CatalogosFactory.GetConDetDescuentoCombo(0, 0, '', vm.session,1 ).then(function (result) {
            vm.listadesc = result.GetConDetDescuentoComboResult;
          });
      });

    }

   
    function addServicio() {

      var obj = {
        'Clv_Session': vm.session,
        'Clv_TipSer': vm.tipoServicio.Clv_TipSerPrincipal,
        'Clv_Servicio': vm.servicioCombo.Clv_Servicio,
        'Cont': vm.contratacion,
        'Mens': vm.mensualidad,
        'Reco': vm.renta,
        'Puntos': 0,
        'Llamada': 0,
        'Descripcion': vm.nombreCombo,
        'Op': 0
      };
      CatalogosFactory.GetAgrPreDetDescuentoCombo(obj).then(function (result) {
        CatalogosFactory.GetConDetDescuentoCombo(0, 0, '', vm.session, 1).then(function (result) {
            vm.listadesc = result.GetConDetDescuentoComboResult;
          });
      });
    }

    function SaveCombo() {
      CatalogosFactory.GetModDescuentoCombo(vm.Clvdescuento,0, vm.nombreCombo)
        .then(function (result) {
            $state.go('home.catalogos.combo');
            ngNotify.set('El descuento combo se ha guardado correctamente', 'success');
        });
    }

    var vm = this;
    initData();
    
    vm.tipo = '7';
    vm.eliminadetCombo = eliminadetCombo;
    vm.blocknombre = true;
    vm.addServicio = addServicio;
    vm.SaveCombo = SaveCombo;
    vm.detalle=false;
  });
