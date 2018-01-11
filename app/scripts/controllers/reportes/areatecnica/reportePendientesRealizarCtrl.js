'use strict';
angular
	.module('softvApp')
	.controller('reportePendientesRealizarCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage) {	
		

	var vm=this;
	vm.report='PENDIENTESREALIZAR';
	vm.pendientesorder=[
        { 'step': 1,function: 'getplazas',   confirm: false  },
        { 'step': 2, function: 'getEstadosByPlaza',confirm: false },
        { 'step': 3, function: 'getCiudadesByEstado',confirm: false },
        {'step':4 ,function :'getLocalidadesByCiudades',confirm: true }
      ]
	
});