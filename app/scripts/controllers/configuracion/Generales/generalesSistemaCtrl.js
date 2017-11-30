'use strict';
angular
  .module('softvApp')
  .controller('generalesSistemaCtrl', function ($state, $uibModal, ngNotify, generalesSistemaFactory, FileUploader) {

    var vm = this;
    init();
    detallePreferencia();
    vm.Guardarperiodo = Guardarperiodo;
    vm.GuardarImpuestos = GuardarImpuestos;
    vm.Guardarcobro = Guardarcobro;
    vm.detalleperiodo = detalleperiodo;
    vm.guardarPreferencias = guardarPreferencias;
    vm.hexPicker={};
   
    vm.tiposimg = [{
        "IdTipo": 3,
        "Nombre": "LogoNav"
      },
      {
        "IdTipo": 4,
        "Nombre": "LogoLogin"
      },
      {
        "IdTipo": 5,
        "Nombre": "LogoHome"
      },
      {
        "IdTipo": 6,
        "Nombre": "LogoReportes"
      },
      {
        "IdTipo": 7,
        "Nombre": "LogoTickets"
      }

    ];

    vm.uploader = new FileUploader({
      filters: [{
        name: "yourName1",
        fn: function (item) {
          var count = 0;
          vm.uploader.queue.forEach(function (f) {
            count += f._file.name === item.name ? 1 : 0;
          });
          if (count > 0) {
            ngNotify.set(
              "Un archivo con ese mismo nombre ya fue seleccionado",
              "warn"
            );
            return false;
          } else {
            return true;
          }
        }
      }]
    });



    vm.uploader.onAfterAddingFile = function (fileItem) {
      console.log(fileItem);
      fileItem.file.idtipo = vm.tipoimagen.IdTipo;
      fileItem.file.tipo = vm.tipoimagen.Nombre;
      fileItem._file.idtipo = vm.tipoimagen.IdTipo;
      fileItem._file.tipo = vm.tipoimagen.Nombre;
    };



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

    function guardarPreferencias() {
      var obj = {
        'NombreSistema': vm.nombresistema,
        'TituloNav': vm.titulomenu,
        'ColorMenu': vm.hexPicker.colormenu,
        'ColorMenuLetra': vm.hexPicker.colormenuletra,
        'ColorNav': vm.hexPicker.colornavegacion,
        'ColorNavLetra': vm.hexPicker.colornavegacionletra,
        'MensajeHome': vm.mensajeinicio,
        'ColorFondo': vm.hexPicker.colorfondo
      }
      generalesSistemaFactory.GetguardaPreferencia(obj).then(function (result) {
        ngNotify.set('Se guardo correctamente', 'success');
      });
    }

    function detallePreferencia() {
      generalesSistemaFactory.GetDetallePreferencias().then(function (result) {
        var detalle = result.GetDetallePreferenciasResult;
        console.log(detalle);
        vm.nombresistema=detalle.NombreSistema;
        vm.mensajeinicio=detalle.MensajeHome;
        vm.titulomenu=detalle.TituloNav;
        vm.hexPicker.colormenu=detalle.ColorMenu;
        vm.hexPicker.colormenuletra=detalle.ColorMenuLetra;
        vm.hexPicker.colornavegacion=detalle.ColorNav;
        vm.hexPicker.colornavegacionletra=detalle.ColorNavLetra;
       
        vm.hexPicker.colorfondo=detalle.ColorFondo;
      });
    }






  });
