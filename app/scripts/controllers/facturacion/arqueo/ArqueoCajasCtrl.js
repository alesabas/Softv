'use strict';
angular
  .module('softvApp')
  .controller('ArqueoCajasCtrl', function (globalService, generalesSistemaFactory, $state, $rootScope, ngNotify, entregasFactory, arqueoFactory, $filter) {


    this.$onInit = function () {

      generalesSistemaFactory.GetvalidaAccesoFacturacion().then(function (data) {
        if (data.GetvalidaAccesoFacturacionResult === 0) {
          $state.go('home.dashboard');
          ngNotify.set('Su máquina no esta registrada como una caja, por tal motivo no tiene acceso a facturación', 'warn');
        }
      });

    };

    function initialData() {
      entregasFactory.getPlazas().then(function (data) {
        data.GetMuestraPlazasProcesosListResult.unshift({
          'razon_social': '----------------',
          'id_compania': 0
        });
        vm.plazas = data.GetMuestraPlazasProcesosListResult;
        vm.selectedPlaza = data.GetMuestraPlazasProcesosListResult[0];
      });
    }

    function changePlaza() {
      arqueoFactory.getCajeros(vm.selectedPlaza.id_compania).then(function (data) {
        data.GetMuestraCajerosArqueoListResult.unshift({
          'Nombre': '----------------',
          'Clv_Usuario': 0
        });
        vm.cajeros = data.GetMuestraCajerosArqueoListResult;
        vm.selectedCajero = data.GetMuestraCajerosArqueoListResult[0];
      });
    }

    function generarArqueo() {
      if (vm.selectedPlaza.id_compania == 0) {
        ngNotify.set('Por favor selecciona una plaza válida.', 'error');
      } else {
        if (vm.selectedCajero.Clv_Usuario == 0) {
          ngNotify.set('Por favor selecciona un cajero válido.', 'error');
        } else {
          if (vm.fecha == '' || vm.fecha == undefined) {
            ngNotify.set('Por favor selecciona un fecha válida.', 'error');
          } else {
            vm.auxFecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');
            arqueoFactory.reporteArqueo(vm.auxFecha, vm.selectedCajero.Clv_Usuario).then(function (data) {
              if (data.GetT1RepArqueoListResult[0].Nombre == 'Sin Registros') {
                ngNotify.set('No se encontraron registros.', 'error');
              } else {
                var url = globalService.getUrlReportes() + '/Reportes/' + data.GetT1RepArqueoListResult[0].Nombre;
                $('#reporteID').attr('src', url);
                vm.showReporte = true;
              }
            });
          }
        }
      }
    }

    var vm = this;
    vm.changePlaza = changePlaza;
    vm.generarArqueo = generarArqueo;
    vm.showReporte = false;
    initialData();
  });
