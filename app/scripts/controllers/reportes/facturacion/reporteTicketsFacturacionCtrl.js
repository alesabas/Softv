"use strict";
angular
  .module("softvApp")
  .controller("reporteTicketsFacturacionCtrl", function(
    $state,
    $localStorage,
    $rootScope,
    reportesFactory,
    ticketsFactory,
    ngNotify,
    $filter,
	globalService,
	$sce
  ) {
    function getplazas() {
      ticketsFactory.getPlazas().then(function(result) {
        vm.regiones = result.GetMuestra_Compania_RelUsuarioListResult;
        console.log(result);
      });
    }

    function getUsers() {
      reportesFactory
        .GetMuestraUsuariosQuecancelaronImprimieron()
        .then(function(result) {
          vm.usuarios = result.GetMuestraUsuariosQuecancelaronImprimieronResult;
          console.log(result.GetMuestraUsuariosQuecancelaronImprimieronResult);
        });
    }

    function save() {
      var fechaInicio = $filter("date")(vm.fechainicio, "yyyy/MM/dd");
      var fechaFin = $filter("date")(vm.fechafin, "yyyy/MM/dd");
      var tipo = vm.tiporeporte == "C" ? 1 : 2;
	  var idcompania = vm.region.id_compania;
	  var usuario=vm.usuario.Clv_Usuario;
  
	  console.log(fechaInicio);
	  console.log(fechaFin);
	  console.log(tipo);
	  console.log(idcompania);
	  console.log(usuario);

      reportesFactory.GetReporteTickets(tipo,fechaInicio,fechaFin,usuario,idcompania,1).then(function(result) {
          vm.url = $sce.trustAsResourceUrl(
          globalService.getUrlReportes() +"/Reportes/" + result.GetReporteTicketsResult
        );
      });
    }

    var vm = this;
    getplazas();
	getUsers();
	vm.save=save;
    vm.tiporeporte = "C";
  });
