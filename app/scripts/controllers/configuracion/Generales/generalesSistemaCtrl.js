'use strict';
angular
  .module('softvApp')
  .controller('generalesSistemaCtrl', function ($state, $uibModal, ngNotify,globalService, generalesSistemaFactory, FileUploader) {

    var vm = this;
    init();
    detallePreferencia();
    Getlogos();
    vm.Guardarperiodo = Guardarperiodo;
    vm.GuardarImpuestos = GuardarImpuestos;
    vm.Guardarcobro = Guardarcobro;
    vm.detalleperiodo = detalleperiodo;
    vm.guardarPreferencias = guardarPreferencias;
    vm.guardaLogo = guardaLogo;
    vm.hexPicker = {};



    vm.uploader = new FileUploader({
      filters: [{
        name: "yourName1",
        fn: function (item) {
          var count = 0;
          vm.uploader.queue.forEach(function (f) {
            alert(f._file.idtipo);
            alert(item.idtipo);
            console.log(f);
            count += f._file.idtipo === item.idtipo ? 1 : 0;
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
      fileItem.file.idtipo = vm.tipoimagen.Idtipo;
      fileItem.file.tipo = vm.tipoimagen.Nombre;
      fileItem._file.idtipo = vm.tipoimagen.Idtipo;
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

    function guardaLogo() {

      var file_options = [];
      var files = [];
      var tipos = [];
      var count = 0;
      vm.uploader.queue.forEach(function (f) {
        var options = {
          IdImagen: 0,
          Tipo: f._file.idtipo,
          Nombre: f._file.name
        };
        file_options.push(options);
        tipos.push(f._file.idtipo);
        files.push(f._file);
      });
      if (count > 1) {
        ngNotify.set("El número de imagenes con el mismo tipo se ha sobrepasado maximo 2", "error");
        return;
      }

      generalesSistemaFactory.GuardaLogos(files, file_options, []).then(function (result) {
        console.log(result);
        ngNotify.set('Se guardo correctamente', 'success');
        Getlogos();
      });

    }

    function Getlogos() {
      generalesSistemaFactory.Getlogos()
        .then(function (result) {
          console.log(result);
          result.forEach(function(item){ item.Valor=globalService.getUrllogos()+'/'+item.Valor});
          vm.tiposimg = result;

        });
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






  });
