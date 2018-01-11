'use strict';
angular
	.module('softvApp')
	.controller('reporteDevolucionAlmacenCtrl', function($state,reportesFactory,reportesVariosFactory,globalService,$sce,$localStorage) {	
		

	var vm=this;
	vm.report='DEVOLUCIONALMACEN';
	
	vm.devalmorder=[
        {  'step': 1,function: 'getplazas',   confirm: false  },
        { 'step': 2, function: 'muestraRangosFecha',confirm: true }
      ]
	
});