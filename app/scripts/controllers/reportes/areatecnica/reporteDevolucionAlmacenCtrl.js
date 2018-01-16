'use strict';
angular
	.module('softvApp')
	.controller('reporteDevolucionAlmacenCtrl', function($state,reportesFactory,reportesVariosFactory,$filter,globalService,$sce,$localStorage) {	
		
	function GetReport(){
		var Parametros = {
			'distribuidores': vm.responseparams.distribuidores,
			'plazas': vm.responseparams.plazas,
			'fechainicio': $filter('date')(vm.fechainicio, 'yyyy/MM/dd'),
			'fechafin': $filter('date')(vm.fechafin, 'yyyy/MM/dd')
		  };
		  reportesFactory.GetReporteDevolucionAlmacen(Parametros).then(function (result) {
			vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + result.GetReporteDevolucionAlmacenResult);
		  });
	}

	var vm=this;
	vm.report='DEVOLUCIONALMACEN';
	vm.GetReport=GetReport;
	vm.responseparams={};
	vm.showfilters=false;
	vm.GetReport=GetReport;
	vm.order=[
        {  'step': 1,function: 'getplazas',   confirm: false  },
        { 'step': 2, function: 'muestraRangosFecha',confirm: true }
      ]
	
});