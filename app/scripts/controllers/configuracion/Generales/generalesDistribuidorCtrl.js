'use strict';
angular
  .module('softvApp')
  .controller('generalesDistribuidorCtrl', function ($state, rolFactory, atencionFactory, generalesSistemaFactory, globalService, $uibModal, ngNotify) {

    function init() {
      atencionFactory.getPlazas().then(function (data) {
        vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
        vm.Plaza = vm.plazas[0];
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
              vm.departamentos = result.GetMuestra_tecnicosDepartamentosResult;
              vm.Depatamento = vm.departamentos[0];
              obtentecnicos();
              generalesSistemaFactory.GetConPuestos(vm.Plaza.id_compania)
                .then(function (response) {
                  vm.tecnicosordenes = response.GetConPuestosResult;
                  generalesSistemaFactory.GetConsultatecnicosReporte(0, vm.Plaza.id_compania)
                    .then(function (response) {
                      vm.TecnicoRepList = (response.GetConsultatecnicosReporteResult.length > 0)? response.GetConsultatecnicosReporteResult[0].tecnicos:null;
                    });

                });
            });
        });
    }

    function obtentecnicos() {
      generalesSistemaFactory.GetMuestra_TecnicosByFamili(1, vm.Depatamento.clv_puesto, vm.Plaza.id_compania)
        .then(function (result) {
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
        ObtenDetalle();
      });
    }

    function DeleteRelTecnicoOrdenes(clv_tecnico){
      generalesSistemaFactory.GetBorRelOrdenesTecnicos(vm.Plaza.id_compania, vm.Depatamento.clv_puesto, clv_tecnico).then(function(data){
        ObtenDetalle();
      });
    }
    
    function AddRelTecnicoReportes(){
      generalesSistemaFactory.GetNueRel_Tecnicos_Quejas(vm.Plaza.id_compania, vm.Depatamento.clv_puesto, vm.Tecnico.clv_tecnico).then(function(data){
        ObtenDetalle();
      });
    }

    function DeleteRelTecnicoReportes(clv_tecnico){
      generalesSistemaFactory.GetBorRel_Tecnicos_Quejas(vm.Plaza.id_compania, 0, clv_tecnico).then(function(data){
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
    vm.DeleteRelTecnicoOrdenes = DeleteRelTecnicoOrdenes;
    vm.AddRelTecnicoReportes = AddRelTecnicoReportes;
    vm.DeleteRelTecnicoReportes = DeleteRelTecnicoReportes;
  });
