'use strict';
angular
	.module('softvApp')
	.controller('reporteActividadesTecnicoCtrl', function($state,reportesFactory,reportesVariosFactory,$filter,globalService,$sce,$localStorage) {	
		
    function GetReport(){
		var Parametros = {
			'plazas': vm.responseparams.plazas,
			'tecnicos': vm.responseparams.tecnicosAgenda,
			'fechainicio': $filter('date')(vm.fechainicio, 'yyyy/MM/dd'),
			'fechafin': $filter('date')(vm.fechafin, 'yyyy/MM/dd'),
			'resumen': (vm.tiporeporte == 2) ? 1 : 0
		  };
		  reportesFactory.GetReporteListadoActividadesTecnico(Parametros).then(function (result) {
			vm.rptpanel=true;
			vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReporteListadoActividadesTecnicoResult);
		 });
	}
		
	var vm=this;
	vm.report='ACTIVIDADESTECNICO';
	vm.GetReport=GetReport;
	vm.responseparams={};
	vm.showfilters=false;
	vm.rptpanel=false;
	vm.order = [
		{  'step': 1,function: 'getplazas',   confirm: false  },
		{ 'step': 2, function: 'muestrafiltroAgenda', confirm: false },
		{ 'step': 3, function: 'muestrafiltrotrabajos',confirm: false},	
		{ 'step': 4, function: 'getRangosFechas',confirm: true }
		]
	
});