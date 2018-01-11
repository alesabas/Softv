'use strict';
angular
	.module('softvApp')
	.controller('reporteActividadesTecnicoCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage) {	
		

		
	var vm=this;
	vm.report='ACTIVIDADESTECNICO';
	vm.actividadestecnicoorder = [
		{  'step': 1,function: 'getplazas',   confirm: false  },
		{ 'step': 2, function: 'getTecnicosByPlaza', confirm: false },
		{ 'step': 3, function: 'muestrafiltrotrabajos',confirm: false},
		{ 'step': 3, function: 'muestrafiltrotrabajos', confirm: false },
		{ 'step': 4, function: 'muestraRangosFecha',confirm: true }
		]
	
});