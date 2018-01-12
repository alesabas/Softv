'use strict';
angular
  .module('softvApp')
  .controller('generalesDistribuidorCtrl', function ($state, rolFactory, atencionFactory, generalesSistemaFactory, globalService, $uibModal, ngNotify) {

    function init() {
      atencionFactory.getPlazas().then(function (data) {
        vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
        vm.Plaza = vm.plazas[0];
        console.log(vm.plazas);
        ObtenDetalle();
      });
    }


    function ObtenDetalle() {
      generalesSistemaFactory.GetGeneralDistribuidor(vm.Plaza.id_compania)
        .then(function (result) {
          vm.mensajeticket = result.GetGeneralDistribuidorResult.mensajeticket_mensaje;
          vm.mensajeactivo = result.GetGeneralDistribuidorResult.mensajeticket_activo;
          vm.bonificacion = result.GetGeneralDistribuidorResult.BonificacionMax;

          generalesSistemaFactory.GetMuestra_tecnicosDepartamentos(0)
            .then(function (result) {
              console.log(result);
              vm.departamentos = result.GetMuestra_tecnicosDepartamentosResult;

              generalesSistemaFactory.GetConPuestos(vm.Plaza.id_compania)
                .then(function (response) {
                  vm.tecnicosordenes = response.GetConPuestosResult;


                  generalesSistemaFactory.GetConsultatecnicosReporte(0, vm.Plaza.id_compania)
                    .then(function (response) {
                      console.log(response);
                    });

                });
            });
        });
    }

    function obtentecnicos() {
      generalesSistemaFactory.GetMuestra_TecnicosByFamili(1, vm.Depatamento.clv_puesto, vm.Plaza.id_compania)
        .then(function (result) {
          console.log(result)
          vm.TecnicoList = result.GetMuestra_TecnicosByFamiliResult;
        });
    }

    function guardamensaje() {
      generalesSistemaFactory.GetNueGeneralMsjTickets(vm.Plaza.id_compania, vm.mensajeticket, vm.mensajeactivo)
        .then(function (result) {
          ngNotify.set('Se guardo exitosamente', 'success');
        });
    }

    function guardaBonificacion() {
      generalesSistemaFactory.GetNUEBonificacionCajeras(vm.Plaza.id_compania,vm.bonificacion)
        .then(function (result) {
          ngNotify.set('Se guardo exitosamente', 'success');
        });
    }

    function AddRelTecnicoOrdenes(){
      generalesSistemaFactory.GetNueRelOrdenesTecnicos(vm.Plaza.id_compania, vm.Depatamento.clv_puesto, vm.Tecnico.clv_tecnico).then(function(data){
        console.log(data);
        ObtenDetalle();
      });
    }
    
    function AddRelTecnicoReportes(){
      generalesSistemaFactory.GetNueRel_Tecnicos_Quejas(vm.Plaza.id_compania, vm.Depatamento.clv_puesto, vm.Tecnico.clv_tecnico).then(function(data){
        console.log(data);
        ObtenDetalle();
      });
    }

    var vm = this;
    init();
    vm.AddRelTecnicoOrdenes = AddRelTecnicoOrdenes;
    vm.obtentecnicos = obtentecnicos;
    vm.ObtenDetalle = ObtenDetalle;
    vm.guardamensaje = guardamensaje;
	  vm.guardaBonificacion=guardaBonificacion;
    vm.AddRelTecnicoOrdenes = AddRelTecnicoOrdenes;
    vm.AddRelTecnicoReportes = AddRelTecnicoReportes;
  });
