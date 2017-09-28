'use strict';

angular
  .module('softvApp')
  .controller('nuevoservicioCtrl', function (atencionFactory, trabajosFactory, ngNotify) {

    function init() {
      obtenarticulosacom();

      atencionFactory.getServicios().then(function (data) {
        vm.servicios = data.GetMuestraTipSerPrincipalListResult;
        vm.servicio = vm.servicios[0];
        trabajosFactory.GetMuestra_Imputables()
          .then(function (data) {
            vm.imputables = data.GetMuestra_ImputablesResult;
            console.log(data);

            trabajosFactory.GetMuestra_Articulos_Acometida()
              .then(function (data) {
                console.log(data);
              });
          });

      });

    }

    function obtenarticulosacom() {
      trabajosFactory.GetMuestra_Articulos_Acometida()
        .then(function (result) {
          vm.articulosacom = result.GetMuestra_Articulos_AcometidaResult;
        });
    }

    function obtenarticulos() {
      trabajosFactory.GetMuestra_Articulos_Clasificacion(vm.clasificacion.clvtipo)
        .then(function (data) {
          vm.articulos = data.GetMuestra_Articulos_ClasificacionResult;
          console.log(data.GetMuestra_Articulos_ClasificacionResult);
        });
    }

    function save() {
      var params = {
        'clv_tipser': vm.servicio.Clv_TipSerPrincipal,
        'trabajo': vm.clave,
        'descripcion': vm.descripcion,
        'puntos': vm.individual,
        'cobranza': 0,
        'tipo': vm.tipo,
        'prospectos': 0,
        'sica': (vm.proceso === null) ? false : vm.proceso,
        'secobramaterial': (vm.descarga === null) ? false : vm.descarga
      };
      trabajosFactory.GetSoftv_AddTrabajo(params).then(function (data) {
        console.log(data);

        if (data.GetSoftv_AddTrabajoResult === -1) {
          ngNotify.set('El trabajo no se pudo guardar ,por que existe una clave regitrada con el mismo valor', 'error');
        } else {
          vm.clv_trabajo = data.GetSoftv_AddTrabajoResult;
          vm.blocksave = true;
          vm.blockform = true;
          ngNotify.set('El trabajo se guardo con exito ,ahora puede continuar con la configuaración o salir del catálogo');
          if (vm.tipo === 'Q') {
            trabajosFactory.GetGuarda_imputablePorTrabajo(vm.clv_trabajo, vm.imputable.idimputable).then(function (result) {});
          }


        }

      });
    }

    function agregarelacion() {
      if (vm.clv_trabajo>0) {
        trabajosFactory.GetSoftv_AddRelMaterialTrabajo(vm.clasificacion.clvtipo, vm.descripcionart.clave, vm.cantidad, vm.clv_trabajo, vm.servicio.Clv_TipSerPrincipal)
          .then(function (data) {
            if (data.GetSoftv_AddRelMaterialTrabajoResult === -1) {
              ngNotify.set('El artículo ya esta registrado ', 'warn');
            }
            console.log(data);
            consultamateriales();
          });
      }else{
         ngNotify.set('Guarde el trabajo para continuar la asignación ', 'warn');
      }

    }

    function consultamateriales() {
      trabajosFactory.GetConsultaRelMaterialTrabajos(vm.clv_trabajo)
        .then(function (data) {
          vm.relaciones = data.GetConsultaRelMaterialTrabajosResult;
          console.log(data);
        });
    }

    function bloquearmaterial() {
      vm.blockmateriales = (vm.descarga === true) ? false : true;
    }


    var vm = this;
    init();
    vm.bloquearmaterial = bloquearmaterial;
    vm.obtenarticulos = obtenarticulos;
    vm.titulo = 'Nuevo trabajo';
    vm.save = save;
    vm.blockdescarga = true;
    vm.clv_trabajo = 0;
    vm.blocksave = false;
    vm.agregarelacion = agregarelacion;
    vm.blockmateriales = true;
    vm.blockform = false;
    vm.showimputable = false;
  });
