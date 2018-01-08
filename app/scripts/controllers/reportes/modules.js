'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home.reportes',
				abstract: true,
				template: '<div ui-view></div>'
			},
			{
				name: 'home.reportes.ciudadcartera',
				data: {
					pageTitle: 'SAC | REPORTES POR CIDAD Y CARTERA',
					permissions: {
						only: ['reporteporciudadycarteraSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reporteciudadcartera',
				templateUrl: 'views/reportes/reporteciudadcartera.html',
				controller: 'ReporteCuidadCarteraCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.cortes',
				data: {
					pageTitle: 'SAC | REPORTES DE CORTES',
					permissions: {
						only: ['cortesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/cortes',
				templateUrl: 'views/reportes/ReporteCortes.html',
				controller: 'ReporteCortesCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.especiales',
				data: {
					pageTitle: 'SAC | REPORTES DE CORTES ESPECIALES',
					permissions: {
						only: ['cortesespecialesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/especiales',
				templateUrl: 'views/reportes/ReporteSucursales.html',
				controller: 'ReporteSucursalesCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportesVarios',
				data: {
					pageTitle: 'SAC | REPORTES VARIOS',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/varios',
				templateUrl: 'views/reportes/reportesVarios.html',
				controller: 'ReportesVariosCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.permanencia',
				data: {
					pageTitle: 'SAC | REPORTE DE PERMANENCIA',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/permanencia',
				templateUrl: 'views/reportes/reportePermanencia.html',
				controller: 'reportePermanenciaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.suscriptores',
				data: {
					pageTitle: 'SAC | REPORTE DE SUSCRIPTORES',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/suscriptores',
				templateUrl: 'views/reportes/suscriptores.html',
				controller: 'suscriptoresCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.documentos',
				data: {
					pageTitle: 'SAC | REPORTE DE CLIENTES SIN DOCUMENTOS',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/clientesdocumentos',
				templateUrl: 'views/reportes/clientesDocumentos.html',
				controller: 'clientesDocumentosCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.prospectos',
				data: {
					pageTitle: 'SAC | REPORTE DE PROSPECTOS',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/prospectos',
				templateUrl: 'views/reportes/prospectos.html',
				controller: 'prospectosCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.hoteles',
				data: {
					pageTitle: 'SAC | REPORTE DE HOTELES',
					permissions: {
						only: ['reportesvariosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/hoteles',
				templateUrl: 'views/reportes/hoteles.html',
				controller: 'hotelesCtrl',
				controllerAs: '$ctrl'
			}

		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
