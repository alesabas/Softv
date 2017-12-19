'use strict';

angular
  .module('softvApp')
  .controller('NuevodescuentoComboCtrl', function ($uibModal, CatalogosFactory, $localStorage,ngNotify) {

    function initData() {

      CatalogosFactory.Get_clv_session_Reportes().then(function (result) {
        vm.session = result.Get_clv_session_ReportesResult;
        console.log(result);
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
    }

    function GetServiciosCombo() {
      CatalogosFactory.Getsp_muestraServiciosCombos(vm.tipoServicio.Clv_TipSerPrincipal, 0, parseInt(vm.tipo), 488)
        .then(function (result) {
          vm.ServiciosCombosList = result.Getsp_muestraServiciosCombosResult;
          console.log(result);
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
        'Descripcion':vm.nombreCombo,
        'Op': 0
      };
      CatalogosFactory.GetAgrPreDetDescuentoCombo(obj).then(function (result) {
        GetDetalle();
      });
    }

    function GetDetalle() {
      CatalogosFactory.GetConDetDescuentoCombo(0, 0, '', vm.session, 1).then(function (result) {
        vm.listadesc=result.GetConDetDescuentoComboResult
      });
    }

    function eliminadetCombo(item){
      CatalogosFactory.GetEliPreDetDescuentoCombo(vm.session,item.Clv_Servicio,0).then(function(result){
        GetDetalle();
      });
    }

    function SaveCombo(){
      CatalogosFactory.GetNueDescuentoCombo(vm.tipoCliente.CLV_TIPOCLIENTE,vm.nombreCombo,488)
      .then(function(result){
        var id= result.GetNueDescuentoComboResult;
        CatalogosFactory.GetNueDetDescuentoCombo(id,vm.session,488).then(function(result){
          $state.go('home.catalogos.combo');
          ngNotify.set('El descuento combo se ha guardado correctamente','success');
        });
      });
    }


    var vm = this;
    vm.titulo = 'Nuevo descuento combo';
    vm.tipo = '7';
    vm.GetServiciosCombo = GetServiciosCombo;
    vm.SaveCombo = SaveCombo;
    vm.eliminadetCombo=eliminadetCombo;
    vm.SaveCombo=SaveCombo;
    vm.addServicio=addServicio;
    vm.blocknombre=true;
    vm.detalle=false;
    vm.blocknombre = false;
    initData();

  });
