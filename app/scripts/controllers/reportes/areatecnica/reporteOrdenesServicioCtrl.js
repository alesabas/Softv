"use strict";
angular
  .module("softvApp")
  .controller("reporteOrdenesServicioCtrl", function(
    $state,
    reportesFactory,
    reportesVariosFactory,
    globalService,
    $sce,
    $localStorage
  ) {
    function GetReport() {
      var params = {
        fechaejeInicial: vm.FechaEjeIni ? vm.FechaEjeIni : "01/01/1900",
        fechaejeFinal: vm.FechaEjeFin ? vm.FechaEjeFin : "01/01/1900",
        fechasolFinal: vm.FechaOrdIni ? vm.FechaOrdIni : "01/01/1900",
        fechasolInicial: vm.FechaOrdFin ? vm.FechaOrdFin : "01/01/1900",
        estatus: vm.estatus ? vm.estatus : "P",
        Clv_inicio: vm.NumOrdIni ? vm.NumOrdIni : 0,
        Clv_fin: vm.NumOrdFin ? vm.NumOrdFin : 0,
        Clv_trabajo: vm.servicio ? vm.servicio : 0,
        OpOrdenar: vm.tiporeporte ? vm.tiporeporte : 0,
        Op: (vm.tipoImpresion)?vm.tipoImpresion:0,
        distribuidores: vm.responseparams.distribuidores,
        plazas: vm.responseparams.plazas,
        estados: vm.responseparams.estados,
        ciudades: vm.responseparams.ciudades,
        localidades: vm.responseparams.localidades,
        colonias: vm.responseparams.colonias,
        calles: vm.responseparams.calles,
        Clv_usuario: 4
      };
      reportesFactory.GetReporteOrdenes(params).then(function(result) {		
        vm.rptpanel=true;
        vm.url = $sce.trustAsResourceUrl(
          globalService.getUrlReportes() +
            "/Reportes/" +
            result.GetReporteOrdenesResult
		);
	
      });
    }

    var vm = this;
    vm.report = "ORDENESDESERVICIO";
    vm.url = "";
    vm.order = [
      { step: 1, function: "getplazas", confirm: false },
      { step: 2, function: "getEstadosByPlaza", confirm: false },
      { step: 3, function: "getCiudadesByEstado", confirm: false },
      { step: 4, function: "getLocalidadesByCiudades", confirm: false },
      { step: 5, function: "getColoniasByLocalidad", confirm: false },
      { step: 6, function: "getCallesByColonia", confirm: false },
      { step: 7, function: "getfiltrosOrden", confirm: true }
    ];

    vm.plazas = [];
    vm.distribuidores = [];
    vm.tecnicos = [];
    vm.estados = [];
    vm.localidades = [];
    vm.ciudades = [];
    vm.colonias = [];
    vm.calles = [];
    vm.responseparams = {};
    vm.showfilters = false;
    vm.rptpanel=false;
	vm.GetReport = GetReport;
	vm.estatus='P';
	vm.tipoImpresion='0';
	vm.tiporeporte='0';
  });
