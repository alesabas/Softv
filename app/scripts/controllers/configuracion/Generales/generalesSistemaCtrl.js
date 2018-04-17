"use strict";
angular
  .module("softvApp")
  .controller("generalesSistemaCtrl", function(
    $state,
    $uibModal,
    ngNotify,
    globalService,
    generalesSistemaFactory,
    FileUploader
    
  ) {
    var vm = this;
    init();
    //detallePreferencia();
    //Getlogos();
    vm.Guardarperiodo = Guardarperiodo;
    vm.GuardarImpuestos = GuardarImpuestos;
    vm.Guardarcobro = Guardarcobro;
    vm.detalleperiodo = detalleperiodo;
    vm.guardarPreferencias = guardarPreferencias;
    vm.guardaLogo = guardaLogo;
    vm.hexPicker = {};

    vm.uploader = new FileUploader({
      filters: [
        {
          name: "yourName1",
          fn: function(item) {
            var count = 0;
            vm.uploader.queue.forEach(function(f) {             
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
        }
      ]
    });

    vm.uploader.onAfterAddingFile = function(fileItem) {
      fileItem.file.idtipo = vm.tipoimagen.Idtipo;
      fileItem.file.tipo = vm.tipoimagen.Nombre;
      fileItem._file.idtipo = vm.tipoimagen.Idtipo;
      fileItem._file.tipo = vm.tipoimagen.Nombre;
    };

    vm.BonificacionDis = true;
    vm.AddGenBonTipoUsuario = AddGenBonTipoUsuario;
    vm.AddAutBonTipoUsuario = AddAutBonTipoUsuario;

    function init() {
      generalesSistemaFactory.GetPeriodoscorte(0, 1).then(function(response) {       
        vm.periodos = response.GetPeriodoscorteResult;
        vm.Periodo = vm.periodos[0];
          generalesSistemaFactory
            .GetCONSULTAGENERALESDESC(vm.Periodo.Clv_periodo, 1)
            .then(function(data) {           
              vm.periodoCorte = data.GetCONSULTAGENERALESDESCResult;   
                  generalesSistemaFactory
                    .GetImpuestos(1, 1)
                    .then(function(data) {
                      vm.impuestos = data.GetImpuestosResult;

                      generalesSistemaFactory
                      .GetspConsultaRangosCobroMaterial(1)
                      .then(function(data) {
                       
                        vm.rangos = data.GetspConsultaRangosCobroMaterialResult;
                    });
                });
            });
            GetBonificacion();
            GetTipoUsuarioList();
            GetBonGenTipoUsuarioList();
            GetBonAutTipoUsuario();
      });
    }

    function Guardarperiodo() {}

    function GuardarImpuestos() {
      var Parametros = {
        Id: 1,
        IVA: (vm.impuestos.IVA)?vm.impuestos.IVA:0,
        IEPS: (vm.impuestos.IEPS)?vm.impuestos.IEPS:0,
        siIEPS:vm.impuestos.siIEPS,
        Cta_IEPS: 0,
        Calculo1: vm.IVAIEPS,
        idcompania: 1,
        ivaFrontera: (vm.impuestos.ivaFrontera)?vm.impuestos.ivaFrontera:0
      };
      generalesSistemaFactory
        .GetNueTabla_Impuestos(Parametros)
        .then(function(result) {
          ngNotify.set("Los conceptos de inpuestos se  guardaron correctamente", "success");
        });
    }

    function guardaLogo() {
      var file_options = [];
      var files = [];
      var tipos = [];
      var count = 0;
      vm.uploader.queue.forEach(function(f) {
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
        ngNotify.set(
          "El número de imagenes con el mismo tipo se ha sobrepasado maximo 2",
          "error"
        );
        return;
      }
      generalesSistemaFactory
        .GuardaLogos(files, file_options, [])
        .then(function(result) {
          ngNotify.set("Se guardo correctamente", "success");
          Getlogos();
        });
    }

    function Getlogos() {
      generalesSistemaFactory.Getlogos().then(function(result) {
        result.forEach(function(item) {
          item.Valor = globalService.getUrllogos() + "/" + item.Valor;
        });
        vm.tiposimg = result;
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
          ngNotify.set("El rango se ha guardado correctamente", "success");
        });
    }

    function detalleperiodo() {
      generalesSistemaFactory
        .GetCONSULTAGENERALESDESC(vm.Periodo.Clv_periodo, 1)
        .then(function(data) {
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

    function GetBonificacion(){
      generalesSistemaFactory.GetConsultaBonficacion().then(function(data){
        vm.Bonificacion = data.GetConsultaBonficacionResult.Bonificacion
      });
    }

    function GetTipoUsuarioList(){
      generalesSistemaFactory.GetBonificacionTipoUsarioDisList().then(function(data){
        vm.TipoUsuarioList = data.GetBonificacionTipoUsarioDisListResult;
      });
    }

    function GetBonGenTipoUsuarioList(){
      generalesSistemaFactory.GetBonificacionTipoUsarioList().then(function(data){
        vm.TipoBonGenTipoUsuarioList = data.GetBonificacionTipoUsarioListResult;
      });
    }

    function GetBonAutTipoUsuario(){
      generalesSistemaFactory.GetBonificacionAutorizaTipoUsarioList().then(function(data){
        vm.BonAutTipoUsuarioList = data.GetBonificacionAutorizaTipoUsarioListResult;
      });
    }

    function AddGenBonTipoUsuario(Op, Clv){
      if((Op == 1 && vm.TipoUsuario != undefined) || (Op == 2 && Clv != undefined)){
        var ObjBonificacion = {
          'Clv_TipoUsuario': (Op == 1)? vm.TipoUsuario.Clv_TipoUsuario:Clv,
          'Op': Op
        };
        generalesSistemaFactory.GetAddBonTipoUsuario(ObjBonificacion).then(function(data){
          var Msj = (Op == 1)? 'Se agregó Tipo de Usuario':'Se eliminó Tipo de Usuario';
          ngNotify.set("Correcto, " + Msj, "success");
          GetTipoUsuarioList();
          GetBonGenTipoUsuarioList();
          GetBonAutTipoUsuario();
        });
      }else{
        ngNotify.set("Error, Tiene que ingresar un usuario", "warn");
      }
    }

    function AddAutBonTipoUsuario(Op, Clv){
      if((Op == 1 && vm.TipoUsuario != undefined) || (Op == 2 && Clv != undefined)){
        var ObjBonificacion = {
          'Clv_TipoUsuario': (Op == 1)? vm.TipoUsuario.Clv_TipoUsuario:Clv,
          'Op': Op
        };
        generalesSistemaFactory.GetAddBonTipoUsuarioAutoriza(ObjBonificacion).then(function(data){
          var Msj = (Op == 1)? 'Se agregó Tipo de Usuario':'Se eliminó Tipo de Usuario';
          ngNotify.set("Correcto, " + Msj, "success");
          GetTipoUsuarioList();
          GetBonGenTipoUsuarioList();
          GetBonAutTipoUsuario();
        });
      }else{
        ngNotify.set("Error, Tiene que ingresar un usuario", "warn");
      }
    }

  });