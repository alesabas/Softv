'use strict';
angular
  .module('softvApp')
  .controller('generalesSistemaCtrl', function ($state, $uibModal, ngNotify, generalesSistemaFactory) {

    function init() {



      generalesSistemaFactory.GetPeriodoscorte(0, 1)
        .then(function (response) {
          console.log(response);
          vm.periodos = response.GetPeriodoscorteResult;
          vm.Periodo = vm.periodos[0];

          generalesSistemaFactory.GetGeneralesPrincipal()
            .then(function (data) {
              vm.GetGeneralesPrincipal = data.GetGeneralesPrincipalResult;
              console.log(data);

              generalesSistemaFactory.GetCONSULTAGENERALESDESC(vm.Periodo.Clv_periodo, 1)
                .then(function (data) {
                  console.log(data);
                  vm.periodoCorte = data.GetCONSULTAGENERALESDESCResult;

                  generalesSistemaFactory.GetspConsultaRangosCobroMaterial(1)
                    .then(function (data) {
                      console.log(data.GetspConsultaRangosCobroMaterialResult);
                      vm.rangos = data.GetspConsultaRangosCobroMaterialResult;

                      generalesSistemaFactory.GetImpuestos(1, 1)
                        .then(function (data) {
                          console.log(data);
                          vm.impuestos = data.GetImpuestosResult;
                        });


                    });

                });



            });


        });

    }

    function Guardarperiodo() {

    }

    function GuardarImpuestos() {

    }

    function eliminarango(id) {
      generalesSistemaFactory.GetspEliminaRangosCobroMaterial(id)
        .then(function (result) {
          ngNotify.set('El rango se ha eliminado correctamente', 'warn');
        });
    }

    function Guardarcobro() {
      var obj = {
        'id': 0,
        'inicio': vm.rangoinicial,
        'final': vm.rangofinal,
        'maximo': vm.pagosdiferidos,
        'idcompania': 1
      };
      generalesSistemaFactory.GetspAgregaRangosCobroMaterial(obj)
        .then(function (data) {
          console.log(data);
          ngNotify.set('El rango se ha guardado correctamente', 'success');
        });
    }

    function detalleperiodo() {
      generalesSistemaFactory.GetCONSULTAGENERALESDESC(vm.Periodo.Clv_periodo, 1)
        .then(function (data) {
          console.log(data);
          vm.periodoCorte = data.GetCONSULTAGENERALESDESCResult;
        });
    }

    var vm = this;
    init();
    vm.Guardarperiodo = Guardarperiodo;
    vm.GuardarImpuestos = GuardarImpuestos;
    vm.Guardarcobro = Guardarcobro;
    vm.detalleperiodo = detalleperiodo;

  });
