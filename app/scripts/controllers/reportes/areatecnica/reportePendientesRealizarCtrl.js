'use strict';
angular
	.module('softvApp')
	.controller('reportePendientesRealizarCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage) {	
  
    function GetReport(){
      var Parametros = {
        'distribuidores': vm.responseparams.distribuidores,
        'plazas': vm.responseparams.plazas,
        'ciudades': vm.responseparams.ciudades,
        'localidades': vm.responseparams.localidades
      };
      reportesFactory.GetReportePendientesAreaTecnica(Parametros).then(function (result) {
        vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReportePendientesAreaTecnicaResult);
      });
    }

	var vm=this;
  vm.report='PENDIENTESREALIZAR';
  vm.GetReport=GetReport;
  vm.responseparams={};
  vm.showfilters=false;
  vm.GetReport=GetReport;
	vm.order=[
        { 'step': 1,function: 'getplazas',   confirm: false  },
        { 'step': 2, function: 'getEstadosByPlaza',confirm: false },
        { 'step': 3, function: 'getCiudadesByEstado',confirm: false },
        {'step':4 ,function :'getLocalidadesByCiudades',confirm: true },
        {'step':5,function:'getReporBtn'}
      ]
	
});