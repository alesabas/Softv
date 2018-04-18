"use strict";
angular
  .module("softvApp")
  .controller("generalesSistemaCtrl", function(
    $state,
    $uibModal,
    ngNotify,
    globalService,
    generalesSistemaFactory
  ) {
    var vm = this;
    init();
    //detallePreferencia();
    Getlogos();
    vm.Guardarperiodo = Guardarperiodo;
    vm.GuardarImpuestos = GuardarImpuestos;
    vm.Guardarcobro = Guardarcobro;
    vm.detalleperiodo = detalleperiodo;
    vm.guardarPreferencias = guardarPreferencias;
   
    vm.eligeLogo=eligeLogo;
    vm.hexPicker = {};

    function init() {
      generalesSistemaFactory.GetPeriodoscorte(0, 1).then(function(response) {
        vm.periodos = response.GetPeriodoscorteResult;
        vm.Periodo = vm.periodos[0];

        generalesSistemaFactory
          .GetCONSULTAGENERALESDESC(vm.Periodo.Clv_periodo, 1)
          .then(function(data) {
            vm.periodoCorte = data.GetCONSULTAGENERALESDESCResult;

            generalesSistemaFactory.GetImpuestos(1, 1).then(function(data) {
              console.log(data);
              vm.impuestos = data.GetImpuestosResult;

              generalesSistemaFactory
                .GetspConsultaRangosCobroMaterial(1)
                .then(function(data) {
                  vm.rangos = data.GetspConsultaRangosCobroMaterialResult;
                });
            });
          });
      });
    }

    function Guardarperiodo() {}

    function GuardarImpuestos() {
      var Parametros = {
        Id: 1,
        IVA: vm.impuestos.IVA ? vm.impuestos.IVA : 0,
        IEPS: vm.impuestos.IEPS ? vm.impuestos.IEPS : 0,
        siIEPS: vm.impuestos.siIEPS,
        Cta_IEPS: 0,
        Calculo1: vm.IVAIEPS,
        idcompania: 1,
        ivaFrontera: vm.impuestos.ivaFrontera ? vm.impuestos.ivaFrontera : 0
      };
      console.log(Parametros);
      generalesSistemaFactory
        .GetNueTabla_Impuestos(Parametros)
        .then(function(result) {
          ngNotify.set(
            "Los conceptos de inpuestos se  guardaron correctamente",
            "success"
          );
          console.log(result);
        });
    }

    

    function Getlogos() {
      generalesSistemaFactory.Getlogos().then(function(result) {

        console.log(result);
        console.log(globalService.getUrllogos() + "/" + result.GetlogosResult[0].Valor);
        vm.logo1=globalService.getUrllogos() + "/" + result.GetlogosResult[0].Valor;
        vm.logo2=globalService.getUrllogos() + "/" + result.GetlogosResult[1].Valor;
        vm.logo3=globalService.getUrllogos() + "/" + result.GetlogosResult[2].Valor;
        vm.logo4=globalService.getUrllogos() + "/" + result.GetlogosResult[3].Valor;
       
      });
    }

    function eliminarango(id) {
      generalesSistemaFactory
        .GetspEliminaRangosCobroMaterial(id)
        .then(function(result) {
          ngNotify.set("El rango se ha eliminado correctamente", "warn");
        });
    }

    function Guardarcobro() {
      var obj = {
        id: 0,
        inicio: vm.rangoinicial,
        final: vm.rangofinal,
        maximo: vm.pagosdiferidos,
        idcompania: 1
      };
      generalesSistemaFactory
        .GetspAgregaRangosCobroMaterial(obj)
        .then(function(data) {
          console.log(data);
          ngNotify.set("El rango se ha guardado correctamente", "success");
        });
    }

    function detalleperiodo() {
      generalesSistemaFactory
        .GetCONSULTAGENERALESDESC(vm.Periodo.Clv_periodo, 1)
        .then(function(data) {
          console.log(data);
          vm.periodoCorte = data.GetCONSULTAGENERALESDESCResult;
        });
    }

    function guardarPreferencias() {
      var obj = {
        NombreSistema: vm.nombresistema,
        TituloNav: vm.titulomenu,
        ColorMenu: vm.hexPicker.colormenu,
        ColorMenuLetra: vm.hexPicker.colormenuletra,
        ColorNav: vm.hexPicker.colornavegacion,
        ColorNavLetra: vm.hexPicker.colornavegacionletra,
        MensajeHome: vm.mensajeinicio,
        ColorFondo: vm.hexPicker.colorfondo
      };
      generalesSistemaFactory.GetguardaPreferencia(obj).then(function(result) {
        ngNotify.set("Se guardo correctamente", "success");
      });
    }

    function detallePreferencia() {
      generalesSistemaFactory.GetDetallePreferencias().then(function(result) {
        var detalle = result.GetDetallePreferenciasResult;
        console.log(detalle);
        vm.nombresistema = detalle.NombreSistema;
        vm.mensajeinicio = detalle.MensajeHome;
        vm.titulomenu = detalle.TituloNav;
        vm.hexPicker.colormenu = detalle.ColorMenu;
        vm.hexPicker.colormenuletra = detalle.ColorMenuLetra;
        vm.hexPicker.colornavegacion = detalle.ColorNav;
        vm.hexPicker.colornavegacionletra = detalle.ColorNavLetra;

        vm.hexPicker.colorfondo = detalle.ColorFondo;
      });
    }

    function eligeLogo(op){
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/configuracion/modalEligeLogo.html',
        controller: 'modalEligeLogoCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'md',
        resolve: {
          tipo: function () {
              return op;
          }
      }
      });
      modalInstance.result.then(function () {
        Getlogos();
      });
    }


  });
