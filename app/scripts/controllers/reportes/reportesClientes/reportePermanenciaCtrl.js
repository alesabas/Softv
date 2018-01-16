'use strict';
angular
	.module('softvApp')
	.controller('reportePermanenciaCtrl', function($state,reportesFactory,atencionFactory ,globalService,$sce) {	
		function getTipoServicios() { 
      atencionFactory.getServicios().then(function (result) { 
        vm.Tiposervicios = result.GetMuestraTipSerPrincipalListResult; 
      }); 
		}
		
		function GetReport() {
			var Parametros = {
				'distribuidores': vm.responseparams.distribuidores,
				'plazas':vm.responseparams.plazas,
				'servicios': vm.responseparams.servicios,
				'mesInicio': vm.permInicioMes.id,
				'anioInicio': vm.permInicioAnio,
				'mesFin': vm.permFinMes.id,
				'anioFin': vm.permFinAnio,
				'StrmesInicio': vm.permInicioMes.nombre,
				'StrmesFin': vm.permInicioMes.nombre,
				'Clv_tipser': vm.responseparams.tiposervicio
			};
			console.log(Parametros);
		
			reportesFactory.GetReportePermanencia(Parametros)
				.then(function (data) {
					vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes() + '/Reportes/' + data.GetReportePermanenciaResult);
				});

		}
		

		var vm=this;
		
		vm.report='PERMANENCIA';
		vm.GetReport=GetReport;
		vm.responseparams={};
		vm.showfilters=false;	
	
		getTipoServicios();
		vm.order = [{
			'step': 1,
			function: 'getplazas',
			confirm: false
			},
			{
				'step': 2,
				function: 'muestraServicios',
				confirm: false
				},
		  
		  {
			'step': 3,
			function: 'getServicios',
			confirm: true
			},
			{
				'step': 4,
				function: 'getfiltroPermanencia',
				confirm: false
			},
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