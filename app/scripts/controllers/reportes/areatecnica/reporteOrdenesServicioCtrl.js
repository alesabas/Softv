'use strict';
angular
	.module('softvApp')
	.controller('reporteOrdenesServicioCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage) {	
		

	var vm=this;
	vm.report='ORDENESDESERVICIO';
	vm.ordenesorder = [
		{'step': 1, function: 'getplazas', confirm: false },
		{'step': 2, function: 'getEstadosByPlaza',confirm: false },
		{'step': 3, function: 'getCiudadesByEstado', confirm: false},
		{'step': 4, function: 'getLocalidadesByCiudades',confirm: false},
		{'step': 5, function: 'getColoniasByLocalidad', confirm: false },
		{'step': 6, function: 'getCallesByColonia', confirm: false},
		{'step': 7, function: 'getfiltrosOrden', confirm: true  }
    ];
	
});