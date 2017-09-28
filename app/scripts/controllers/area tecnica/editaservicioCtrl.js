'use strict';

angular
  .module('softvApp')
  .controller('editaservicioCtrl', function (atencionFactory, trabajosFactory, ngNotify, $stateParams) {

    function init() {
      trabajosFactory.GetSoftv_GetTrabajoById($stateParams.id)
        .then(function (result) {
          atencionFactory.getServicios().then(function (data) {

            vm.servicios = data.GetMuestraTipSerPrincipalListResult;
            var trabajo = result.GetSoftv_GetTrabajoByIdResult;
            vm.clv_trabajo = trabajo.clv_trabajo;
            vm.clave = trabajo.trabajo;
            vm.titulo = 'Edita trabajo - ' + vm.clave;
            vm.descripcion = trabajo.descripcion;
            vm.individual = trabajo.puntos;
            vm.proceso = trabajo.sica;
            vm.descarga = trabajo.secobramaterial;
            vm.tipo = trabajo.tipo;
            vm.blockservicio=true;

            vm.blockmateriales = (vm.descarga === true) ? false : true;

            if (trabajo.tipo === 'Q') {

              vm.showimputable = true;

              trabajosFactory.GetMuestra_Imputables()
                .then(function (data) {
                  vm.imputables = data.GetMuestra_ImputablesResult;
                  vm.imputables.forEach(function (item) {
                    if (item.idimputable === trabajo.imputable) {
                      vm.imputable = item;
                    }
                  });
                });

            }
            vm.servicios.forEach(function (item) {
              if (item.Clv_TipSerPrincipal === trabajo.clv_tipser) {
                vm.servicio = item;
              }
            });
            consultamateriales();
            obtenarticulosacom();
          });
        });

    }


    function save() {
      if (vm.relaciones.length === 0 && vm.descarga === true) {
        ngNotify.set('capture el material o desabilite la opcion de cobro de material', 'warn');
        return;
      }
      var params = {
        'Clv_Trabajo': vm.clv_trabajo,
        'clv_tipser': vm.servicio.Clv_TipSerPrincipal,
        'trabajo': vm.clave,
        'descripcion': vm.descripcion,
        'puntos': vm.individual,
        'cobranza': 0,
        'tipo': 'O',
        'prospectos': 0,
        'sica': vm.proceso,
        'secobramaterial': vm.descarga
      };
      trabajosFactory.GetSoftv_EditTrabajo(params).then(function (data) {
        console.log(data);

        if (data.GetSoftv_AddTrabajoResult === -1) {
          ngNotify.set('El trabajo no se pudo guardar ,por que existe una clave regitrada con el mismo valor', 'error');
        } else {
          vm.clv_trabajo = data.GetSoftv_AddTrabajoResult;
          vm.blockdescarga = true;
          vm.blocksave = true;
          vm.blockform = true;
          ngNotify.set('El trabajo se guardo con exito ,ahora puede continuar con la configuaración o salir del catálogo');
        }

      });
    }

    function agregarelacion() {
      trabajosFactory.
      GetSoftv_AddRelMaterialTrabajo(vm.clasificacion.clvtipo,
          vm.descripcionart.clave,
          vm.cantidad,
          vm.clv_trabajo, vm.servicio.Clv_TipSerPrincipal)
        .then(function (data) {
          if (data.GetSoftv_AddRelMaterialTrabajoResult === -1) {
            ngNotify.set('El artículo ya esta registrado ', 'warn');
          }

          consultamateriales();
        });
    }

    function obtenarticulosacom() {
      trabajosFactory.GetMuestra_Articulos_Acometida()
        .then(function (result) {
          vm.articulosacom = result.GetMuestra_Articulos_AcometidaResult;
        });
    }

    function bloquearmaterial() {
      vm.blockmateriales = (vm.descarga === true) ? false : true;
    }

    function consultamateriales() {
      trabajosFactory.GetConsultaRelMaterialTrabajos(vm.clv_trabajo)
        .then(function (data) {
          vm.relaciones = data.GetConsultaRelMaterialTrabajosResult;
        });
    }

    function obtenarticulos() {
      trabajosFactory.GetMuestra_Articulos_Clasificacion(vm.clasificacion.clvtipo)
        .then(function (data) {
          vm.articulos = data.GetMuestra_Articulos_ClasificacionResult;
        });
    }

    var vm = this;
    init();
    vm.blockdescarga = false;
    vm.blocksave = false;

    vm.blockform = false;
    vm.obtenarticulos = obtenarticulos;
    vm.agregarelacion = agregarelacion;
    vm.save = save;
    vm.showimputable = false;
    vm.bloquearmaterial = bloquearmaterial;


  });
