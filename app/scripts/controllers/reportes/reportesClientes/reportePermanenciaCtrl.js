'use strict';
angular
	.module('softvApp')
	.controller('reportePermanenciaCtrl', function($state,reportesFactory,globalService,$sce) {	

		var vm=this;
		vm.report='PERMANENCIA';
		vm.permanenciaorder = [{
			'step': 1,
			function: 'getplazas',
			confirm: false
		  },
		  {
			'step': 3,
			function: 'getfiltroPermanencia',
			confirm: false
		  },
		  {
			'step': 4,
			function: 'getServicios',
			confirm: true
		  }
		];
		vm.meses = [{
			'id': 1,
			'nombre': 'Enero'
		  },
		  {
			'id': 2,
			'nombre': 'Febrero'
		  },
		  {
			'id': 3,
			'nombre': 'Marzo'
		  },
		  {
			'id': 4,
			'nombre': 'Abril'
		  },
		  {
			'id': 5,
			'nombre': 'Mayo'
		  },
		  {
			'id': 6,
			'nombre': 'Junio'
		  },
		  {
			'id': 7,
			'nombre': 'Julio'
		  },
		  {
			'id': 8,
			'nombre': 'Agosto'
		  },
		  {
			'id': 9,
			'nombre': 'Septiembre'
		  },
		  {
			'id': 10,
			'nombre': 'Octubre'
		  },
		  {
			'id': 11,
			'nombre': 'Noviembre'
		  },
		  {
			'id': 12,
			'nombre': 'Diciembre'
		  },
		]

});